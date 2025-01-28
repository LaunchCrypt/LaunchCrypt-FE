import React, { useState } from "react";
import SwapHeader from "../components/SwapPage/SwapHeader";
import SwapDetails from "../components/SwapPage/SwapDetails";

export const POOL_TABS = ["Pools", "My Pools"]
export const POOL_TYPES = ["ERC20 to ERC20", "Native to ERC20"]

function SwapPage() {
    const [currentPoolTab, setCurrentPoolTab] = useState(POOL_TABS[0]);
    const [currentPoolType, setCurrentPoolType] = useState(POOL_TYPES[0]);
    const [currentTokenFilter, setCurrentTokenFilter] = useState('ALL');
    const [searchKeyword, setSearchKeyword] = useState('');
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center w-[1200px]">
                <SwapHeader
                    currentPoolTabs={currentPoolTab}
                    currentPoolTypes={currentPoolType}
                    setPoolTabs={(value) => setCurrentPoolTab(value)}
                    setPoolTypes={(value) => setCurrentPoolType(value)}
                    setSearchKeyword={(keyword: string) => setSearchKeyword(keyword)} />
            </div>
            <SwapDetails searchKeyword={searchKeyword} />



        </div>
    )
}

export default SwapPage;