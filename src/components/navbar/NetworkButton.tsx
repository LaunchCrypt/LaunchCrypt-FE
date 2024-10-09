import React, { useEffect, useState } from 'react'
import { NETWORK_LIST } from '../../constant';
import ethereumLogo from "../../../assets/icons/Ethereum-logo.svg"
import aptosLogo from "../../../assets/icons/Aptos-logo.svg"
import solanaLogo from "../../../assets/icons/Solana-logo.svg"
import dropdownIcon from "../../../assets/icons/dropdown-fill.svg"
import checkMark from "../../../assets/icons/checkmark.svg"
import { updateURLParameter } from '../../utils';

function NetworkButton() {
    const pathToImages = "../../../assets/icons/";
    const [isOpen, setIsOpen] = useState(false);
    const [network, setNetwork] = useState(NETWORK_LIST[0]);

    const handleNetworkChange = (newNetwork: any) => {
        updateURLParameter('network', newNetwork.name.toLowerCase());
        setIsOpen(false);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const networkParam = urlParams.get('network');
        if (networkParam) {
            const foundNetwork = NETWORK_LIST.find(net => net.name.toLowerCase() === networkParam);
            if (foundNetwork) {
                switch (foundNetwork.name) {
                    case 'Ethereum':
                        setNetwork({ name: 'Ethereum', image: ethereumLogo });
                        break;
                    case 'Aptos':
                        setNetwork({ name: 'Aptos', image: aptosLogo });
                        break;
                    case 'Solana':
                        setNetwork({ name: 'Solana', image: solanaLogo });
                        break;
                    default:
                        setNetwork({ name: 'Ethereum', image: ethereumLogo });;
                }
            }
        }
        else {
            // default case (no param in URL)
            setNetwork({ name: 'Ethereum', image: ethereumLogo });
        }
    }, []);

    return (
        <div className='relative rounded-full'>
            <button
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
                className="flex flex-row items-center justify-between h-12 px-2 py-2 
                    text-sm font-medium text-white bg-[#14142f] rounded-full"
            >
                <img src={network.image} className='h-7 w-7 mr-2' />
                <div className='flex flex-col items-start justify-center mr-2'>
                    <span className='text-[#6d6c84] text-xs'>Network</span>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="text-textPrimary ml-1 text-xs">{network.name}</div>
                    </div>
                </div>
                <img src={dropdownIcon} alt="dropdown-icon"
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 origin-top-left bg-[#27253e] 
                    rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                    {NETWORK_LIST.map((_network, index) => (
                        <div className={`flex flex-row items-center align-center px-3 py-2 hover:bg-[#3e3e52] w-32
                            ${index == 0 ? `rounded-t-xl` : index == NETWORK_LIST.length - 1 && `rounded-b-xl`} 
                            ${_network.name === network.name && `bg-[#3e3e52]`}
                            ${index !== 0 && index !== NETWORK_LIST.length - 1 && `border-t border-b border-[#35354b]`}`}
                            onClick={() => handleNetworkChange(_network)}>
                            <img src={pathToImages + _network.image} alt="layer1-logo" className='w-6 h-6 mr-2' />
                            <p className="block text-xs text-textPrimary font-semibold">
                                {_network.name}
                            </p>
                            {_network.name === network.name &&
                                <img src={checkMark} alt='check-mark' className='w-4 h-4 ml-auto' />
                            }
                        </div>)
                    )}
                </div>
            )
            }
        </div>
    );
}

export default NetworkButton