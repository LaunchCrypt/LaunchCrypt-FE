import { Info, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeNewTokenData } from '../../../redux/slice/newTokenSlice';

function Tokenomics() {
  const dispatch = useDispatch();
  const newTokenData = useSelector((state: any) => state.newToken);
  const [tokenFee, setTokenFee] = useState('0');
  const [totalSupply, setTotalSupply] = useState('1000000000');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "fee" | "supply") => {
    const value = e.target.value;
    // Only allow digits and an optional decimal point
    if (type === 'fee' || type === 'supply') {
      // Allow only numbers and decimal points
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        if (type === 'fee') {
          setTokenFee(value);
        } else {
          setTotalSupply(value);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      // This function runs when the component is unmounted
      dispatch(changeNewTokenData({
        ...newTokenData,
        tokenFee: parseFloat(tokenFee) || 0,
        totalSupply: parseFloat(totalSupply) || 1000000000,
      }));
    };
  }, [tokenFee, totalSupply]);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl mt-6">
      <div className="space-y-6">
        {/* Token Name */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Fee
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="text"
              value={tokenFee}
              onChange={e=>handleChange(e, "fee")}
              placeholder="eg: 0.03"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Token Symbol */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Total Supply
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="text"
              value={totalSupply}
              onChange={e=>handleChange(e, "supply")}
              placeholder="eg: 1000000000"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tokenomics