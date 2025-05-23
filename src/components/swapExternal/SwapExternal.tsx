import React, { useEffect, useState } from 'react'
import {
    calculateAmountInNeededExternalToken,
    calculateAmountOutExternalToken,
    callSwapExternalTokenContract,
    showAlert,
} from '../../utils'
import { Itoken } from '../../interfaces';
import { useSelector } from 'react-redux';
import { useTradingPair } from '../../hooks/useTradingPair';
import { DEFAULT_QUERY_ALL } from '../../constant';
import Loading from '../common/Loading';
import Modal from '../Modal/Modal';
import WalletWarning from '../common/WalletWarning';
import SwapExternalToken from './SwapExternalToken';
import { useLocation } from 'react-router-dom';
import { axiosInstance, PATCH_API } from '../../apis/api';
import { BigNumber } from 'ethers';

function SwapExternal() {
    const location = useLocation();
    const [firstToken, setFirstToken] = useState<Itoken>()
    const [firstValue, setFirstValue] = useState(''); // value in the input field
    const [firstTokenValue, setFirstTokenValue] = useState('0'); // token balance
    const [secondToken, setSecondToken] = useState<Itoken>()
    const [secondValue, setSecondValue] = useState('');
    const [secondTokenValue, setSecondTokenValue] = useState('0');
    const [isWalletWarningVisible, setIsWalletWarningVisible] = useState(false);
    const userAddress = useSelector((state: any) => state.user.address);
    // state for liquidityPair hook
    const [searchParams, setSearchParams] = useState({})
    const [waitForApproving, setWaitForApproving] = useState(false);
    const [isError, setError] = useState(false)
    const { allTradingPair, getAllTradingPairs, tradingPair, getTradingPair } = useTradingPair({ ...searchParams, searchQuery: DEFAULT_QUERY_ALL })

    const [{ tokenA, tokenB, tokenAReserve, tokenBReserve, totalLP, poolAddress }, setPoolData] = useState(location.state || {});
    useEffect(() => {
        if (tokenA && tokenB) {
            setFirstToken(tokenA)
            setSecondToken(tokenB)
            setFirstValue('0');
            setSecondValue('0');
        }
    },[])
    const handleSwap = async () => {
        if (userAddress == '') {
            setIsWalletWarningVisible(true)
            return;
        }
        if (firstToken?.contractAddress == secondToken?.contractAddress) {
            alert('Cannot swap same token')
            return;
        }
        if (firstToken != null && secondToken != null) {
            const tx = await callSwapExternalTokenContract(poolAddress, (firstToken as any).contractAddress, (secondToken as any).contractAddress, firstValue)
            await tx.wait()
            showAlert(tx, "Swap successful")
        const res = await axiosInstance.patch(PATCH_API.UPDATE_TRADING_PAIR_RESERVE(poolAddress), {
            tokenAAddress: tokenA?.contractAddress,
            tokenBAddress: tokenB?.contractAddress,
        })
        setPoolData(res.data)
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
        setSearchParams({ token0Address: secondToken.contractAddress, token1Address: firstToken.contractAddress })
    }

    const handleChangeFirstValue = (e) => {
        const inputValue = e.target.value.replace(/,/g, '');
        const amountIn = parseFloat(inputValue)
        const reserveIn = firstToken?.contractAddress == tokenA?.contractAddress ?  tokenAReserve :  tokenBReserve
        const reserveOut = firstToken?.contractAddress == tokenA?.contractAddress ?  tokenBReserve :  tokenAReserve

        setFirstValue(inputValue);


        if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 9) {
            setFirstValue(inputValue);
            if (inputValue == "") {
                setSecondValue("")
            }
            else {
                const amountOut = calculateAmountOutExternalToken(amountIn, reserveIn, reserveOut)
                setSecondValue(amountOut)
            }
        }
    }

    const handleChangeSecondValue = (e) => {
        const inputValue = e.target.value.replace(/,/g, '');
        const amountOut = BigInt(inputValue)
        const reserveOut = secondToken?.contractAddress == tradingPair.tokenA.contractAddress ? tokenAReserve : tokenBReserve
        const reserveIn = secondToken?.contractAddress == tradingPair.tokenA.contractAddress ? tokenBReserve : tokenAReserve

        if (amountOut > reserveOut) {
            setFirstValue('0')
            setError(true)
        }
        else if (inputValue == "") {
            setFirstValue("")
        }
        else {
            setError(false)
            const amountIn = calculateAmountInNeededExternalToken(amountOut, reserveIn, reserveOut)
            setFirstValue(amountIn)
        }
    }

    return (
        <div className='w-full h-full flex flex-col align-middle items-center justify-center'>
            {waitForApproving && Loading({ title: 'Wait for approve ERC20 process', message: 'Please confirm the swap transaction in your wallet' })}
            {isWalletWarningVisible && <Modal isVisible={isWalletWarningVisible}
                onClose={() => setIsWalletWarningVisible(false)}
                children={<WalletWarning closeModal={() => setIsWalletWarningVisible(false)} />} />
            }
            <div className='swap-container relative flex flex-col align-middle items-center justify-center p-3 rounded-3xl bg-[#16162d] mt-5 w-[520px] h-fit gap-2'>
                <div className='w-full h-full flex flex-row items-center align-middle'>
                    <p className='self-start text-xl font-semibold text-textPrimary mb-1 mt-1 ml-2'>Swap</p>
                    <div className="relative group">
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

                <SwapExternalToken
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

                <SwapExternalToken
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

        </div>
    )
}

export default SwapExternal