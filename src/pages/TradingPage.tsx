import React, { useState } from 'react';
import CandleStickChart from "../components/chart/CandleStickChart";
import TradingSidebar from '../components/trading/TradingSideBar';
import CommentTrade from '../components/trading/CommentTrade';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TradingPage = () => {
  const location = useLocation();
  const {tokenSymbol } = location.state || {};
  const userAddress = useSelector((state: any) => state.user.address);


  return (
    <div className="flex flex-row h-screen align-middle justify-center">
      {/* Chart Area */}
      <div className="flex w-full justify-around gap-8 px-8">
        <div className='flex flex-col w-full h-fit'>
        <CandleStickChart tokenSymbol={tokenSymbol}/>
        <CommentTrade userAddress={userAddress} tokenSymbol={tokenSymbol}/>
        </div>

        {/* Right Trading Panel */}
        <TradingSidebar tokenSymbol={tokenSymbol}/>
      </div>
    </div>
  );
};

export default TradingPage;