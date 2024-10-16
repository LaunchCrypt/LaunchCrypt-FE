import React from 'react'
import NavbarLeft from '../components/navbar/NavbarLeft'
import NavbarRight from '../components/navbar/NavbarRight'
import Navbar from '../components/navbar/Navbar'
import IntellectualProperty from '../components/common/IntellectualProperty'
import PairBanner from '../components/PairBanner/PairBanner'
import TokenPriceHistoryChart from '../components/chart/TokenPriceHistoryChart'

import '../App.css'

import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('btcPrice', (data) => {
  console.log('BTC Price:', data.price, 'Time:', new Date(data.time));
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

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