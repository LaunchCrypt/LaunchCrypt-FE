import React, { useEffect, useState } from "react"
import TradingPairCard from "../PairBanner/TradingPairCard"
import { useLiquidityPair } from "../../hooks/useLiquidityPair";
import { IqueryAll } from "../../interfaces";
import { useTradingPair } from "../../hooks/useTradingPair";

function SwapDetails({ searchKeyword, poolType }: { searchKeyword: string, poolType: string }) {
    const [searchQuery, setSearchQuery] = useState<IqueryAll>({
        page: 1,
        limit: 20,
        sortField: "createdAt",
        sortOrder: 'asc',
        keyword: ""
    });
    const updatedSearchQuery = { ...searchQuery, keyword: searchKeyword };
    const { allLiquidityPair, isLoading, error, getAllLiquidityPairs } = useLiquidityPair(
        {searchQuery: updatedSearchQuery}
    );

    const {allTradingPair, isLoading: isLoadingTradingPair, error: errorTradingPair, getAllTradingPairs} = useTradingPair(
        {searchQuery: updatedSearchQuery}
    );

    useEffect(() => {
        getAllLiquidityPairs();
        getAllTradingPairs();
    }, [searchKeyword]);
    
    const skeletonArray = Array(8).fill(null); // Show 8 skeleton cards while loading
    return (
        <div className="w-[1200px] pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading || isLoadingTradingPair ? (
                    // Skeleton loading state
                    skeletonArray.map((_, index) => (
                        <TradingPairCard
                            key={`skeleton-${index}`}
                            isLoading={true}
                            contract=""
                            token1Name=""
                            token2Name=""
                            token2Icon=""
                            token1Reservers=""
                            token2Reservers=""
                            type = "Native to ERC20"
                        />
                    ))
                ):
                  poolType === "Native to ERC20" ? (
                    allLiquidityPair.map((pair: any, index) => {
                        return (
                            <TradingPairCard
                                key={index}
                                contract={pair.poolAddress}
                                token1Name={"AVAX"}
                                token2Name={pair.tokenA.symbol}
                                token2Icon={pair.tokenA.image}
                                token1Reservers={pair.tokenBReserve}
                                token2Reservers={pair.tokenAReserve}
                                isLoading={false}
                                marketcap={pair.marketcap}
                                type = "Native to ERC20"
                            />
                        )
                    })
                ) : (
                    allTradingPair.map((pair: any, index) => {
                        return (
                            <TradingPairCard
                                key={index}
                                contract={pair.poolAddress}
                                token1Name={pair.tokenA.symbol}
                                token2Name={pair.tokenB.symbol}
                                // token2Icon={}
                                token1Reservers={pair.tokenBReserve}
                                token2Reservers={pair.tokenAReserve}
                                isLoading={false}
                                type = "ERC20 to ERC20"
                            />
                        )
                    })
                )
                }
            </div>
        </div>
    )
}

export default SwapDetails