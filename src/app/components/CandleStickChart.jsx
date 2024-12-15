'use client';

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { addDays, format } from 'date-fns';

const calculateMovingAverage = (data, period) => {
  if (data.length < period) return [];
  const maData = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.close, 0); // 使用收盤價計算
    maData.push({ time: data[i].time, value: sum / period });
  }
  return maData;
};

const CandleStickChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const maLineSeriesRef = useRef(null);
  let lastDate = null; // 保存最後一條數據的日期

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      },
      grid: {
        vertLines: { color: '#444444' },
        horzLines: { color: '#444444' },
      },
      timeScale: { borderColor: '#444444' },
      rightPriceScale: { borderColor: '#444444' },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeriesRef.current = candlestickSeries;

    const maLineSeries = chart.addLineSeries({
      color: '#FFBF00', // 黃色 MA 線
      lineWidth: 2,
    });

    maLineSeriesRef.current = maLineSeries;

    // 初始數據
    const initialData = [
      { time: '2024-12-01', open: 100, high: 110, low: 95, close: 105 },
      { time: '2024-12-02', open: 105, high: 115, low: 100, close: 110 },
      { time: '2024-12-03', open: 110, high: 120, low: 105, close: 115 },
      { time: '2024-12-04', open: 115, high: 125, low: 110, close: 120 },
      { time: '2024-12-05', open: 120, high: 130, low: 115, close: 125 },
      { time: '2024-12-06', open: 125, high: 135, low: 120, close: 130 },
    ];

    candlestickSeries.setData(initialData);

    // 初始 MA 線數據
    const initialMA = calculateMovingAverage(initialData, 5);
    maLineSeries.setData(initialMA);

    // 保存最後一條數據的日期
    lastDate = new Date(initialData[initialData.length - 1].time);

    // 每 2 秒新增一條數據
    const interval = setInterval(() => {
      const newDate = format(addDays(lastDate, 1), 'yyyy-MM-dd'); // 使用 lastDate 計算下一天
      const lastCandle = initialData[initialData.length - 1];
      const newCandle = {
        time: newDate,
        open: lastCandle.close,
        high: lastCandle.close + Math.random() * 5,
        low: lastCandle.close - Math.random() * 5,
        close: lastCandle.close + (Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 5),
      };

      initialData.push(newCandle);
      if (initialData.length > 50) initialData.shift(); // 保持最多 50 條數據

      candlestickSeries.update(newCandle);

      // 更新 MA 線
      const updatedMA = calculateMovingAverage(initialData, 5);
      maLineSeries.setData(updatedMA);

      // 更新 lastDate
      lastDate = new Date(newDate);
    }, 2000);

    return () => clearInterval(interval); // 清除定時器
  }, []);

  return <div ref={chartContainerRef} style={{ position: 'relative' }} />;
};

export default CandleStickChart;
