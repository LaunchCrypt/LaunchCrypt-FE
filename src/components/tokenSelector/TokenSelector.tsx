import React, { useState } from "react";
import { Itoken } from "../../interfaces/index"
import useTokens from "../../hooks/useToken";
import { base64toUrl } from "../../utils";

function TokenSelector({ isOpen, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    limit:20,
    sortField:"createdAt",
    sortOrder:'asc'
  });
  const { tokens, loading, error, refetch } = useTokens(searchQuery);


  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 z-40
            ${isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#13141F] shadow-2xl
            transform transition-all duration-300 ease-out z-50 border-l border-purple-500/20
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/10 bg-gradient-to-r from-[#1a1b23] to-[#1F2037]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Select Token
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-purple-500/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search box */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search token name or paste address"
                className="w-full bg-[#1D1E2D] text-white px-4 py-4 rounded-2xl pl-12
                          border border-purple-500/20 focus:border-purple-500/50
                          transition-all duration-200
                          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <svg
                className="absolute left-4 top-4 w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-180px)] px-2">
          {tokens.map((token) => (
            <button
              key={token.contractAddress}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="w-full p-4 my-2 flex items-center rounded-xl
                         hover:bg-purple-500/10 active:bg-purple-500/20
                         transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10
                            rounded-full flex items-center justify-center mr-4 overflow-hidden
                            group-hover:from-purple-500/30 group-hover:to-purple-500/20
                            transition-all duration-200">
                {token.image ? (
                  <img src={base64toUrl((token.image as any).buffer)} alt={token.symbol} className="w-full h-full" />
                ) : (
                  <span className="text-purple-400 font-bold text-xl">{token.symbol[0]}</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                  {token.symbol}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {token.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TokenSelector;