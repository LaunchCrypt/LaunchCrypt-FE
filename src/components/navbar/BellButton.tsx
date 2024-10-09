import React from 'react'
import bellIcon from "../../../assets/icons/bell-fill.svg"
function BellButton() {
    return (
        <button className="h-12 w-12 bg-[#14142f] rounded-full hover:bg-[#555571] transition duration-400 
        ease-in-out transform focus:outline-none focus:ring-0 group">
            <svg
                className="w-5 h-5 fill-current text-iconPrimary group-hover:text-white transition-colors duration-200 m-auto"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fillRule="evenodd" d="M6 8a6 6 0 1112 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 01-1.2 2.4h-15a1.5 1.5 0 01-1.2-2.4l2.05-2.733a3.25 3.25 0 00.65-1.95V8zm6 13.5A3.502 3.502 0 018.645 19h6.71A3.502 3.502 0 0112 21.5z" />
            </svg>
        </button>
    )
}

export default BellButton