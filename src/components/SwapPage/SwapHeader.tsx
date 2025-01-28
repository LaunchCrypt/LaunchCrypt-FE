import { Search } from 'lucide-react';
import React from 'react';
import { POOL_TABS, POOL_TYPES } from '../../pages/SwapPage';

interface SwapHeaderProps {
  currentPoolTabs: string;
  currentPoolTypes: string;
  setPoolTabs: (value: string) => void;
  setPoolTypes: (value: string) => void;
  setSearchKeyword: (keyword: string) => void;
}

function SwapHeader({
  currentPoolTabs,
  currentPoolTypes,
  setPoolTabs,
  setPoolTypes,
  setSearchKeyword
}: SwapHeaderProps) {
  return (
    <div className="flex flex-col align-middle justify-evenly w-full">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6 p-[22px_32px] bg-[#16162d] rounded-[20px] overflow-hidden">
        <div className='flex flex-col'>
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-semibold leading-8 text-textPrimary gap-2">Liquidity Pools</h1>
          </div>
          <p className="text-[#807E98] text-[14px] leading-6 self-start">Swap any token at ease</p>
        </div>

        {/* Tabs section */}
        <div className={`h-[56px] flex flex-row bg-[#071426] rounded-3xl p-[3px]`}>
          <button className={`w-[110px] px-6 py-2 text-sm font-medium transition-all duration-200 rounded-[24px_0_0_24px]
            ${currentPoolTabs === 'Pools'
              ? 'bg-gradient-to-b from-[#202036] to-[#16162d] text-white'
              : 'text-[#807E98] hover:text-white'}`}
              onClick={()=>setPoolTabs('Pools')}>
            Pools
          </button>

          <button className={`w-[110px] px-6 py-2 text-sm font-medium transition-all duration-200 rounded-[0px_24px_24px_0px]
            ${currentPoolTabs === 'My Pools'
              ? 'bg-gradient-to-b from-[#202036] to-[#16162d] text-white'
              : 'text-[#807E98] hover:text-white hover:bg-[rgba(255,255,255,.03)]'}`}
              onClick={()=>setPoolTabs('My Pools')}>
            My Pools
          </button>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-3 min-w-[135px] h-[54px] bg-gradient-to-r from-[#6e42ca] to-[#8d29c1] text-white rounded-2xl 
           hover:bg-[#8A3EFF] border-[1px] border-transparent hover:border-[1px] hover:border-white/50 transition-colors text-base font-medium">
            Add Liquidity
          </button>
          <button className="px-6 py-2 min-w-[135px] h-[54px] bg-gradient-to-r from-[#6e42ca] to-[#8d29c1] text-white rounded-2xl  
           hover:bg-[#8A3EFF] border-[1px] border-transparent hover:border-[1px] hover:border-white/50 transition-colors text-base font-medium">
            Create Pool
          </button>
        </div>
      </div>
      {/* Search and filter section */}
      <div className="flex gap-3">
      <div className={`h-[56px] flex flex-row bg-[#071426] rounded-xl p-1 overflow-hidden`}>
          <button className={`w-[160px] px-6 py-2 text-sm font-medium transition-all duration-200 rounded-[12px_0_0_12px]
            ${currentPoolTypes === 'ERC20 to ERC20'
              ? 'bg-[#2d2e49] text-white'
              : 'hover:text-white hover:bg-[rgba(255,255,255,.03)]'}`}
              onClick={()=>setPoolTypes('ERC20 to ERC20')}>
            ERC20 to ERC20
          </button>

          <button className={`w-[160px] px-6 py-2 text-sm font-medium transition-all duration-200 rounded-[0px_12px_12px_0px]
            ${currentPoolTypes === 'Native to ERC20'
              ? 'bg-[#2d2e49] text-white'
              : 'hover:text-white hover:bg-[rgba(255,255,255,.03)]'}`}
              onClick={()=>setPoolTypes('Native to ERC20')}>
            Native to ERC20
          </button>
        </div>
        <div className="h-[52px] flex-1 relative translate-y-[2px]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Pools"
            onChange={(e) => {
              setSearchKeyword(e.target.value)
            }}
            className="w-full h-[52px] bg-[#28253E] rounded-lg pl-11 pr-4 py-2.5 text-white text-sm
              placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9747FF] 
              outline-none outline-offset-0 focus:shadow-[0_0_0_0.2rem_#c4b5fd80] focus:border-[#c4b5fd]"
          />
        </div>
      </div>
    </div>
  );
}

export default SwapHeader;