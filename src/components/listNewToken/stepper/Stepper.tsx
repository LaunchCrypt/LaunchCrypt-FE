import React, { useEffect, useRef, useState } from 'react'

function Stepper({ steps, currentStep }: { steps: string[], currentStep: number }) {

    const [newStep, setNewStep] = useState([])
    const stepRef = useRef<any>()

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps];
        let count = 0;

        while (count < newSteps.length) {
            // current step
            if (count == stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true
                }
                count++;
            }
            // step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true
                }
                count++;
            }
            // step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false
                }
                count++;
            }
        }
        return newSteps;
    }
    useEffect(() => {
        const stepsState = steps.map((step, index) => {
            return Object.assign({}, {
                description: step,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false
            })
        })

        stepRef.current = stepsState
        const current = updateStep(currentStep - 1, stepRef.current)
        setNewStep(current as any)
    }, [steps, currentStep])

    const displaySteps = newStep.map((step, index) => {
        return (
            <div key={index} className={index != newStep.length - 1 ? `w-full flex items-center` : "flex items-center"}>
                <div className='relative flex flex-col items-center text-white'>
                    <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 
                flex items-center justify-center py-3 ${(step as any).selected ? "bg-purple-600 text-white font-bold border border-purple-600" : ""}`}>
                        {(step as any).completed ? <span className='text-white font-bold text-xl'>&#10003;</span> : index + 1}
                    </div>
                    <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase
                        ${(step as any).highlighted ? "text-gray-500" : "text-gray-400"}
                        ${(index == 0 && "translate-x-3")}`}>
                        {(step as any).description}
                    </div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out 
                    ${(step as any).completed ? "border-purple-600" : "border-gray-300"}`}>

                </div>
            </div>
        )
    })

    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
            {displaySteps}
        </div>
    )
}

export default Stepper