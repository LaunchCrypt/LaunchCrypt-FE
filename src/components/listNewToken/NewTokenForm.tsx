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
            case 1:
                return <TokenInformation />
            case 2:
                return <Tokenomics />
            case 3:
                return <LinkingSocials />
            case 4:
                return <Final />
            default:
                return <TokenInformation />
        }
    }
    return (
        <div className='mx-auto shadow-xl rounded-2xl pb-2 w-[50vw]'>
            <div className='container horizontal mt-5'>
                <Stepper steps={steps} currentStep={currentStep}/>
            </div>

            <StepperControl />
        </div>
    )
}

export default NewTokenForm