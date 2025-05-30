import { useSDK } from "@metamask/sdk-react";
import { formatAddress, formatBalance, formatAddressLong, getETHBalance, copyToClipboard, checkFujiNetwork } from "../../utils/index";
import React, { useState } from "react";
import Modal from "../Modal/Modal"
import GradientButton from "../common/GradientButton";
import Swal from 'sweetalert2'
import metamaskIcon from "../../../assets/icons/MetaMask_Fox.svg";
import copyIcon from "../../../assets/icons/copy.svg";
import { resetUser, updateUserAddress, updateUserBalance } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";


function ConnectWallet() {
    const msg = "Sign this message to connect your wallet";
    const [account, setAccount] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const userAddress = useSelector((state: any) => state.user.address);
    const userBalance = useSelector((state: any) => state.user.balance);
    const dispatch = useDispatch()
    const { provider } = useSDK();

    const connect = async () => {

        await checkFujiNetwork()
        
        try {
            const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
            await provider?.request({
                method: "personal_sign",
                params: [msg, accounts?.[0]],
            });
            setAccount(accounts?.[0]);
            getETHBalance(accounts?.[0]).then((userBalance) => {
                dispatch(updateUserBalance(userBalance));
                dispatch(updateUserAddress(accounts?.[0]));
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
        dispatch(resetUser())
        setIsModalVisible(false);
    }

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const copyToClipboardSuccessfully = (text: string) => {
        copyToClipboard(text);
        Swal.fire({
            icon: 'success',
            title: 'Copied',
            showConfirmButton: false,
            timer: 1000,
            iconColor: "#7b37c6",
            width: "16rem",
            background: "#28253e",
            customClass: {
                popup: 'rounded-[32px] bg-[#28253e] border border-[#35354b] shadow-lg',
                title: 'text-white font-semibold text-2xl',
            },
        });
    }

    return (
        <div className="flex items-center justify-center bg-[#16162d] px-1 rounded-full relative h-12">
            {userAddress != '' && (
                <div className="text-textPrimary text-sm font-semibold ml-2 mr-4">
                    <div>{`${formatBalance(userBalance,6)} AVAX`}</div>
                </div>
            )}
            <button
                className="bg-[#3e3e52] hover:bg-[#555571] rounded-full text-textPrimary font-semibold 
                            text-sm py-2 px-4 transition duration-400 ease-in-out transform
                            focus:outline-none focus:ring-0"
                onClick={userAddress != '' ? openModal : connect}
            >
                {userAddress != '' ? <div className="flex items-center justify-around w-full">
                    {formatAddress(userAddress)}
                    <img src={metamaskIcon} className="w-5 h-5 bg-inherit inline ml-1" />
                </div> : <span>Connect Wallet</span>}

            </button>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="text-center">
                    <h2 className="text-xl mb-4 font-semibold">Connect Wallet</h2>
                    <div className="flex flex-col items-center justify-center px-1 py-1 ">
                        <div className="flex flex-row items-center justify-center px-1 py-1 border border-solid border-[#35354b] rounded-[24px]">
                            <img src={metamaskIcon} className="w-12 h-12 bg-inherit inline ml-1 mr-3" />
                            <div className="flex flex-col items-start justify-center px-1 py-1">
                                <p className="text-[#737289] font-bold text-sm mb-3">Account address</p>
                                <div className="flex flex-row items-center justify-center">
                                    <p className="text-textPrimary font-normal text-base">{formatAddressLong(account?account:userAddress,8)}</p>
                                    <img src={copyIcon} onClick={() => copyToClipboardSuccessfully(account?account:userAddress)}
                                        className="w-6 h-6 bg-inherit inline ml-20 mb-1 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <GradientButton children={<p>Disconnect</p>}
                        onClick={disconnect}
                        style={"relative overflow-hidden text-white font-medium w-full p-[12px_20px] cursor-pointer rounded-[24px] mt-4 group"} />
                </div>
            </Modal>
        </div >
    );
};

export default ConnectWallet;