import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';

const ValidatorCard = ({ data }) => {
  const truncateAddress = (address) => `${address.slice(0, 10)}...${address.slice(-8)}`;

  return (
    <div className="bg-[#1a1b2a] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Rank</span>
          <span className="text-white text-lg">{data.rank}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Validator</span>
          <div className="flex items-center gap-2">
            <code className="text-gray-300">{truncateAddress(data.address)}</code>
            <button className="text-gray-400 hover:text-gray-300">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-gray-400 mb-1">Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 m-auto mr-0"></div>
            <div className="text-white m-auto ml-0">Active</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Commission</div>
          <div className="text-white">{data.commission}%</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Active Delegators</div>
          <div className="text-white">{data.activeDelegators}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Total Staked</div>
          <div className="text-white">{data.totalStaked.toLocaleString()}AVAX</div>
        </div>
      </div>

      {/* Next Unlock */}
      <div>
        <div className="text-gray-400 mb-1">Next Unlock in</div>
        <div className="text-white">{data.nextUnlock}</div>
      </div>

      {/* Stake Button */}
      <button className="w-full mt-6 py-3 px-6 rounded-lg bg-[#2f3146] hover:bg-[#3f4166] 
        transition-colors text-white font-medium">
        Stake
      </button>
    </div>
  );
};

const StakingPage = () => {
  // Sample data
  const validators = [
    {
      rank: 1,
      address: "0xa651c7c5...837c66db",
      status: "Active",
      commission: 8,
      activeDelegators: 4299,
      totalStaked: 29867924.87,
      nextUnlock: "5d 22h 23m"
    },
    {
      rank: 2,
      address: "0xf0d49cff...1510c218",
      status: "Active",
      commission: 10,
      activeDelegators: 407,
      totalStaked: 23913748.78,
      nextUnlock: "3d 16h 15m"
    },
    // Add more validators as needed
  ];

  return (
    <div className="bg-[#13141F] p-8 align-middle rounded-3xl max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-medium text-white mb-2">
              Avalanche Delegated Staking
            </h1>
            <p className="text-gray-400">
              Stake AVAX to earn rewards
            </p>
          </div>
          <div className="bg-[#1a1b2a] rounded-lg p-4">
            <div className="text-gray-400 mb-1">Staking Balance</div>
            <div className="text-white text-lg">
              332,649.82 AVAX
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 border-b border-[#2f3146]">
          <button className="px-4 py-3 text-purple-400 border-b-2 border-purple-400">
            Validators
          </button>
          <button className="px-4 py-3 text-gray-400 hover:text-gray-300">
            My Holdings
          </button>
        </div>
      </div>

      {/* Validators Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {validators.map((validator) => (
          <ValidatorCard key={validator.address} data={validator} />
        ))}
      </div>
    </div>
  );
};

export default StakingPage;