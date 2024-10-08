import { useSDK } from "@metamask/sdk-react";
import { formatAddress, formatBalance } from "../../utils/formatData";
import React, { useEffect, useState } from "react";
import { getETHBalance } from "../../utils/getBalance";
import Modal from "../Modal/Modal"
import metamaskIcon from "../../../assets/icons/MetaMask_Fox.svg";


export const Metamask = () => {
    const msg = "Sign this message to connect your wallet";
    const [account, setAccount] = useState<string>();
    const [balance, setBalance] = useState<string>("0");
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
            await provider?.request({
                method: "personal_sign",
                params: [msg, accounts?.[0]],
            });
            console.log("connected..", accounts?.[0]);
            setAccount(accounts?.[0]);
            getETHBalance(accounts?.[0]).then((userBalance) => {
                setBalance(formatBalance(userBalance));
            });

        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    const disconnect = async () => {
        await provider?.request({
            method: "wallet_revokePermissions",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        })
        setAccount(undefined);
        setBalance("0");
    }

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex items-center justify-center bg-[#16162d] px-1 py-1 rounded-full relative">
            {account && (
                <div className="text-[#e5e4fa] text-sm font-semibold ml-2 mr-4">
                    <div>{`${balance} ETH`}</div>
                </div>
            )}
            <button
                className="bg-[#3e3e52] hover:bg-[#555571] rounded-full text-[#e5e4fa] font-semibold 
                            text-sm py-2 px-4 transition duration-400 ease-in-out transform
                            focus:outline-none focus:ring-0"
                onClick={account ? openModal : connect}
            >
                {account ? <div className="flex items-center justify-around w-full">
                    {formatAddress(account)}
                    <img src={metamaskIcon} className="w-5 h-5 bg-inherit inline ml-1" />
                </div> : <span>Connect Wallet</span>}

            </button>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="text-center">
                    <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
                    <p className="mb-4">This is the modal content.</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div >
    );
};