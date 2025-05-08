import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { showAlert, showFailedAlert, callAddLiquidityContract, approveERC20 } from '../../utils';
import { PATCH_API, axiosInstance } from '../../apis/api';
import { ethers } from 'ethers';
import Loading from '../common/Loading';

export default function AddLiquidityPanel({ tokenAAddress, tokenBAddress, contractAddress, onClose, getAllTradingPairs, setWaitForApproving }: { tokenAAddress: string, tokenBAddress: string, contractAddress: string, onClose: () => void, getAllTradingPairs: () => void, setWaitForApproving: (isWaiting: boolean) => void }) {
  const [firstTokenAmount, setFirstTokenAmount] = useState('');
  const [secondTokenAmount, setSecondTokenAmount] = useState('');

  const addLiquidity = async (amountA: string, amountB: string) => {
    try {
      const tx1 = await approveERC20(tokenAAddress, contractAddress, ethers.utils.parseEther(amountA).toString())
      const tx2 = await approveERC20(tokenBAddress, contractAddress, ethers.utils.parseEther(amountB).toString())
      setWaitForApproving(true)
      await tx1.wait()
      await tx2.wait()
      setWaitForApproving(false)
      console.log("contractAddress", contractAddress)
      console.log("amountA", amountA)
      console.log("amountB", amountB)
      const tx = await callAddLiquidityContract(contractAddress, amountA, amountB)
      showAlert(tx.hash, "Add liquidity successfully")
      const receipt = await tx.wait()

      const res = await axiosInstance.patch(PATCH_API.UPDATE_TRADING_PAIR_RESERVE(contractAddress), {
        tokenAAddress: tokenAAddress,
        tokenBAddress: tokenBAddress,
      })
      getAllTradingPairs()

      console.log(res)
    }
    catch (error) {
      console.log(error)
      showFailedAlert("Add liquidity failed")
    }
  }


  return (
    <>
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
              placeholder="Enter first token amount"
              value={firstTokenAmount}
              onChange={(e) => setFirstTokenAmount(e.target.value)}
            />
          </div>

          {/* Second token input */}
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800 p-4 rounded-lg italic"
              placeholder="Enter second token amount"
              value={secondTokenAmount}
              onChange={(e) => setSecondTokenAmount(e.target.value)}
            />
          </div>

          {/* Connect Wallet Button */}
          <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg mt-4 font-medium" onClick={() => addLiquidity(firstTokenAmount, secondTokenAmount)}>
            Add Liquidity
          </button>
        </div>
      </div>
    </>
  );
}