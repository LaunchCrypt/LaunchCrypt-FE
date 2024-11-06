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
import { estimateFee, get_network } from '../../utils'
import Alert from '@mui/material/Alert';
import { ADMIN_ADDRESS, CREATE_TOKEN_FEE, FACTORY_CONTRACT_ADDRESS, FUJI_RPC_URL, NETWORK_LIST } from '../../constant'
import { useSelector } from 'react-redux'

function NewTokenForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const { provider } = useSDK()
    const userAddress = useSelector((state: any) => state.user.address);
    const newTokenInfo = useSelector((state: any) => state.newToken)
    const [showAlert, setShowAlert] = useState(false);

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
                return <TokenInformation />
            case 1:
                return <Tokenomics />
            case 2:
                return <LinkingSocials />
            case 3:
                return <Final />
            default:
                return <TokenInformation />
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
                        // content: 'text-gray-600',
                        // confirmButton: 'bg-[#6c5dd3] hover:bg-[#7b6ae0] text-white px-8 py-2 rounded-lg text-sm font-medium transition-colors',
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
                    const fujiProvider = new ethers.providers.JsonRpcProvider(FUJI_RPC_URL)

                    const abiCoder = new ethers.utils.Interface([
                        "function createToken(string memory name, string memory ticker, uint256 maxSupply)"
                    ]);

                    const encodedData = abiCoder.encodeFunctionData("createToken", [
                        "Your Token Name",
                        "TKN",
                        ethers.utils.parseUnits("1000000000", 18)
                    ]);


                    const fee = await estimateFee(fujiProvider, FACTORY_CONTRACT_ADDRESS, encodedData)
                    const finalFee = CREATE_TOKEN_FEE * parseFloat(fee)

                    provider?.request({
                        method: 'eth_sendTransaction',
                        params: [
                            {
                                from: userAddress,
                                to: ADMIN_ADDRESS,
                                value: ethers.utils.parseEther(finalFee.toString()).toHexString()
                            },
                        ],
                    })
                        .then((txHash) => console.log(txHash))
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
    )
}

export default NewTokenForm