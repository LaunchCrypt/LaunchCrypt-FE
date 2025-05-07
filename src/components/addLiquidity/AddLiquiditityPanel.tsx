import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { callCreatePoolContract, showAlert, showFailedAlert, formatEthereumAddress, callAddLiquidityContract } from '../../utils';
import { TRADING_PAIR_CONTRACT_ADDRESS } from '../../constant';
import { PATCH_API, axiosInstance } from '../../apis/api';
import { POST_API } from '../../apis/POST/postApis';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

export default function AddLiquidityPanel({ tradingPair, onClose }: { onClose: () => void , tradingPair: any}) {
  const [firstTokenAmount, setFirstTokenAmount] = useState('');
  const [secondTokenAmount, setSecondTokenAmount] = useState('');
  
  const userAddress = useSelector((state: any) => state.user.address);

  const addLiquidity = async (amountA: string, amountB: string) => {
    try{
      const tx = await callAddLiquidityContract(TRADING_PAIR_CONTRACT_ADDRESS, amountA , amountB)
    showAlert(tx.hash, "Create pool successfully")
    const receipt = await tx.wait()
    const poolAddress = receipt.events[0].topics[1]
    
    const res = await axiosInstance.post(PATCH_API.UPDATE_TRADING_PAIR_RESERVE(poolAddress), {
      tokenAReserve: amountA,
      tokenBReserve: amountB,
    })
    }
    catch(error){
      console.log(error)
      showFailedAlert("Create pool failed")
    }
  }

    
  return (
    <div className="flex flex-col h-full w-full bg-[#16162d] text-white mt-[4px]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-iconPrimary">Add Liquidity</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col p-4 gap-4">
        {/* First token input */}
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-gray-800 p-4 rounded-lg italic"
            placeholder="Enter first token address"
            value={firstTokenAmount}
            onChange={(e) => setFirstTokenAmount(e.target.value)}
          />
        </div>
        
        {/* Second token input */}
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-gray-800 p-4 rounded-lg italic"
            placeholder="Enter second token address"
            value={secondTokenAmount}
            onChange={(e) => setSecondTokenAmount(e.target.value)}
          />
        </div>
        
        {/* Connect Wallet Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg mt-4 font-medium" onClick={()=>addLiquidity(firstTokenAmount, secondTokenAmount)}>
          Create Pool
        </button>
      </div>
    </div>
  );
}