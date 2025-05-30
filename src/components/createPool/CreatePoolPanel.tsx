import React from 'react';
import { X, Settings } from 'lucide-react';
import { callCreatePoolContract, showAlert, showFailedAlert, formatEthereumAddress } from '../../utils';
import { DEFAULT_QUERY_ALL, TRADING_PAIR_CONTRACT_ADDRESS } from '../../constant';
import { axiosInstance } from '../../apis/api';
import { POST_API } from '../../apis/POST/postApis';
import { useSelector } from 'react-redux';
import { useTradingPair } from '../../hooks/useTradingPair';

export default function CreatePoolPanel({ onClose }: { onClose: () => void }) {
  const { getAllTradingPairs } = useTradingPair(
    { searchQuery: DEFAULT_QUERY_ALL }
);
  const [firstTokenAddress, setFirstTokenAddress] = React.useState('');
  const [secondTokenAddress, setSecondTokenAddress] = React.useState('');
  const userAddress = useSelector((state: any) => state.user.address);

  const createPool = async () => {
    try{
      const tx = await callCreatePoolContract(TRADING_PAIR_CONTRACT_ADDRESS,firstTokenAddress, secondTokenAddress)
    showAlert(tx.hash, "Create pool successfully")
    const receipt = await tx.wait()
    const poolAddress = receipt.events[0].topics[1]
    
    const res = await axiosInstance.post(POST_API.CREATE_NEW_TRADING_PAIR(), {
      creator: userAddress,
      tokenA: firstTokenAddress,
      tokenB: secondTokenAddress,
      tokenAReserve: '0',
      tokenBReserve: '0',
      chainId: 43113,
      poolAddress: formatEthereumAddress(poolAddress),
      totalLP: '0',
    })
    getAllTradingPairs();
    
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
        <h2 className="text-2xl font-bold text-iconPrimary">Create Pool</h2>
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
            value={firstTokenAddress}
            onChange={(e) => setFirstTokenAddress(e.target.value)}
          />
        </div>
        
        {/* Second token input */}
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-gray-800 p-4 rounded-lg italic"
            placeholder="Enter second token address"
            value={secondTokenAddress}
            onChange={(e) => setSecondTokenAddress(e.target.value)}
          />
        </div>
        
        {/* Connect Wallet Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg mt-4 font-medium" onClick={createPool}>
          Create Pool
        </button>
      </div>
    </div>
  );
}