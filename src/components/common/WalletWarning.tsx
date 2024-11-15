import { useSDK } from "@metamask/sdk-react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUserBalance, updateUserAddress } from "../../redux/slice/userSlice";
import { checkFujiNetwork, getETHBalance } from "../../utils";



function WalletWarning({ closeModal }: { closeModal: () => void }) {

    const msg = "Sign this message to connect your wallet";
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
            getETHBalance(accounts?.[0]).then((userBalance) => {
                dispatch(updateUserBalance(userBalance));
                dispatch(updateUserAddress(accounts?.[0]));
            });
            closeModal()
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative p-8 rounded-2xl">
                {/* Background glow effect */}
                <div className="absolute inset-0  rounded-2xl blur-xl" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                            Wallet Not Connected
                        </h2>
                        <p className="text-gray-400">
                            Connect your wallet to access all features and start creating your token
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <button
                            onClick={connect}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-purple-500/20 font-medium"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Connect Wallet
                        </button>

                        <p className="text-sm text-gray-500 text-center px-6">
                            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletWarning;