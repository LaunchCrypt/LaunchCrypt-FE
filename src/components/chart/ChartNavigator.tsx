import React, { useState } from 'react'


function ChartNavigator({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: any }) {
    const navigateButton = (selectedTime: string, index: number, onClick: any) => {
        return (
            <button onClick={onClick} className={`${activeIndex == index ? 'bg-[#4a495e]' : 'bg-none'} w-[52px] h-[32px] 
            rounded-[51px] gap-1 cursor-pointer text-[#fbfaff] text-sm hover:bg-[#3e3e52]`}>{selectedTime}</button>
        )
    }
    return (
        <div className='flex flex-row bg-[#24243a] rounded-[100px] p-[2px_4px] gap-1.5'>
            {navigateButton('1H', 0, () => setActiveIndex(0))}
            {navigateButton('1D', 1, () => setActiveIndex(1))}
            {navigateButton('1W', 2, () => setActiveIndex(2))}
            {navigateButton('6M', 3, () => setActiveIndex(3))}
            {navigateButton('Y', 4, () => setActiveIndex(4))}
        </div>
    )
}

export default ChartNavigator