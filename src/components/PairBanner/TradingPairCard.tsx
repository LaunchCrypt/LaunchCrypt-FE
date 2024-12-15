import React from 'react';
import { base64toUrl, copyToClipboard, formatAddressLong, formatBalance, truncateText } from '../../utils';
import avaxLogo from "../../../assets/icons/Avalanche-logo.svg"
import copyIcon from "../../../assets/icons/copy.svg";
import { useNavigate } from 'react-router-dom';
import { DEFAULT_QUERY_ALL } from '../../constant';
import { useLiquidityPair } from '../../hooks/useLiquidityPair';
import { axiosInstance, GET_API } from '../../apis/api';


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


function TradingPairCard({ contract, token1Name, token2Name, marketCap, token2Icon, token1Reservers, token2Reservers, isLoading }: {
  contract: string,
  token1Name: string,
  token2Name: string,
  marketCap?: string,
  token2Icon: string,
  token1Reservers: string,
  token2Reservers: string,
  isLoading?: boolean
}) {
  const navigate = useNavigate()
  const onClick = async () => {
    const liquidityPair = await axiosInstance.get(GET_API.GET_LIQUIDITY_PAIR_BY_ADDRESS(contract))
    console.log("liquidityPair", liquidityPair)
    navigate(`/trade/${contract}`, {
      state: {
        liquidityPairId: (liquidityPair as any).data.id,
        liquidityPairAddress: contract,
        tokenSymbol: token2Name,
        tokenId: (liquidityPair as any).data.tokenA._id
      }
    })
  }
  if (isLoading) {
    return <TradingPairCardSkeleton />
  }
  return (
    <div className="bg-[#16162d] rounded-3xl text-white p-6 
    shadow-[0_0_1px_#00000003,0_4px_8px_#0000000a,0_16px_24px_#0000000a,0_24px_32px_#00000003]">
      {/* Header */}
      <div className="flex items-center gap-1 mb-4">
        <div className='flex flex-row align-middle items-center justify-center -translate-x-6'>
          <img src={avaxLogo} alt="" className='h-11 w-11 z-10 translate-x-6' />
          <img src={base64toUrl((token2Icon as any).buffer)} alt="" className='w-11 h-11 z-0' />
        </div>
        <div>
          <p className="text-lg text-[#21px] leading-6 tracking-[.44px] text-textPrimary font-medium ">{token1Name} - {token2Name}</p>
        </div>
      </div>

      {/* Pool Info */}
      <div className="space-y-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-normal text-[14px] leading-[25px] text-textPrimary opacity-60">Market Cap: </span>
          <div className="flex items-center gap-2">
            <span className="font-medium leading-[25px] text-textPrimary text-[15px]">${marketCap ? marketCap : 0}</span>
          </div>
        </div>

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
            <img src={avaxLogo} alt={token1Name} className="w-8 h-8" />
          </div>
          <span className="font-normal text-[15px] leading-[25px]">{formatBalance(token1Reservers, 6)} {token1Name}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img src={base64toUrl((token2Icon as any).buffer)} alt={token2Name} className="w-8 h-8" />
            </div>
          </div>
          <span className="font-normal text-[15px] leading-[25px]">{formatBalance(token2Reservers, 12)} {token2Name}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={onClick}
          className="px-4 py-3 bg-[#43395b] rounded-[100px] hover:bg-[#483a6b] text-white text-[15px] font-medium transition-colors duration-200">
          Trade
        </button>
        <button className="px-4 py-3 bg-[#43395b] rounded-[100px] hover:bg-[#483a6b] text-white text-[15px] font-medium transition-colors duration-200">
          Add Liquidity
        </button>
      </div>
    </div>
  );
};

export default TradingPairCard;
