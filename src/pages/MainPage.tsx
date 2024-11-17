import React from 'react'
import PairBanner from '../components/PairBanner/PairBanner'
import TokenPriceHistoryChart from '../components/chart/TokenPriceHistoryChart'
import '../App.css'
import Swap from '../components/swap/Swap'

function MainPage() {
  return (
    <div className='flex flex-col align-middle items-center'>
      <PairBanner />
      <div className='flex flex-row w-full align-middle justify-center gap-4'>
        <TokenPriceHistoryChart />
        <Swap />
      </div>
    </div>
  )
}

export default MainPage