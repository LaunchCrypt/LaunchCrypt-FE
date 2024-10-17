import React, { useEffect, useState } from 'react'
import { formatBalance, get_network, getETHBalance } from '../../utils'
import { Itoken } from '../../interfaces'
import downArrow from '../../../assets/icons/down-arrow.svg'
import { useSelector } from 'react-redux'

import "./styles.css"

function Swap() {
  const [token, setToken] = useState<Itoken>()
  const [value, setValue] = useState('');
  const balance = useSelector((state: any) => state.user.balance);


  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    // Only allow digits and an optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 15 ) {
      setValue(inputValue);
    }
  };

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    const network = get_network()
    setToken({ ...network!, image: `../../../assets/icons/${network?.image}`, address: '' })
  }, [])
  return (
    <div className='swap-container flex flex-col align-middle items-center justify-center p-2 rounded-3xl bg-[#16162d] mt-5 w-[480px]'>
      <p className='self-start text-xl font-semibold text-textPrimary ml-3 mb-3 mt-1'>Swap</p>
      <div className='flex flex-col align-middle items-center justify-center'>
        <div className='flex flex-col align-middle justify-center items-center bg-[#31314e] rounded-xl pr-4'>
          <div className='flex flex-row align-middle items-center justify-center p-[0.75rem_0_0_1rem]'>
            <input
              type="text"
              value={formatNumber(value)}
              onChange={handleChange}
              placeholder='0.0' className='w-full text-textPrimary whitespace-nowrap text-ellipsis
              text-3xl leading-4 font-semibold tracking-[0.02rem] bg-inherit focus:outline-none focus:border-none'
            />

            <button className='swap-slot flex flex-row justify-center items-center align-middle 
              text-white bg-[#1c1c33] min-w-[140px] text-base h-12 p-[0_12px] rounded-xl'>
              <img src={token?.image} className='w-6 h-6 mr-2 ' />
              <div className='mr-auto font-medium'>
                {token?.symbol}
              </div>
              <img src={downArrow} className='w-4 h-4 font-medium -translate-y-[2px]' />
            </button>
          </div>
          <div className='self-end'>
            <p className='text-[#9594aa] text-sm mt-1'>Balance: {balance}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Swap