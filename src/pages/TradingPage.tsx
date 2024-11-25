import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';

const TradingChart = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#222" },
        textColor: "#C3BCDB",
        fontFamily: "'Roboto', sans-serif",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 8,
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF",
        },
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },
      timeScale: {
        borderColor: "#71649C",
        barSpacing: 10,
      },
      rightPriceScale: {
        borderColor: "#71649C",
        scaleMargins: {
          top: 0.1,
          bottom: 0,
        },
      }
    });

    const mainSeries = chart.addCandlestickSeries({
      wickUpColor: "#2EBD85",
      upColor: "#2EBD85",
      wickDownColor: "#ef5350",
      downColor: "#ef5350",
      borderVisible: false,
    });

    mainSeries.setData(generateContinuousCandlestickData());

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  function generateContinuousCandlestickData() {
    const data = [];
    let currentPrice = 100;
    const startDate = new Date('2024-01-01');
    
    for(let i = 0; i < 100; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const volatility = 0.02;
      const range = currentPrice * volatility;
      const high = currentPrice + Math.random() * range;
      const low = currentPrice - Math.random() * range;
      const close = currentPrice + (Math.random() - 0.5) * range;
      
      data.push({
        time: date.toISOString().split('T')[0],
        open: parseFloat(currentPrice.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
      
      currentPrice = close;
    }
    
    return data;
  }

  return (
    <div className="w-full h-screen bg-[#222]">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default TradingChart;