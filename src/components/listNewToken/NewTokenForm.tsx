import React, { useState } from 'react'
import Stepper from './stepper/Stepper'
import StepperControl from './stepper/StepperControl'
import TokenInformation from './steps/TokenInformation'
import Tokenomics from './steps/Tokenomics'
import LinkingSocials from './steps/LinkingSocials'
import Final from './steps/Final'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'
import { useSDK } from "@metamask/sdk-react";
import { estimateFee, get_network, getETHBalance, urlToFile } from '../../utils'
import { ADMIN_ADDRESS, CREATE_TOKEN_FEE, FACTORY_CONTRACT_ADDRESS, FUJI_PROVIDER, FUJI_RPC_URL, NETWORK_LIST } from '../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { POST_API } from '../../apis/POST/postApis'
import { axiosInstance } from '../../apis/api'
import Loading from '../common/Loading'
import { resetNewTokenData } from '../../redux/slice/newTokenSlice'
import { updateUserBalance } from '../../redux/slice/userSlice'

function NewTokenForm({ setCloseModal }: { setCloseModal: () => void }) {
    const [currentStep, setCurrentStep] = useState(0)
    const { provider } = useSDK()
    const userAddress = useSelector((state: any) => state.user.address);
    const newTokenInfo = useSelector((state: any) => state.newToken)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [tokenImage, setTokenImage] = useState<File>()
    

    const validateFields = () => {
        const emptyFields = Object.entries(newTokenInfo)
            .filter(([_, value]) => {
                // Handle various empty cases
                if (value === null || value === undefined) return true;
                if (typeof value === 'string' && value.trim() === '') return true;
                if (typeof value === 'number' && isNaN(value)) return true;
                return false;
            })
            .map(([key]) => key);

        return emptyFields;
    }



    const steps = [
        "Token Information",
        "Tokenomics",
        "Linking Project",
        "Complete"
    ]

    const displaySteps = (step) => {
        switch (step) {
            case 0:
                return <TokenInformation tokenImage={tokenImage as File} setTokenImage={(image)=>setTokenImage(image)}/>
            case 1:
                return <Tokenomics />
            case 2:
                return <LinkingSocials />
            case 3:
                return <Final />
        }
    }

    const handleClick = async (direction) => {
        let newStep = currentStep;
        direction === 'next' ? newStep++ : newStep--;
        // check out of bounds
        if (currentStep === steps.length - 1 && direction === 'next') {
            const emptyFields = validateFields();
            if (emptyFields.length > 0) {
                Swal.fire({
                    customClass: {
                        popup: 'rounded-lg shadow-xl',
                        title: 'text-gray-800 font-medium text-xl mb-2',
                    },
                    title: 'Error!',
                    text: `Please fill in the following fields: ${emptyFields.join(', ')}`,
                    icon: 'error',
                })
                return;
            }
            const network = get_network()
            switch (network) {
                case NETWORK_LIST[0]:
                    //TODO: change back to ETH_RPC_URL 

                    const abiCoder = new ethers.utils.Interface([
                        "function createToken(string memory name, string memory ticker, uint256 maxSupply, uint256 fee)"
                    ]);

                    const encodedData = abiCoder.encodeFunctionData("createToken", [
                        "Your Token Name",
                        "TKN",
                        ethers.utils.parseUnits("1000000000", 18),
                        3, // 0.3% fee
                    ]);


                    const fee = await estimateFee(FUJI_PROVIDER, FACTORY_CONTRACT_ADDRESS, encodedData)
                    const finalFee = CREATE_TOKEN_FEE * parseFloat(fee)
                    const roundedFee = Number(finalFee.toFixed(8));

                    await provider?.request({
                        method: 'eth_sendTransaction',
                        params: [
                            {
                                from: userAddress,
                                to: ADMIN_ADDRESS,
                                value: ethers.utils.parseEther(roundedFee.toString()).toHexString()
                            },
                        ],
                    })
                        .then(async (txHash) => {
                            setLoading(true)
                            const formData = new FormData();
                            const creatorAddress = userAddress;
                            // Create a data object with all fields except image
                            const tokenData = {
                                creator: creatorAddress,
                                name: newTokenInfo.name,
                                symbol: newTokenInfo.symbol,
                                description: newTokenInfo.description,
                                fee: newTokenInfo.fee * 10,
                                socialLinks: newTokenInfo.socialLinks,
                                tokenFee: newTokenInfo.tokenFee,
                                chainId: newTokenInfo.chainId,
                                totalSupply: newTokenInfo.totalSupply.toString(),
                            };

                            formData.append('data', JSON.stringify(tokenData));
    
                            // Append the image separately
                            if (tokenImage) {
                                formData.append('image', tokenImage);
                            }
                            try {
                                const response = await axiosInstance.post(POST_API.CREATE_NEW_TOKEN(), formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                const balance = await getETHBalance(userAddress)
                                dispatch(updateUserBalance(balance))
                                Swal.fire({
                                    customClass: {
                                        popup: 'rounded-lg shadow-xl',
                                        title: 'text-gray-800 font-medium text-xl mb-2',
                                        confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600',
                                        actions: 'space-x-2',  // Add spacing between buttons
                                    },
                                    text: 'Your token has been created successfully',
                                    icon: 'success',
                                    iconColor: '#a855f7', // Purple-500 color
                                    background: '#1a1a2e',
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                    showCloseButton: true,
                                    html: `
                                        <p class="mb-4 text-purple-200/80">Your token has been created successfully</p>
                                        <a href="https://testnet.snowtrace.io/address/${response.data}" 
                                           target="_blank" 
                                           class="inline-flex items-center text-purple-500 hover:text-purple-600">
                                            <span>View on Snowtrace</span>
                                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    `
                                });
                                setCloseModal()
                                dispatch(resetNewTokenData())
                                setTokenImage(undefined)
                                setLoading(false)
                            }
                            catch (error) {
                                console.log('Error:', error);
                            }
                        })
                        .catch((error) => console.error(error));

                case NETWORK_LIST[1]:
                    break;
                case NETWORK_LIST[2]:
                    break;
                case NETWORK_LIST[3]:
                    break;
                default:
                    break;
            }
        }

        newStep >= 0 && newStep <= steps.length && setCurrentStep(newStep)
    }
    return (
        <>
            {loading && <Loading title="Create Your Token ..." message="Please wait while we process your request"/>}
            <div className='mx-auto shadow-xl rounded-2xl pb-2 w-[50vw] overflow-y-auto overflow-x-hidden'>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-400/10 to-purple-500/10 blur-3xl -z-10" />

                        {/* Main Title Container */}
                        <div className="relative">
                            <div className="space-y-6">
                                {/* Main Heading */}
                                <div className="flex items-center justify-center space-x-4">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                                        Launch your own token
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Stepper steps={steps} currentStep={currentStep} />
                    <div className='mt-12'>
                        {displaySteps(currentStep)}
                    </div>
                </div>

                <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps}
                />
            </div>
        </>
    )
}

export default NewTokenForm