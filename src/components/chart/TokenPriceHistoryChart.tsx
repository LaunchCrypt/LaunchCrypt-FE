import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { axiosInstance, GET_API } from '../../apis/api';
import "./styles.css"

function TokenPriceHistoryChart() {
    const [priceData, setPriceData] = useState<any[]>([])
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    useEffect(() => {
        async function getNativeTokenPriceHistory(symbol: string, interval: string, limit: number, type: "dayMonth" | "time") {
            const result = await axiosInstance.get(GET_API.GET_NATIVE_TOKEN_PRICE(symbol, interval, limit, type))
            setMinPrice(Math.floor(result.data.tokenPriceHistory.minPrice) - 1)
            setMaxPrice(Math.ceil(result.data.tokenPriceHistory.maxPrice) + 1)
            setPriceData(result.data.tokenPriceHistory.price)
            console.log(result.data.tokenPriceHistory.price)
        }
        getNativeTokenPriceHistory("BTCUSDT", "1m", 200, "time")
    }, [])

    return (
        <div className='flex flex-col justify-center align-middle items-center'>
            <div className='flex flex-row justify-between align-middle items-center'>

            </div>

            <AreaChart width={600} height={300} data={priceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis dataKey="price" domain={[minPrice, maxPrice]} />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    )
}

export default TokenPriceHistoryChart