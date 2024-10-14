import React from 'react'
import NavbarLeft from '../components/navbar/NavbarLeft'
import NavbarRight from '../components/navbar/NavbarRight'
import Navbar from '../components/navbar/Navbar'
import IntellectualProperty from '../components/common/IntellectualProperty'
import PairBanner from '../components/PairBanner/PairBanner'
import TokenPriceHistoryChart from '../components/chart/TokenPriceHistoryChart'

import '../App.css'
function MainPage() {
  return (
    <div className='flex flex-col align-middle w-full h-full items-center'>
      <Navbar/>
      <IntellectualProperty/>
      <PairBanner/>
      <TokenPriceHistoryChart/>
    </div>
  )
}

export default MainPage