import React, { useEffect, useState } from 'react'
import { formatBalance, get_network, getETHBalance, swapWithNativeToken } from '../../utils'
import { Itoken } from '../../interfaces'
import { useSelector } from 'react-redux'
import WalletWarning from "../common/WalletWarning"
import "./styles.css"

import SwapToken from './SwapToken'
import Modal from '../Modal/Modal'
import { useLiquidityPair } from '../../hooks/useLiquidityPair'

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

  const handleSwap = async () => {
    if (userAddress == '') {
      setIsWalletWarningVisible(true)
      return;
    }
    console.log(firstToken, secondToken)
    if(firstToken?.type === 'native' && secondToken?.type === 'native') {
      alert('Native to Native swap not supported')
      return;
    }
    if(firstToken?.contractAddress == secondToken?.contractAddress) {
      alert('Cannot swap same token')
      return;
    }
    else {
      console.log(firstValue)
      if(firstToken?.type === 'native' && secondToken?.type === 'ERC20') {
        await swapWithNativeToken(firstValue,(liquidityPair as any).poolAddress,'buy')
      }
      else if(firstToken?.type === 'ERC20' && secondToken?.type === 'native') {
        await swapWithNativeToken(firstValue,(liquidityPair as any).poolAddress,'sell')
      }
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
          token={secondToken!} balance={'0'}
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