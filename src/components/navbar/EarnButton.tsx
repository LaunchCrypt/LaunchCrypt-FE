import React, { useState, useRef, useEffect } from "react";
import earnIcon from "../../../assets/icons/earn.svg"
import dropdownIcon from "../../../assets/icons/dropdown-fill.svg"
import poolIcon from "../../../assets/icons/pool.svg"
import "./styles.css"
import { useNavigate } from "react-router-dom";

function EarnButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            id: 'pools',
            label: 'Pools',
            path: '/pools',
            icon: poolIcon
        }
    ];

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="relative z-50" ref={dropdownRef}>
                <button
                    className={`nav-button-partition flex flex-row justify-center align-center items-center rounded-lg 
            hover:bg-[#555571] transition duration-400 ease-in-out transform focus:outline-none focus:ring-0 
            group cursor-pointer px-2 py-1 ${isOpen ? 'bg-[#555571]' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={earnIcon} alt="" className="w-8 h-8 m-auto" />
                    <span className={`text-[15px] font-medium tracking-[0px] flex items-center justify-center h-8 ml-1 mr-1
            ${isOpen ? 'text-white' : 'text-iconPrimary group-hover:text-white'}`}>
                        Earn
                    </span>
                    <img
                        src={dropdownIcon}
                        alt="dropdown-icon"
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className={`absolute top-full left-0 mt-2 p-1 w-60 rounded-xl bg-[#28253E] shadow-2xl overflow-hidden border border-gray-700/50 
                    ${isOpen ? 'animate-dropdownOpen' : 'animate-dropdownClose'}`}>
                        <div className="py-1 p-">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    className="w-full flex items-center px-2 py-2 text-sm text-iconPrimary 
                                    hover:bg-[#555571] hover:text-white group rounded-lg"
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate(item.path);
                                        // Add navigation logic here
                                    }}
                                >
                                    <div className="flex items-center w-full space-x-3">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-lg group-hover:bg-[#555571]">
                                            <span className="pool-icon w-full h-full" />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default EarnButton;