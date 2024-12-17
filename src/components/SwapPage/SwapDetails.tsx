import React, { useState } from "react"
import TradingPairCard from "../PairBanner/TradingPairCard"
import { useLiquidityPair } from "../../hooks/useLiquidityPair";
import { IqueryAll } from "../../interfaces";

function SwapDetails() {
    const [searchQuery, setSearchQuery] = useState<IqueryAll>({
        page: 1,
        limit: 20,
        sortField: "createdAt",
        sortOrder: 'asc'
    });
    const { allLiquidityPair, isLoading, error, getAllLiquidityPairs } = useLiquidityPair({ searchQuery });
    const skeletonArray = Array(8).fill(null); // Show 8 skeleton cards while loading
    return (
        <div className="w-[1200px] pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
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
                        />
                    ))
                ) :
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
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SwapDetails