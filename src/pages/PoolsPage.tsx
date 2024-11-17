import React, { useState } from "react";
import { Search } from 'lucide-react';

function PoolsPage(){
    const [activeTab, setActiveTab] = useState('Pools');
  const [activePoolType, setActivePoolType] = useState('Classic');
  const [activeTokenFilter, setActiveTokenFilter] = useState('ALL');

  const tabs = ['Pools', 'My Pools'];
  const poolTypes = ['Classic', 'Concentrated'];
  const tokenFilters = [
    { id: 'ALL', count: 90 },
    { id: 'TOP', count: 20 },
    { id: 'APT', count: 65 },
    { id: 'USDC', count: 20 },
    { id: 'USDT', count: 14 },
    { id: 'WETH', count: 8 }
  ];

  const trendingPairs = [
    { name: 'USDC/APT', volume: '$3,940,923.46', token1Icon: '🔵', token2Icon: '⚪' },
    { name: 'amAPT/USDT', volume: '$246,882.99', token1Icon: '🔷', token2Icon: '💠' },
    { name: 'doodoo/APT', volume: '$22,076.67', token1Icon: '🎨', token2Icon: '⚪' },
    { name: 'UPTOS/APT', volume: '$41,038.81', token1Icon: '🌟', token2Icon: '⚪' },
    { name: 'USDC/USDT', volume: '$354,599.99', token1Icon: '🔵', token2Icon: '💠' }
  ];

  const poolsData = [
    {
      pair: 'USDC/APT',
      type: 'LayerZero',
      version: 'Ver. 0',
      correlation: 'Uncorrelated',
      volume24h: '$3,940,923.46',
      apr: '39.57 %',
      tvl: '$22.213M',
      token1Icon: '🔵',
      token2Icon: '⚪'
    },
    // Add more pool data as needed
  ];

  return (
    <div className="min-h-screen bg-[#14141F] text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Liquidity Pools</h1>
            <span className="text-gray-400">ⓘ</span>
          </div>
          <p className="text-sm text-gray-400">Stake APT to earn rewards</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            Add Liquidity
          </button>
          <button className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            Create Pool
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`pb-4 px-2 text-sm font-medium relative ${
              activeTab === tab ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600" />
            )}
          </button>
        ))}
      </div>

      {/* Pool Type and Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex bg-[#1B1B24] rounded-lg overflow-hidden">
          {poolTypes.map(type => (
            <button
              key={type}
              className={`px-6 py-2 text-sm ${
                activePoolType === type ? 'bg-[#555571] text-white' : 'text-gray-400'
              }`}
              onClick={() => setActivePoolType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Pools"
            className="w-full bg-[#1B1B24] rounded-lg pl-12 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Trending Pairs */}
      <div className="mb-8">
        <h2 className="text-sm text-gray-400 mb-4">TRENDING PAIRS</h2>
        <div className="flex gap-4 overflow-x-auto">
          {trendingPairs.map((pair, index) => (
            <div key={index} className="bg-[#1B1B24] p-4 rounded-lg min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span>{pair.token1Icon}</span>
                <span>{pair.token2Icon}</span>
                <span>{pair.name}</span>
              </div>
              <div className="text-sm text-gray-400">
                Volume 24H
                <div className="text-white font-medium">{pair.volume}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Token Filters */}
      <div className="flex gap-4 mb-6">
        {tokenFilters.map(filter => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeTokenFilter === filter.id
                ? 'bg-[#555571] text-white'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTokenFilter(filter.id)}
          >
            {filter.id} {filter.count}
          </button>
        ))}
      </div>

      {/* Pools Table */}
      <div className="bg-[#1B1B24] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="text-left text-sm text-gray-400 border-b border-gray-800">
            <tr>
              <th className="px-6 py-4">Pools</th>
              <th className="px-6 py-4">Volume 24H ↕</th>
              <th className="px-6 py-4">APR ↕</th>
              <th className="px-6 py-4">TVL 📊</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {poolsData.map((pool, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span>{pool.token1Icon}</span>
                    <span>{pool.token2Icon}</span>
                    <div>
                      <div className="font-medium">{pool.pair}</div>
                      <div className="text-sm text-gray-400">
                        {pool.type} • {pool.correlation} • {pool.version}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{pool.volume24h}</td>
                <td className="px-6 py-4">{pool.apr}</td>
                <td className="px-6 py-4">{pool.tvl}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700">+</button>
                    <button className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700">↓</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PoolsPage;