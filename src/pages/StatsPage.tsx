import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatsChart from '../components/stats/StatsChart';
import StatsHeader from '../components/stats/StatsHeader';
import UserStatsTable from '../components/stats/UserStatsTable';

const StatsPage = () => {
    return (
        <div className="p-6 space-y-6 min-h-screen max-w-7xl m-auto">
            {/* Stats Grid */}
            <div className='flex flex-row w-full justify-between gap-6'>
                <StatsHeader />
                {/* Trading Volume Chart */}
                <StatsChart />
            </div>

            <UserStatsTable />
        </div>
    );
};

export default StatsPage;