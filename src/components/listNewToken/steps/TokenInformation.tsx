import React from 'react'
import { Upload, ChevronRight, Info } from 'lucide-react';

function TokenInformation() {
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
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <input
                type="file"
                className="opacity-0 absolute w-full h-full cursor-pointer"
                accept="image/*"
              />
              <span className="text-gray-400 text-sm">
                {'No file selected.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenInformation