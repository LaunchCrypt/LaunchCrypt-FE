import React from 'react'
import downArrow from '../../../assets/icons/down-arrow.svg'
import { Itoken } from '../../interfaces';
import './styles.css'


const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function SwapToken({ value, handleChange, token, balance }: {
    value: string,
    handleChange: (e) => void,
    token: Itoken | null,
    balance: string
}) {
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
                        <button className='swap-slot flex flex-row justify-center items-center align-middle 
          text-white bg-[#1c1c33] min-w-[140px] text-base h-12 p-[0_12px] rounded-xl'>
                            <img src={token?.image} className='w-6 h-6 mr-2' />
                            <div className='mr-auto font-medium'>
                                {token?.symbol}
                            </div>
                            <img src={downArrow} className='w-4 h-4 font-medium -translate-y-[2px]' />
                        </button> :
                        <button className='swap-slot flex flex-row justify-center items-center align-middle bg-gradient-to-r from-[#327474]
                         to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white font-medium transition-all duration-30
                         min-w-[140px] text-base h-12 p-[0_12px] rounded-xl'>
                            <p className='mr-auto'>Select token</p>
                            <img src={downArrow} className='w-4 h-4 font-medium -translate-y-[2px]' />
                        </button>
                    }
                </div>
                <div className='self-end'>
                    <p className='text-[#9594aa] text-sm mt-1 mb-2'>Balance: {parseFloat(balance).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default SwapToken