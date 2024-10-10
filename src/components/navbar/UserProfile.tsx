import React from 'react'
import "./styles.css"

function UserProfile() {
    return (
        <button className="nav-button-partition flex flex-row justify-center align-center items-center rounded-lg hover:bg-[#555571] transition duration-400 
    ease-in-out transform focus:outline-none focus:ring-0 group cursor-pointer px-2 py-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-iconPrimary m-auto">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-[15px] text-iconPrimary font-medium tracking-[0px] flex
             items-center justify-center ml-1 group-hover:text-white"> Profile </span>
        </button>
    )
}

export default UserProfile