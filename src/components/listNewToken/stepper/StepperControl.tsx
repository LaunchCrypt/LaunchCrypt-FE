import { ChevronRight } from 'lucide-react'
import React from 'react'

function StepperControl({ handleClick, currentStep, steps }: { handleClick: any, currentStep: number, steps: string[] }) {
  return (
    <div className='container flex justify-around mt-4 mb-8'>
      <button
        onClick={() => handleClick('back')}
        className={`px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all
        cursor-pointer  hover:text-white duration-200 ease-in-out 
        ${currentStep == 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
        Back
      </button>


      <button
        onClick={() => handleClick('next')}
        className='px-6 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-all flex items-center
        cursor-pointer  hover:text-white  duration-200 ease-in-out'>
        {currentStep == steps.length - 1 ? "Confirm" : "Next"}
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  )
}

export default StepperControl