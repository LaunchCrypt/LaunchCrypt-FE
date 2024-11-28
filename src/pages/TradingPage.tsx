import React, { useState } from 'react';
import CandleStickChart from "../components/chart/CandleStickChart";
import TradingSidebar from '../components/trading/TradingSideBar';
import CommentTrade from '../components/trading/CommentTrade';

const TradingPage = () => {
  const [selectedSize, setSelectedSize] = useState('0.5 SOL');

  return (
    <div className="flex flex-row h-screen align-middle justify-center">
      {/* Chart Area */}
      <div className="flex w-full justify-around gap-8 px-8">
        <div className='flex flex-col w-full h-fit'>
        <CandleStickChart />
          <CommentTrade />
        </div>

        {/* Right Trading Panel */}
        <TradingSidebar />
      </div>
    </div>
  );
};

export default TradingPage;