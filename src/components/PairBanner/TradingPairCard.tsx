import React, { useState } from 'react';
import { base64toUrl, copyToClipboard, formatAddressLong, formatBalance, truncateText } from '../../utils';
import avaxLogo from "../../../assets/icons/Avalanche-logo.svg"
import rocketLogo from "../../../assets/images/rocket-logo1.png"
import copyIcon from "../../../assets/icons/copy.svg";
import { useNavigate } from 'react-router-dom';
import { axiosInstance, GET_API } from '../../apis/api';
import AddLiquidityPanel from '../addLiquidity/AddLiquiditityPanel';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import WalletWarning from "../common/WalletWarning"
import Modal from '../Modal/Modal';
import Loading from '../common/Loading';

const TradingPairCardSkeleton = () => {
  return (
    <div className="bg-[#16162d] rounded-3xl text-white p-6 
    shadow-[0_0_1px_#00000003,0_4px_8px_#0000000a,0_16px_24px_#0000000a,0_24px_32px_#00000003]">
      {/* Header Skeleton */}
      <div className="flex items-center gap-1 mb-4">
        <div className='flex flex-row align-middle items-center justify-center -translate-x-6'>
          <div className='h-11 w-11 rounded-full bg-gray-700 animate-pulse z-10 translate-x-6'></div>
          <div className='w-11 h-11 rounded-full bg-gray-700 animate-pulse z-0'></div>
        </div>
        <div className="w-32 h-6 bg-gray-700 rounded animate-pulse ml-2"></div>
      </div>

      {/* Pool Info Skeleton */}
      <div className="space-y-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="w-8 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>

        <div className="flex justify-between items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-9 bg-gray-700 rounded-[100px] animate-pulse"></div>
        <div className="h-9 bg-gray-700 rounded-[100px] animate-pulse"></div>
      </div>
    </div>
  );
};


function TradingPairCard({ contract, token1Name, token2Name, token1Contract, token2Contract, marketcap, token2Icon, token1Reservers, token2Reservers, isLoading, type, getAllTradingPairs }: {
  contract: string,
  token1Name: string,
  token2Name: string,
  token1Contract?: string,
  token2Contract?: string,
  marketcap?: string,
  token2Icon?: string,
  token1Reservers: string,
  token2Reservers: string,
  isLoading?: boolean,
  type: "ERC20 to ERC20" | "Native to ERC20",
  getAllTradingPairs?: () => void
}) {
  const navigate = useNavigate()
  const [showAddLiquidity, setShowAddLiquidity] = useState(false)
  const [isWalletWarning, setIsWalletWarning] = useState(false)
  const [waitForApproving, setWaitForApproving] = useState(false)
  const userAddress = useSelector((state: any) => state.user.address);
  const tradeNativeToERC20 = async () => {
    const liquidityPair = await axiosInstance.get(GET_API.GET_LIQUIDITY_PAIR_BY_ADDRESS(contract))
    navigate(`/trade/${contract}`, {
      state: {
        liquidityPairId: (liquidityPair as any).data.id,
        liquidityPairAddress: contract,
        tokenSymbol: token2Name,
        tokenId: (liquidityPair as any).data.tokenA._id,
        collateral: (liquidityPair as any).data.tokenBReserve,
        comments: (liquidityPair as any).data.comments,
        creator: (liquidityPair as any).data.creator,
        createdAt: (liquidityPair as any).data.createdAt,
        marketcap: marketcap ? Number(marketcap).toFixed(2) : 0,
        tokenA: (liquidityPair as any).data.tokenA,
      }
    })
  }
  const tradeERC20ToERC20 = async () => {
    const tradingPair = await axiosInstance.get(GET_API.GET_TRADING_PAIR_BY_ADDRESS(contract))
    navigate(`/swap-external/${contract}`, {
      state: {
        liquidityPairId: (tradingPair as any).data.id,
        tokenA: tradingPair.data.tokenA,
        tokenB: tradingPair.data.tokenB,
        tokenAReserve: tradingPair.data.tokenAReserve,
        tokenBReserve: tradingPair.data.tokenBReserve,
        totalLP: tradingPair.data.totalLP,
        poolAddress: contract
      }
    })
  }

  if (isLoading) {
    return <TradingPairCardSkeleton />
  }
  return (
    <>
      {type === "ERC20 to ERC20" && <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${showAddLiquidity ? 'translate-x-0 z-50' : 'translate-x-full'
          }`}
      >
        <AddLiquidityPanel tokenAAddress={token1Contract as string} tokenBAddress={token2Contract as string} contractAddress={contract} onClose={() => setShowAddLiquidity(false)} getAllTradingPairs={()=>getAllTradingPairs} setWaitForApproving={setWaitForApproving} />
      </div>
      }
      {showAddLiquidity && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out z-10"
          onClick={() => setShowAddLiquidity(false)}
        />
      )}
      {waitForApproving && Loading({ title: 'Wait for approve ERC20 process', message: 'Please confirm the add liquidity transaction in your wallet' })}
      <div className="bg-[#16162d] rounded-3xl text-white p-6 
    shadow-[0_0_1px_#00000003,0_4px_8px_#0000000a,0_16px_24px_#0000000a,0_24px_32px_#00000003]">
        {/* Header */}
        <div className="flex items-center gap-1 mb-4">
          {type === "Native to ERC20" && <div className='flex flex-row align-middle items-center justify-center -translate-x-6'>
            <img src={avaxLogo} alt="" className='h-11 w-11 z-10 translate-x-6' />
            <img src={
              type === "Native to ERC20" ? base64toUrl((token2Icon as any).buffer, (token2Icon as any).mimetype) : rocketLogo} alt="" className='w-11 h-11 z-0 rounded-full overflow-hidden' />
          </div>}
          <div>
            <p className="text-lg text-[#21px] leading-6 tracking-[.44px] text-textPrimary font-medium ">{token1Name} - {token2Name}</p>
          </div>
        </div>

        {/* Pool Info */}
        <div className="space-y-4 mb-4">
          {type === "Native to ERC20" && <div className="flex justify-between items-center">
            <span className="font-normal text-[14px] leading-[25px] text-textPrimary opacity-60">Market Cap: </span>
            <div className="flex items-center gap-2">
              <span className="font-medium leading-[25px] text-textPrimary text-[15px]">${marketcap ? Number(marketcap).toFixed(2) : 2300}</span>
            </div>
          </div>}

          <div className="flex justify-between items-center">
            <span className="font-normal text-[14px] leading-[25px] text-textPrimary opacity-60">Contract: </span>
            <div className="flex items-center gap-2">
              <img src={copyIcon} onClick={() => copyToClipboard(contract)}
                className="w-6 h-6 bg-inherit inline ml-20 mb-1 cursor-pointer" />
              <span className="leading-[25px] text-textPrimary text-[15px]">{formatAddressLong(contract, 5)}</span>
            </div>
          </div>

          <div className="font-normal text-[14px] leading-[25px] text-textPrimary opacity-60 text-left">Reserves:</div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={type === "Native to ERC20" ? avaxLogo : rocketLogo} alt={token1Name} className="w-8 h-8" />
            </div>
            <span className="font-normal text-[15px] leading-[25px]">{
              type === "Native to ERC20" ? formatBalance(token1Reservers, 6) : parseFloat(ethers.utils.formatEther(token1Reservers)).toFixed(2)
            } {token1Name}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img src={
                  type === "Native to ERC20" ? base64toUrl((token2Icon as any).buffer, (token2Icon as any).mimetype) : rocketLogo} alt={token2Name} className="w-8 h-8 rounded-full overflow-hidden" />
              </div>
            </div>
            <span className="font-normal text-[15px] leading-[25px]">{
              type === "Native to ERC20" ? formatBalance(token2Reservers, 12) : parseFloat(ethers.utils.formatEther(token2Reservers)).toFixed(2)
            } {token2Name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={type === "Native to ERC20" ? tradeNativeToERC20 : tradeERC20ToERC20}
            className="px-4 py-3 bg-[#43395b] rounded-[100px] hover:bg-[#483a6b] text-white text-[15px] font-medium transition-colors duration-200">
            Trade
          </button>
          {type === "ERC20 to ERC20" ? <button onClick={() => {
            if (!userAddress) {
              setIsWalletWarning(true)
              return;
            }
            setShowAddLiquidity(true)
          }} className="px-4 py-3 bg-[#43395b] rounded-[100px] hover:bg-[#483a6b] text-white text-[15px] font-medium transition-colors duration-200">
            Add Liquidity
          </button> : <button className="px-4 py-3 bg-[#43395b] rounded-[100px] hover:bg-[#483a6b] text-white text-[15px] font-medium transition-colors duration-200">
            Add Liquidity
          </button>}
        </div>
      </div>
      {isWalletWarning && <Modal isVisible={isWalletWarning}
        onClose={() => setIsWalletWarning(false)}
        children={<WalletWarning closeModal={() => setIsWalletWarning(false)} />} />
      }
    </>
  );
};

export default TradingPairCard;
