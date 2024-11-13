import React, { useEffect, useState } from 'react'
import { approveERC20, formatBalance, get_network, getETHBalance, swapWithNativeToken } from '../../utils'
import { Itoken } from '../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import WalletWarning from "../common/WalletWarning"
import "./styles.css"

import SwapToken from './SwapToken'
import Modal from '../Modal/Modal'
import { useLiquidityPair } from '../../hooks/useLiquidityPair'
import Swal from 'sweetalert2'
import { updateUserBalance } from '../../redux/slice/userSlice'
import { ethers } from 'ethers'

function Swap() {
  const [firstToken, setFirstToken] = useState<Itoken>()
  const [firstValue, setFirstValue] = useState('');
  const [firstTokenValue, setFirstTokenValue] = useState('0');
  const [secondToken, setSecondToken] = useState<Itoken>()
  const [secondValue, setSecondValue] = useState('');
  const [secondTokenValue, setSecondTokenValue] = useState('0');
  const [isWalletWarningVisible, setIsWalletWarningVisible] = useState(false);
  const initBalance = useSelector((state: any) => state.user.balance);
  const userAddress = useSelector((state: any) => state.user.address);
  // state for liquidityPair hook
  const [searchParams, setSearchParams] = useState({})

  const { liquidityPair, isLoading, error, getLiquidityPair } = useLiquidityPair(searchParams);
  const dispatch = useDispatch()

  const handleSwap = async () => {
    if (userAddress == '') {
      setIsWalletWarningVisible(true)
      return;
    }
    console.log(firstToken, secondToken)
    if (firstToken?.type === 'native' && secondToken?.type === 'native') {
      alert('Native to Native swap not supported')
      return;
    }
    if (firstToken?.contractAddress == secondToken?.contractAddress) {
      alert('Cannot swap same token')
      return;
    }
    else {
      if (firstToken?.type === 'native' && secondToken?.type === 'ERC20') {
        const response = await swapWithNativeToken(firstValue, (liquidityPair as any).poolAddress, 'buy')
        //get user balance again
        
        Swal.fire({
          customClass: {
            popup: 'rounded-lg shadow-xl',
            title: 'text-gray-800 font-medium text-xl mb-2',
            confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600',
            actions: 'space-x-2',  // Add spacing between buttons
          },
          text: 'Successfully swapped',
          icon: 'success',
          iconColor: '#a855f7', // Purple-500 color
          background: '#1a1a2e',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          showCloseButton: true,
          html: `
              <p class="mb-4 text-purple-200/80">Swap token successfully</p>
              <a href="https://testnet.snowtrace.io/tx/${response.hash}" 
                 target="_blank" 
                 class="inline-flex items-center text-purple-500 hover:text-purple-600">
                  <span>View on Snowtrace</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
              </a>
          `
        });
      }
      else if (firstToken?.type === 'ERC20' && secondToken?.type === 'native') {
        // aprrove contract to transfer token
        await approveERC20(firstToken.contractAddress as any,(liquidityPair as any).poolAddress, firstValue)
        const response = await swapWithNativeToken(ethers.utils.parseUnits(firstValue,18).toString(), (liquidityPair as any).poolAddress, 'sell')
      }
      const balance = await getETHBalance(userAddress)
      dispatch(updateUserBalance(balance))
    }
  }


  useEffect(() => {
    const network = get_network()
    setFirstTokenValue(initBalance)
    setFirstToken({ ...network!, image: `../../../assets/icons/${network?.image}`, contractAddress: '', type: 'native' })
  }, [initBalance])

  const handleChangeFirstValue = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    // Only allow digits and an optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 13) {
      setFirstValue(inputValue);
    }
  };

  const handleChangeSecondValue = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    // Only allow digits and an optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 14) {
      setSecondValue(inputValue);
    }
  }

  return (
    <>
      {isWalletWarningVisible && <Modal isVisible={isWalletWarningVisible}
        onClose={() => setIsWalletWarningVisible(false)}
        children={<WalletWarning closeModal={() => setIsWalletWarningVisible(false)} />} />
      }
      <div className='swap-container flex flex-col align-middle items-center justify-center p-2 rounded-3xl bg-[#16162d] mt-5 w-[480px] h-fit gap-2'>
        <p className='self-start text-xl font-semibold text-textPrimary ml-3 mb-1 mt-1'>Swap</p>
        <SwapToken value={firstValue}
          handleChange={handleChangeFirstValue}
          token={firstToken!} balance={firstTokenValue}
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
          setBalance={(balance) => setFirstTokenValue(balance)} />
        <SwapToken value={secondValue}
          handleChange={handleChangeSecondValue}
          token={secondToken!} balance={secondTokenValue}
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

          setBalance={(balance) => setSecondTokenValue(balance)} />
        {firstToken == null || secondToken == null ? <button disabled className="btn-bg-image w-full text-white font-medium 
      py-4 px-6 rounded-2xl transition-colors duration-300 disabled:opacity-50">
          Select token
        </button> :
          <button
            onClick={handleSwap}
            className="btn-bg-image w-full text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-300">Swap </button>
        }
      </div>
    </>
  )
}

export default Swap