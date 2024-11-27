import React, { useState } from 'react';
import CandleStickChart from "../components/chart/CandleStickChart";

const TradingPage = () => {
  const [selectedSize, setSelectedSize] = useState('0.5 SOL');

  return (
    <div className="flex flex-row h-screen bg-[#0D1117] align-middle justify-center">
        {/* Chart Area */}
        <div className="flex w-full justify-around gap-8 px-8">
          <CandleStickChart />

          {/* Right Trading Panel */}
          <div className="w-80 border-l border-gray-800 p-4">
            <div className="flex flex-col gap-4">
              {/* Buy/Sell Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                  buy
                </button>
                <button className="flex-1 bg-gray-700 text-gray-300 py-2 rounded hover:bg-gray-600">
                  sell
                </button>
              </div>

              {/* Amount Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">switch to greg</span>
                  <span className="text-gray-400">set max slippage</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-gray-800 rounded p-2 text-white"
                    placeholder="123"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1">
                    <span className="text-gray-400">SOL</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#848e9c" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                {/* Size Buttons */}
                <div className="flex gap-2">
                  {['0.1 SOL', '0.5 SOL', '1 SOL'].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded ${selectedSize === size
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Place Trade Button */}
              <button className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600">
                place trade
              </button>

              {/* Additional Info */}
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between text-gray-400">
                  <span>bonding curve progress: 6%</span>
                  <span>ℹ️</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded">
                  <div className="bg-green-500 h-full w-[6%] rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TradingPage;