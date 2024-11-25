import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  // Sample data - each object represents a candlestick
  const sampleData = [
    { time: '2024-01-01', open: 100, high: 105, low: 96, close: 103 },
    { time: '2024-01-02', open: 103, high: 110, low: 100, close: 109 },
    { time: '2024-01-03', open: 109, high: 114, low: 105, close: 107 },
    { time: '2024-01-04', open: 107, high: 112, low: 104, close: 110 },
    { time: '2024-01-05', open: 110, high: 119, low: 108, close: 116 },
    { time: '2024-01-06', open: 116, high: 120, low: 110, close: 112 },
    { time: '2024-01-07', open: 112, high: 115, low: 106, close: 109 },
    // Add more data points as needed
  ];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1E1E1E' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2B2B2B' },
        horzLines: { color: '#2B2B2B' },
      },
      timeScale: {
        borderColor: '#2B2B2B',
      },
      rightPriceScale: {
        borderColor: '#2B2B2B',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    // Create the candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Set the data
    candlestickSeries.setData(sampleData);

    // Fit the chart to the data
    chart.timeScale().fitContent();

    // Store the chart instance
    chartRef.current = chart;

    // Handle resizing
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };


    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full h-96">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CandlestickChart;