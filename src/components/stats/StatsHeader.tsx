import React from 'react'

function StatsHeader({ totalValueLocked, totalSwap, uniqueUser }: { totalValueLocked: number, totalSwap: number, uniqueUser: number }) {
    return (
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6 w-[300px]">
            {/* Total Value Locked */}
            <div className="rounded-xl p-6 bg-gray-800/50">
                <div className="space-y-2">
                    <h3 className="text-gray-400 text-sm">Total Value Locked</h3>
                    <p className="text-white text-3xl font-bold">${totalValueLocked}</p>
                </div>
            </div>

            {/* Total Swaps */}
            <div className="rounded-xl p-6 bg-gray-800/50">
                <div className="space-y-2">
                    <h3 className="text-gray-400 text-sm">Total Swaps</h3>
                    <p className="text-white text-3xl font-bold">{totalSwap}</p>
                </div>
            </div>

            {/* Unique Users */}
            <div className="rounded-xl p-6 bg-gray-800/50">
                <div className="space-y-2">
                    <h3 className="text-gray-400 text-sm">Unique Users</h3>
                    <p className="text-white text-3xl font-bold">{uniqueUser}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsHeader