import React, { useEffect, useState } from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { axiosInstance, GET_API } from '../../apis/api';
import { get_network } from '../../utils';
import "./styles.css"
import { Inetwork } from '../../interfaces';
import { NETWORK_LIST } from '../../constant';
import CurrentToken from '../common/CurrentToken';
import ChartNavigator from './ChartNavigator';
import { ItimeConfig } from '../../interfaces';

function TokenPriceHistoryChart() {
    const [priceData, setPriceData] = useState<any[]>([])
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [network, setNetwork] = useState<Inetwork>(NETWORK_LIST[0])
    const [currentPrice, setCurrentPrice] = useState<number>(0)
    const [initPrice, setInitPrice] = useState<number>(0)
    const [priceDiff, setPriceDiff] = useState<number>(0)
    // 0: 1h, 1: 1d, 2: 1w, 3: 6m, 4: 1y
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const tooltipFormatter = (value: number) => {
        setCurrentPrice(value)
        setPriceDiff(value / priceData[0].price)
        return [`${value.toFixed(2)}`, 'Price'];
    };

    const configTimeView = (index: number) => {
        let result: ItimeConfig = { interval: '1m', limit: 60, type: 'time' }
        switch (index) {
            case 0: {
                result = { interval: '1m', limit: 61, type: 'time' };
                break;
            }
            case 1: {
                result = { interval: '3m', limit: 481, type: 'time' };
                break;
            }
            case 2: {
                result = { interval: '15m', limit: 673, type: 'dayMonth' };
                break;
            }
            case 3: {
                result = { interval: '8h', limit: 541, type: 'dayMonth' };
                break;
            }
            case 4: {
                result = { interval: '1d', limit: 366, type: 'dayMonth' };
                break;
            }
        }
        return result
    }
    useEffect(() => {
        const currentNetwork = get_network();
        setNetwork(currentNetwork!);
        async function getNativeTokenPriceHistory(symbol: string, interval: string, limit: number, type: "dayMonth" | "time") {
            const result = await axiosInstance.get(GET_API.GET_NATIVE_TOKEN_PRICE(symbol, interval, limit, type))
            const tokenPriceData = result.data.tokenPriceHistory
            const priceDiff = tokenPriceData.maxPrice - tokenPriceData.minPrice

            // limit yAxis range
            setMinPrice(parseFloat((tokenPriceData.minPrice - priceDiff * 20 / 100).toFixed(2)))
            setMaxPrice(parseFloat((tokenPriceData.maxPrice + priceDiff * 20 / 100).toFixed(2)))
            setPriceData(tokenPriceData.price)
            setCurrentPrice(tokenPriceData.price[tokenPriceData.price.length - 1].price)
            setInitPrice(tokenPriceData.price[tokenPriceData.price.length - 1].price)
            // endPrice / startPrice
            setPriceDiff(tokenPriceData.price[tokenPriceData.price.length - 1].price / tokenPriceData.price[0].price)
        }

        const config = configTimeView(activeIndex)
        getNativeTokenPriceHistory(`${currentNetwork?.symbol}USDT`, config.interval, config.limit, config.type)
    }, [activeIndex])

    return (
        <div className='flex flex-col justify-center align-middle items-center bg-[#16162d] p-[17px] rounded-3xl mt-4 self-start'>
            <div className='flex flex-row justify-between align-middle items-center w-full'>
                <div className='flex flex-row align-middle items-center justify-center'>
                    <CurrentToken network={network} />
                </div>
                <ChartNavigator activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </div>
            <div className='text-[30px] leading-[35px] text-[#e5e4fa] font-semibold mb-2 mt-4 self-start'>
                {`$${currentPrice.toFixed(2)}`}
            </div>
            <div className={`${priceDiff >= 1 ? 'text-[green]' : 'text-[red]'} text-[13px] leading-[18px] self-start mb-5`}>
                {priceDiff > 1 ? `+ ${((priceDiff - 1) * 100).toFixed(2)}%` : `- ${((1 - priceDiff) * 100).toFixed(2)}%`}
            </div>

            <AreaChart width={600} height={340} data={priceData} 
            margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
            onMouseLeave={()=>setCurrentPrice(initPrice)}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#113843" stopOpacity={1} />
                        <stop offset="95%" stopColor="#122233" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="time" minTickGap={30} tickCount={5} />
                <CartesianGrid stroke="#27273c" vertical={false} />
                <YAxis dataKey="price" domain={[minPrice, maxPrice]} tickMargin={10} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '10px' }}
                    itemStyle={{ display: 'none' }}
                    labelStyle={{ color: '#fff' }}
                    viewBox={{ x: 0, y: 0, width: 0, height: 0 }}
                    formatter={tooltipFormatter}
                    animationDuration={0}

                />
                <Area type="monotone" dataKey="price" stroke="#076f67" strokeWidth={2.3} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    )
}

export default TokenPriceHistoryChart