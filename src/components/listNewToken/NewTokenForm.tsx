import React, { useState } from 'react'
import Stepper from './stepper/Stepper'
import StepperControl from './stepper/StepperControl'
import TokenInformation from './steps/TokenInformation'
import Tokenomics from './steps/Tokenomics'
import LinkingSocials from './steps/LinkingSocials'
import Final from './steps/Final'
function NewTokenForm() {
    const [currentStep, setCurrentStep] = useState(0)

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

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === 'next' ? newStep++ : newStep--;
        // check out of bounds
        if (currentStep === steps.length - 1) {
            
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