import React from 'react'
import statistic from "../../../assets/icons/statistics.svg"
function StatsButton() {
    return (
        <button className="flex flex-row justify-center align-center items-center rounded-lg hover:bg-[#555571] transition duration-400 
    ease-in-out transform focus:outline-none focus:ring-0 group cursor-pointer px-2 py-1 group">
            <img src={statistic} alt="" className="w-8 h-8 m-auto"/>
            <span className="text-[15px] text-iconPrimary font-medium tracking-[0px] 
                flex items-center justify-center h-8 ml-1 group-hover:text-white"> Stats </span>
        </button>
    )
}

export default StatsButton