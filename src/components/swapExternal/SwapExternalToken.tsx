import React, { useEffect, useState } from 'react'
import { Itoken } from '../../interfaces';
import TokenSelector from '../tokenSelector/TokenSelector';
import {getERC20Balance } from '../../utils';
import rocketLogo from "../../../assets/images/rocket-logo1.png"
import { useSelector } from 'react-redux';


const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function SwapExternalToken({ value, handleChange, token, setToken, balance, setBalance }: {
    value: string,
    handleChange: (e) => void,
    token: Itoken | null,
    setToken: (inputToken) => void
    balance: string,
    setBalance: (inputBalance) => void
}) {
    const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
    const userAddress = useSelector((state: any) => state.user.address);

    useEffect(() => {
        getERC20Balance(userAddress, token?.contractAddress as any).then((res) => {
            setBalance(res);
        })
    }, [token])
    return (
        <div className='flex flex-col align-middle items-center justify-center'>
            <div className='flex flex-col align-middle justify-center items-center bg-[#31314e] rounded-xl pr-4 
            border-transparent border-[0.05px] hover:border-[0.05px] hover:border-gray-600'>
                <div className='flex flex-row align-middle items-center justify-center p-[0.75rem_0_0_1rem]'>
                    <input
                        type="text"
                        value={formatNumber(value)}
                        onChange={handleChange}
                        placeholder='0.0' className='w-full text-textPrimary whitespace-nowrap text-ellipsis
          text-3xl leading-4 font-semibold tracking-[0.02rem] bg-inherit focus:outline-none focus:border-none'
                    />

                    {token ?
                        <button 
                            className='swap-slot flex flex-row justify-center items-center align-middle 
                        text-white bg-[#1c1c33] min-w-[140px] text-base h-12 p-[0_12px] rounded-xl'>
                            <img src={rocketLogo} className='w-6 h-6 mr-2' />
                            <div className='mr-auto font-medium'>
                                {token?.symbol}
                            </div>
                          
                        </button> :
                        <button className='swap-slot flex flex-row justify-center items-center align-middle bg-gradient-to-r from-[#327474]
                         to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white font-medium transition-all duration-30
                         min-w-[140px] text-base h-12 p-[0_12px] rounded-xl'>
                            <p className='mr-auto'>Select token</p>
                        </button>
                    }
                </div>
                <div className='self-end'>
                    <p className='text-[#9594aa] text-sm mt-1 mb-2'>Balance: {parseFloat(balance).toFixed(2)}</p>
                </div>
            </div>

            {/* Token Selector */}
            <TokenSelector
                isOpen={isTokenSelectorOpen}
                onClose={() => setIsTokenSelectorOpen(false)}
                onSelect={async (token) => {
                    setToken(token);
                    const balance = await getERC20Balance(userAddress, token.contractAddress);
                    setBalance(balance);
                    setIsTokenSelectorOpen(false);
                }}
                type="ERC20 to ERC20"
            />
        </div>
    )
}

export default SwapExternalToken