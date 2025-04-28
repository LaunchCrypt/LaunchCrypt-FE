import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function StatsChart() {
    const tradingData = Array(30).fill(null).map((_, index) => {
        const date = new Date(2024, 10, 9 + index); // Starting from Nov 9
        return {
            date: date.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit'
            }),
            volume: Math.floor(Math.random() * 100) + 20 // Random volume between 20 and 120
        };
    });

    console.log("tradingData", tradingData)

    // Format large numbers with B/M suffix
    const formatNumber = (value) => {
        if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
        return `$${value.toLocaleString()}`;
    };

    


    return (
        <div className="rounded-xl p-6 bg-gray-800/50 w-full">
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-gray-400 text-sm">Trading Volume (all time)</h3>
                    <p className="text-white text-3xl font-bold">$2.2B</p>
                    <p className="text-gray-400 text-sm">Dec 10, 2024</p>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={tradingData} barGap={0}>
                            <XAxis
                                dataKey="date"
                                stroke="#6B7280"
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                interval={1}
                                tickMargin={10}
                            />
                            <YAxis
                                stroke="#6B7280"
                                tick={{ fill: '#6B7280' }}
                                tickFormatter={formatNumber}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                }}
                                formatter={(value) => formatNumber(value)}
                            />
                            <Bar
                                dataKey="volume"
                                fill="#10B981"
                                radius={[2, 2, 0, 0]} // Slight rounding on top corners
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default StatsChart