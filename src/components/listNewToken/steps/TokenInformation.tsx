import React, { useEffect, useState } from 'react'
import { Upload, Info } from 'lucide-react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { changeNewTokenData } from '../../../redux/slice/newTokenSlice';

function TokenInformation({ tokenImage, setTokenImage }: { tokenImage: File, setTokenImage: (image: File) => void }) {
  const dispatch = useDispatch();
  const newTokenData = useSelector((state: any) => state.newToken);
  const [tokenName, setTokenName] = useState(newTokenData.name);
  const [tokenSymbol, setTokenSymbol] = useState(newTokenData.symbol);
  const [description, setDescription] = useState(newTokenData.description);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTokenImage(e.target.files[0])
    }
  };

  useEffect(() => {
    // This function runs when the component is unmounted
    dispatch(changeNewTokenData({
      ...newTokenData,
      name: tokenName,
      symbol: tokenSymbol,
      description: description,
    }));
  }, [tokenName, tokenSymbol, description]);
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl mt-6">
      <div className="space-y-6">
        {/* Token Name */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Token Name
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="text"
              name="tokenName"
              value={tokenName}
              required
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="eg: Bitcoin"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Token Symbol */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Token Symbol
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <div className="relative">
            <input
              type="text"
              name="tokenSymbol"
              value={tokenSymbol}
              required
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="eg: BTC"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Description
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <textarea
            name="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="eg: my token is the future"
            className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
          />
        </div>

        {/* Token Image */}
        <div className="space-y-2">
          <label className="flex items-center text-white text-sm font-medium">
            Token Image
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </label>
          <div className="relative">
            <div className="w-full px-4 py-8 bg-slate-700 rounded-lg border-2 border-dashed border-gray-500 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-all">
              {!tokenImage && <Upload className="w-8 h-8 text-gray-400 mb-2" />}
              <input
                type="file"
                name="tokenImage"
                required
                onChange={handleFileChange}
                className="opacity-0 absolute w-full h-full cursor-pointer"
                accept="image/*"
              />
              {!tokenImage ? <span className="text-gray-400 text-sm">
                {'No file selected.'}
              </span> : <img src={URL.createObjectURL(tokenImage)} alt="token" className="object-cover rounded-lg" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenInformation