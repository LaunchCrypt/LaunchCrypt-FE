import React, { useState } from 'react';
import { Trophy, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StakingPage = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewardsBalance, setRewardsBalance] = useState(0);
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return;
    setIsStaking(true);
    setTimeout(() => {
      setStakedBalance(prev => prev + amount);
      setStakeAmount('');
      setIsStaking(false);
    }, 1000);
  };

  const handleUnstake = () => {
    if (stakedBalance <= 0) return;
    setIsStaking(true);
    setTimeout(() => {
      setStakedBalance(0);
      setIsStaking(false);
    }, 1000);
  };

  const claimRewards = () => {
    if (rewardsBalance <= 0) return;
    setRewardsBalance(0);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-gray-900/40 backdrop-blur-xl border border-purple-500/20 shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600/90 to-purple-800/90 backdrop-blur-sm p-8">
          <h1 className="text-3xl font-bold text-center text-white">Staking Pool</h1>
          <p className="text-center text-purple-200/90">Earn rewards by staking your tokens</p>
        </div>
        
        <div className="px-6 py-8">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="text-purple-400" size={20} />
                  <p className="text-sm text-gray-300">Staked Balance</p>
                </div>
                <p className="text-2xl font-bold text-white">{stakedBalance.toFixed(2)}</p>
                <p className="text-sm text-purple-300/70">TOKEN</p>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-purple-400" size={20} />
                  <p className="text-sm text-gray-300">Rewards</p>
                </div>
                <p className="text-2xl font-bold text-white">{rewardsBalance.toFixed(2)}</p>
                <p className="text-sm text-purple-300/70">TOKEN</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Amount to Stake
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 h-12 text-lg bg-gray-800/40 backdrop-blur-sm border border-purple-500/20 rounded-lg px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  min="0"
                />
                <button 
                  onClick={handleStake}
                  disabled={isStaking || !stakeAmount}
                  className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isStaking ? 'Staking...' : 'Stake Now'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleUnstake}
                disabled={isStaking || stakedBalance <= 0}
                className="h-12 bg-gray-800/40 backdrop-blur-sm hover:bg-gray-700/40 text-white font-semibold rounded-lg border border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
              >
                <ArrowDownRight className="mr-2" size={18} />
                Unstake All
              </button>
              <button
                onClick={claimRewards}
                disabled={rewardsBalance <= 0}
                className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
              >
                <ArrowUpRight className="mr-2" size={18} />
                Claim Rewards
              </button>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-300">Current APR</p>
                  <p className="text-xs text-purple-300/70">Annual Percentage Rate</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">12.5%</p>
                  <p className="text-sm text-purple-300">+2.3% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingPage;