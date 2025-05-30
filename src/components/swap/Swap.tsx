import React, { useEffect, useState } from 'react'
import {
  approveERC20,
  calculateAmountAVAXReceived,
  calculateAmountERC20Received,
  calculateAmountNeededReceiveAvax,
  calculateAmountNeededReceiveToken,
  get_network,
  getETHBalance,
  getLiquidityPoolReserve,
  showAlert,
  showFailedAlert,
  swapWithNativeToken
} from '../../utils'
import { Itoken } from '../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import WalletWarning from "../common/WalletWarning"
import SwapToken from './SwapToken'
import Modal from '../Modal/Modal'
import { useLiquidityPair } from '../../hooks/useLiquidityPair'
import { updateUserBalance } from '../../redux/slice/userSlice'
import { ethers } from 'ethers'
import { axiosInstance, PATCH_API, POST_API } from '../../apis/api'
import Loading from '../common/Loading'
import { DEFAULT_QUERY_ALL, VIRTUAL_LIQUIDITY } from '../../constant'

import "./styles.css"

function Swap() {
  const [firstToken, setFirstToken] = useState<Itoken>()
  const [firstValue, setFirstValue] = useState(''); // value in the input field
  const [firstTokenValue, setFirstTokenValue] = useState('0'); // token balance
  const [secondToken, setSecondToken] = useState<Itoken>()
  const [secondValue, setSecondValue] = useState('');
  const [secondTokenValue, setSecondTokenValue] = useState('0');
  const [isWalletWarningVisible, setIsWalletWarningVisible] = useState(false);
  const initBalance = useSelector((state: any) => state.user.balance);
  const userAddress = useSelector((state: any) => state.user.address);
  // state for liquidityPair hook
  const [searchParams, setSearchParams] = useState({})
  const [waitForApproving, setWaitForApproving] = useState(false);
  const [isError, setError] = useState(false)


  const { liquidityPair, isLoading, error, getLiquidityPair } = useLiquidityPair({ ...searchParams, searchQuery: DEFAULT_QUERY_ALL });
  const dispatch = useDispatch()

  const handleSwap = async () => {
    if (userAddress == '') {
      setIsWalletWarningVisible(true)
      return;
    }
    if (firstToken?.type === 'native' && secondToken?.type === 'native') {
      alert('Native to Native swap not supported')
      return;
    }
    if (firstToken?.contractAddress == secondToken?.contractAddress) {
      alert('Cannot swap same token')
      return;
    }
    else {
      let response;
      if (firstToken?.type === 'native' && secondToken?.type === 'ERC20') {
        try{
          response = await swapWithNativeToken(firstValue, "0", (liquidityPair as any).poolAddress, 'buy')
          showAlert(response.hash, "Swap token successfully")
        }
        catch(error){
          return;
        }
      }
      else if (firstToken?.type === 'ERC20' && secondToken?.type === 'native') {
        const tx = await approveERC20(firstToken.contractAddress as any, (liquidityPair as any).poolAddress, firstValue)
        setWaitForApproving(true)
        await tx.wait()
        setWaitForApproving(false)
        try {
          response = await swapWithNativeToken(ethers.utils.parseUnits(firstValue, 18).toString(), "0", (liquidityPair as any).poolAddress, 'sell')
          await response.wait();
          showAlert(response.hash, "Swap token successfully")
        } catch (error) {
          showFailedAlert('Not enough token to swap')
          return;
        }
      }
      await response.wait(1)

      await axiosInstance.post(POST_API.CREATE_NEW_TRADE(), {
        liquidityPairId: (liquidityPair as any)._id,
        tokenId: firstToken?.type === 'native' ? (secondToken as any)._id : (firstToken as any)._id,
        price: firstToken?.type === 'native' ? firstValue : secondValue,
        amount: firstToken?.type === 'native' ? secondValue : firstValue,
        timeStamps: new Date(),
        side: firstToken?.type === 'native' ? 'buy' : 'sell',
        creator: userAddress,
        transactionHash: response.hash
      })

      const balance = await getETHBalance(userAddress)
      dispatch(updateUserBalance(balance))

      // update liquidity pool in database
      const { reserve, collateral } = await getLiquidityPoolReserve((liquidityPair as any).poolAddress)
      await axiosInstance.patch(PATCH_API.UPDATE_LIQUIDITY_PAIR((liquidityPair as any).poolAddress), {
        tokenAReserve: ethers.utils.formatUnits(reserve, 18),
        tokenBReserve: ethers.utils.formatUnits(collateral, 18)
      })

    }
  }

  const handleSwitchTokens = () => {
    if (firstToken == null || secondToken == null) return
    setFirstToken(secondToken);
    setSecondToken(firstToken);
    setFirstValue('0');
    setSecondValue('0');
    setFirstTokenValue(secondTokenValue);
    setSecondTokenValue(firstTokenValue);

    // Update search params for the switched tokens
    if (secondToken?.type === 'ERC20' && firstToken?.type === 'ERC20') {
      setSearchParams({ pairAddress: { token0Address: secondToken.contractAddress, token1Address: firstToken.contractAddress } })
    } else if (secondToken?.type === 'ERC20' && firstToken?.type === 'native') {
      setSearchParams({ token0Address: secondToken.contractAddress })
    } else if (secondToken?.type === 'native' && firstToken?.type === 'ERC20') {
      setSearchParams({ token0Address: firstToken.contractAddress })
    }
  };

  useEffect(() => {
    const network = get_network()
    setFirstToken({ ...network!, image: `../../../assets/icons/${network?.image}`, contractAddress: '', type: 'native' })
    setFirstTokenValue(initBalance)
  }, [userAddress])



  const handleChangeFirstValue = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    const amountIn = parseFloat(inputValue);
    const reserveIn = firstToken?.type === 'native' ? parseFloat((liquidityPair as any).tokenBReserve) : parseFloat((liquidityPair as any).tokenAReserve)
    const reserveOut = firstToken?.type === 'native' ? parseFloat((liquidityPair as any).tokenAReserve) : parseFloat((liquidityPair as any).tokenBReserve)
    setFirstValue(inputValue);
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 9) {
      setFirstValue(inputValue);
      if (inputValue == "") {
        setSecondValue("")
      }
      else {
        const amountOut = firstToken?.type === 'native'
          ?
          calculateAmountERC20Received(amountIn, reserveIn, reserveOut, (liquidityPair as any).poolFee).toString()
          :
          calculateAmountAVAXReceived(amountIn, reserveIn, reserveOut, (liquidityPair as any).poolFee).toString()

        setSecondValue(amountOut)
      }
    }
  }

  const handleChangeSecondValue = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 9) {
      setSecondValue(inputValue)
      const amountOut = parseFloat(inputValue);
      const reserveOut = secondToken?.type === 'native' ? parseFloat((liquidityPair as any).tokenBReserve) : parseFloat((liquidityPair as any).tokenAReserve)
      const reserveIn = secondToken?.type === 'native' ? parseFloat((liquidityPair as any).tokenAReserve) : parseFloat((liquidityPair as any).tokenBReserve)

      if (amountOut > reserveOut || (secondToken?.type === 'native' && reserveOut - amountOut < VIRTUAL_LIQUIDITY)) {
        setFirstValue('0')
        setError(true)
      }
      else if (inputValue == "") {
        setFirstValue("")
      }
      else {
        setError(false)
        const amountIn = secondToken?.type === 'native'
          ?
          calculateAmountNeededReceiveAvax(inputValue, reserveIn, reserveOut, (liquidityPair as any).poolFee).toString()
          :
          calculateAmountNeededReceiveToken(inputValue, reserveIn, reserveOut, (liquidityPair as any).poolFee).toString()
        setFirstValue(amountIn)
      }
    }
  }

  return (
    <>
      {waitForApproving && Loading({ title: 'Wait for approve ERC20 process', message: 'Please confirm the swap transaction in your wallet' })}
      {isWalletWarningVisible && <Modal isVisible={isWalletWarningVisible}
        onClose={() => setIsWalletWarningVisible(false)}
        children={<WalletWarning closeModal={() => setIsWalletWarningVisible(false)} />} />
      }
      <div className='swap-container relative flex flex-col align-middle items-center justify-center p-2 rounded-3xl bg-[#16162d] mt-5 w-[480px] h-fit gap-2'>
        <div className='w-full h-full flex flex-row items-center align-middle'>
          <p className='self-start text-xl font-semibold text-textPrimary ml-3 mb-1 mt-1 mr-2'>Swap</p>
          <div className="relative group">
            <span className="text-purple-400 cursor-help">ⓘ</span>

            {/* Tooltip */}
            <div className="absolute left-0 top-6 w-64 opacity-0 invisible group-hover:opacity-100 
            group-hover:visible transition-all duration-200 z-50">
              <div className="bg-[#2D2D3D] text-gray-300 text-sm p-2 rounded-lg shadow-lg 
              border border-purple-500/20">
                This is only for Native - ERC20 token trading pairs.
              </div>
              {/* Triangle Pointer */}
              <div className="absolute -top-1 left-2 w-2 h-2 bg-[#2D2D3D] 
              transform rotate-45 border-l border-t border-purple-500/20" />
            </div>
          </div>
          {isError && <div className='flex items-center gap-2 rounded-lg animate-fade-in ml-3'>
            <span className='text-sm font-medium text-red-500 italic'>
              Not enough reserve in pool
            </span>
          </div>}
        </div>

        <SwapToken
          value={firstValue}
          handleChange={handleChangeFirstValue}
          token={firstToken!}
          balance={firstTokenValue}
          setToken={(token) => {
            setFirstToken(token)
            if (token.type === 'ERC20' && secondToken?.type === 'ERC20') {
              setSearchParams({ pairAddress: { token0Address: token.contractAddress, token1Address: secondToken.contractAddress } })
            }
            else if (token.type === 'ERC20' && secondToken?.type === 'native') {
              setSearchParams({ token0Address: token.contractAddress })
            }
            else if (token.type === 'native' && secondToken?.type === 'ERC20') {
              setSearchParams({ token0Address: secondToken.contractAddress })
            }
          }}
          setBalance={(balance) => setFirstTokenValue(balance)}
        />

        {/* Swap Direction Button */}
        <button
          onClick={handleSwitchTokens}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 
                     bg-[#262643]  
                     w-10 h-10 rounded-xl
                     flex items-center justify-center
                     shadow-lg shadow-black/20
                     transition-all duration-200
                     hover:bg-[#20203a]
                     active:scale-95
                     border border-[#2a2a45]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/90"
          >
            <path
              d="M16 3L16 21M16 21L12 17M16 21L20 17M8 21L8 3M8 3L4 7M8 3L12 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <SwapToken
          value={secondValue}
          handleChange={handleChangeSecondValue}
          token={secondToken!}
          balance={secondTokenValue}
          setToken={(token) => {
            setSecondToken(token)
            if (token.type === 'ERC20' && firstToken?.type === 'ERC20') {
              setSearchParams({ pairAddress: { token0Address: firstToken.contractAddress, token1Address: token.contractAddress } })
            }
            else if (token.type === 'ERC20' && firstToken?.type === 'native') {
              setSearchParams({ token0Address: token.contractAddress })
            }
            else if (token.type === 'native' && firstToken?.type === 'ERC20') {
              setSearchParams({ token0Address: firstToken.contractAddress })
            }
          }}
          setBalance={(balance) => setSecondTokenValue(balance)}
        />

        {firstToken == null || secondToken == null ? (
          <button disabled className="btn-bg-image w-full text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-300 disabled:opacity-50">
            Select token
          </button>
        ) : (
          <button
            onClick={handleSwap}
            className="btn-bg-image w-full text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-300">
            Swap
          </button>
        )}
      </div>
    </>
  )
}

export default Swap