import React, { useState } from 'react';
import tokenIcon from "../../../assets/icons/token.svg"
import dropdownIcon from "../../../assets/icons/dropdown-fill.svg"

function TokenButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <button className="flex flex-row justify-center align-center items-center rounded-lg hover:bg-[#555571] transition duration-400 
            ease-in-out transform focus:outline-none focus:ring-0 group cursor-pointer px-2 py-1 group" onClick={() => setIsOpen(!isOpen)}>
            <img src={tokenIcon} alt="" className="w-8 h-8 m-auto" />
            <span className="text-[15px] text-iconPrimary font-medium tracking-[0px] 
                flex items-center justify-center h-8 ml-1 mr-1 group-hover:text-white"> Token </span>
            <img src={dropdownIcon} alt="dropdown-icon"
                className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
    )
}

export default TokenButton