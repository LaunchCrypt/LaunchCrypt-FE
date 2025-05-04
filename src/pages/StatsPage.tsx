import React from 'react';
import StatsChart from '../components/stats/StatsChart';
import StatsHeader from '../components/stats/StatsHeader';
import UserStatsTable from '../components/stats/UserStatsTable';
import useStats from '../hooks/useStats';

const StatsPage = () => {
    const { totalValueLocked, totalSwap, uniqueUser, tradingVolumeData, userTableData } = useStats();
    return (
        <div className="p-6 space-y-6 min-h-screen max-w-7xl m-auto">
            {/* Stats Grid */}
            <div className='flex flex-row w-full justify-between gap-6'>
                <StatsHeader totalValueLocked={totalValueLocked} totalSwap={totalSwap} uniqueUser={uniqueUser} />
                {/* Trading Volume Chart */}
                <StatsChart tradingVolumeData={tradingVolumeData} />
            </div>

            <UserStatsTable userTableData={userTableData} />
        </div>
    );
};

export default StatsPage;