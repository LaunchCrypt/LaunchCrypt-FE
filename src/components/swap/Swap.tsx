import React, { useEffect, useState } from 'react'
import { formatBalance, get_network, getETHBalance } from '../../utils'
import { Itoken } from '../../interfaces'
import { useSelector } from 'react-redux'
import "./styles.css"

import SwapToken from './SwapToken'

function Swap() {
  const [firstToken, setFirstToken] = useState<Itoken>()
  const [firstValue, setFirstValue] = useState('');
  const [secondToken, setSecondToken] = useState<Itoken>()
  const [secondValue, setSecondValue] = useState('');
  const balance = useSelector((state: any) => state.user.balance);


  useEffect(() => {
    const network = get_network()
    setFirstToken({ ...network!, image: `../../../assets/icons/${network?.image}`, address: '' })
  }, [])

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
    <div className='swap-container flex flex-col align-middle items-center justify-center p-2 rounded-3xl bg-[#16162d] mt-5 w-[480px] h-fit gap-2'>
      <p className='self-start text-xl font-semibold text-textPrimary ml-3 mb-1 mt-1'>Swap</p>
      <SwapToken value={firstValue}
        handleChange={handleChangeFirstValue} token={firstToken!} balance={balance} setToken={(token)=>setFirstToken(token)}/>
      <SwapToken value={secondValue}
        handleChange={handleChangeSecondValue} token={secondToken!} balance={'0'} setToken={(token)=>setSecondToken(token)}/>
      <button disabled className="btn-bg-image w-full text-white font-medium 
      py-4 px-6 rounded-2xl transition-colors duration-300 disabled:opacity-50">
        Select token
      </button>

    </div>
  )
}

export default Swap