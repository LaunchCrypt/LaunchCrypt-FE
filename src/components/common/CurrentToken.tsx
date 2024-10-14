import React from 'react'
import { Inetwork } from '../../interfaces'

function CurrentToken(network:{network: Inetwork}) {
    return (
        <div className='flex flex-row items-center h-8 rounded-[100px] p-[8px_12px_8px_8px] gap-1 cursor-pointer bg-[#24243a] hover:bg-[#3e3e52]'>
            <img src={`../../../assets/icons/${network.network.image}`} className='w-6 h-6'/>
            <span className='text-base font-medium'>{network.network.symbol}</span>
        </div>
    )
}

export default CurrentToken