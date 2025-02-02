import React, { useState, useEffect } from 'react';
import { Trophy, Wallet, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { STAKE_CONTRACT_ADDRESS } from '../constant';
import { useStake } from '../hooks/useStake';
import { useSelector } from 'react-redux';
import { callStakeContract, convertUnixTimestampToTime, showAlert, showFailedAlert } from '../utils';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import WalletWarning from '../components/common/WalletWarning';
const StakingPage = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewardsBalance, setRewardsBalance] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [stakeDuration, setStakeDuration] = useState(30);
  const [timeStaked, setTimeStaked] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [progressPercent, setProgressPercent] = useState(30); // Demo value
  const userAddress = useSelector((state: any) => state.user.address);
  const { stake, isLoading, error, getStakeByStaker, callStakeBackend } = useStake();
  const navigate = useNavigate();


  const handleStake = async () => {
    try {
      let response = await callStakeContract(
        STAKE_CONTRACT_ADDRESS,
        parseFloat(stakeAmount),
        stakeDuration);
      await response.wait();
      showAlert(response.hash, 'Stake successfully');
      try {
        await callStakeBackend(userAddress, parseFloat(stakeAmount), stakeDuration);
      } catch (err) {
        console.error('Stake failed:', err);
      }
    }
    catch (err) {
      console.error('Stake failed:', err);
      showFailedAlert('Stake failed');
      return;
    }
  };


  const handleUnstake = () => {
    if (stakedBalance <= 0) return;
    setIsStaking(true);
    setTimeout(() => {
      setStakedBalance(0);
      setTimeStaked('');
      setIsStaking(false);
    }, 1000);
  };

  const claimRewards = () => {
    if (rewardsBalance <= 0) return;
    setRewardsBalance(0);
  };

  const handleChangeStakeAmount = (e) => {
    const inputValue = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 9) {
      setStakeAmount(inputValue);
    }
  }

  const getAPRForDuration = (duration) => {
    switch (duration) {
      case 30: return 1;
      case 90: return 3.2;
      case 180: return 7;
      case 360: return 15;
      default: return 1;
    }
  }

  useEffect(() => {
    getStakeByStaker(userAddress);
    console.log('stake', stake);
    setTimeStaked(`${stake.duration as any} days`)
    setRemainingTime(convertUnixTimestampToTime(
      Math.floor(new Date().getTime() / 1000) - stake.startTime,
    ));
  }, [stake]);

  return (
    userAddress == "" ?
      <Modal isVisible={true}
        onClose={() => navigate('/')}
        children={<WalletWarning closeModal={() => { }} />} />
      :
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-purple-500/20 shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600/90 to-purple-800/90 backdrop-blur-sm p-4">
            <h1 className="text-3xl font-bold text-center text-white">Staking Pool</h1>
            <p className="text-center text-purple-200/90">Earn rewards by staking your tokens</p>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Staking Duration Info Card */}
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="text-purple-400" size={20} />
                      <span className="text-gray-300">Staking Duration</span>
                    </div>
                    <span className="text-purple-300">{timeStaked || "0d 0h 0m"}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lock Period Progress</span>
                      <span className="text-purple-300">{remainingTime || `${stakeDuration} days remaining`}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700/50 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="text-purple-400" size={20} />
                    <p className="text-sm text-gray-300">Staked Balance</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{stakedBalance.toFixed(2)}</p>
                  <p className="text-sm text-purple-300/70">AVAX</p>
                </div>
                <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-purple-400" size={20} />
                    <p className="text-sm text-gray-300">Rewards</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{rewardsBalance.toFixed(2)}</p>
                  <p className="text-sm text-purple-300/70">AVAX</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Amount to Stake
                </label>
                <div className='flex flex-row'>
                  <div className="flex space-x-2 flex-1 mr-2 relative">
                    <input
                      value={stakeAmount}
                      onChange={e => handleChangeStakeAmount(e)}
                      placeholder="0.00"
                      className="flex-1 h-12 text-lg bg-gray-800/40 backdrop-blur-sm border border-purple-500/20 rounded-lg px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <button
                    onClick={handleStake}
                    disabled={isStaking || !stakeAmount}
                    className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isStaking ? 'Staking...' : 'Stake Now'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Lock Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 90, 180, 360].map((days) => (
                    <button
                      key={days}
                      onClick={() => setStakeDuration(days)}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${stakeDuration === days
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/40 border border-purple-500/20'
                        }`}
                    >
                      {days} Days
                    </button>
                  ))}
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

              <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Current APR</p>
                    <p className="text-xs text-left text-purple-300/70">{stakeDuration} days lock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">{getAPRForDuration(stakeDuration)}%</p>
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