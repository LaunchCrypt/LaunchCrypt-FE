import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';

const CandleStickChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [timeframe, setTimeframe] = useState('15m');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0F172A' },  // Darker background to match your UI
        textColor: '#848e9c',  // Matches your UI's secondary text color
        fontFamily: "'Inter', sans-serif",
      },
      grid: {
        vertLines: { color: 'rgba(35, 38, 47, 1)' },  // Darker grid lines
        horzLines: { color: 'rgba(35, 38, 47, 1)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: 'rgba(155, 125, 255, 0.4)',  // Light purple with some transparency
          style: LineStyle.Solid,
          labelBackgroundColor: '#9B7DFF',  // Solid purple for label
          labelVisible: true,
        },
        horzLine: {
          color: 'rgba(155, 125, 255, 0.4)',
          labelBackgroundColor: '#9B7DFF',
          labelVisible: true,
        },
      },
      timeScale: {
        borderColor: 'rgba(35, 38, 47, 1)',  // Darker border
        barSpacing: 10,
        rightOffset: 0,
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(35, 38, 47, 1)',  // Darker border
        scaleMargins: {
          top: 0.1,
          bottom: 0,
        },
      },
    });

    const mainSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',      // Slightly muted green
      downColor: '#ef5350',    // Slightly muted red
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderVisible: false,
    });
    function generateCandlestickData(selectedTimeframe) {
      const data = [];
      let currentPrice = 100;
      let startDate = new Date('2024-01-01');
      let candleCount;
      let timeIncrement;

      // Configure number of candles and time increment based on timeframe
      switch (selectedTimeframe) {
        case '3m':
          candleCount = 200;
          timeIncrement = 3 * 60 * 1000; // 3 minutes in milliseconds
          break;
        case '15m':
          candleCount = 200;
          timeIncrement = 15 * 60 * 1000;
          break;
        case '1h':
          candleCount = 168; // 7 days worth of hourly candles
          timeIncrement = 60 * 60 * 1000;
          break;
        case '4h':
          candleCount = 180; // 30 days worth of 4h candles
          timeIncrement = 4 * 60 * 60 * 1000;
          break;
        case '1d':
          candleCount = 90; // 3 months of daily candles
          timeIncrement = 24 * 60 * 60 * 1000;
          break;
        case '1w':
          candleCount = 52; // 1 year of weekly candles
          timeIncrement = 7 * 24 * 60 * 60 * 1000;
          break;
        default:
          candleCount = 100;
          timeIncrement = 60 * 60 * 1000;
      }

      for (let i = 0; i < candleCount; i++) {
        const currentTime = new Date(startDate.getTime() + (i * timeIncrement));

        const volatility = 0.02;
        const range = currentPrice * volatility;
        const high = currentPrice + Math.random() * range;
        const low = currentPrice - Math.random() * range;
        const close = currentPrice + (Math.random() - 0.5) * range;

        data.push({
          time: Math.floor(currentTime.getTime() / 1000),
          open: parseFloat(currentPrice.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
        });

        currentPrice = close;
      }

      return data;
    }

    const data = generateCandlestickData(timeframe);
    mainSeries.setData(data);
    chart.timeScale().fitContent();

    const handleResize = () => {
        const maxWidth = 1600;
      const maxHeight = 400;
      const containerWidth = Math.min(chartContainerRef.current.clientWidth,maxWidth);
      const containerHeight = Math.min(chartContainerRef.current.clientHeight, maxHeight);

      chart.applyOptions({
        width: containerWidth,
        height: containerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [timeframe]);

  // Your existing generateCandlestickData function here...

  const timeframes = [
    { label: '3m', value: '3m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' },
    { label: '1d', value: '1d' },
    { label: '1w', value: '1w' },
  ];

  return (
    <div className="bg-[#0F172A] flex flex-col flex-1 h-fit px-2 py-4 rounded-xl">
      <div className="w-full flex flex-row gap-4 mb-4 justify-between">
        {/* Token Info Panel */}
        <div className="flex flex-row text-sm ml-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-base font-medium mr-3">{"WETH"}</span>
          </div>
          <div className="flex flex-row gap-1 text-[#848e9c]">
            <div className="flex items-center gap-1 mr-3">
              <span>By:</span>
              <span className="text-textPrimary cursor-pointer hover:underline italic">
                {"ctb0k33"}
              </span>
              <span>{"15d ago"}</span>
            </div>
            <div className="flex items-center gap-2 mr-3">
              <span>Market Cap:</span>
              <span className="text-textPrimary">{"12.5M"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Comments:</span>
              <span className="text-textPrimary">{"67"}</span>
            </div>
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex gap-2 justify-end self-end">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 rounded ${timeframe === tf.value
                  ? 'bg-[#c97dff] text-white'
                  : 'bg-[#363a45] text-[#848e9c] hover:bg-[#9c5af3] hover:text-white'
                } transition-colors duration-200`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="h-[400px]" />
    </div>
  );
};

export default CandleStickChart;
