'use client'; // 必須使用 "client component" 來支持互動式圖表

import dynamic from 'next/dynamic';
import React from 'react';

// 動態加載 ApexCharts，防止 SSR 問題
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartComponent = () => {
  // 圖表配置
  const options = {
    chart: {
      type: 'line', // 可以更改為 'candlestick', 'bar', 'area' 等
      height: 350,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X 軸標籤
    },
  };

  const series = [
    {
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62], // 數據
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ChartComponent;
