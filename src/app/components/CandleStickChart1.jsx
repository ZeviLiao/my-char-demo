"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// 計算移動平均線
const calculateMovingAverage = (data, period) => {
  if (data.length < period) return [];
  const maData = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.y[3], 0); // 使用收盤價計算
    maData.push({ x: data[i].x, y: sum / period });
  }
  return maData;
};

const CandleStickChart = () => {
  const [series, setSeries] = useState([
    {
      name: "K Line",
      type: "candlestick",
      data: [
        { x: new Date("2024-12-01"), y: [100, 110, 95, 105] },
        { x: new Date("2024-12-02"), y: [105, 115, 100, 110] },
        { x: new Date("2024-12-03"), y: [110, 120, 105, 115] },
        { x: new Date("2024-12-04"), y: [115, 125, 110, 120] },
        { x: new Date("2024-12-05"), y: [120, 130, 115, 125] },
        { x: new Date("2024-12-06"), y: [125, 135, 120, 130] },
      ],
    },
    {
      name: "MA 5",
      type: "line", // 確保是線條類型
      data: calculateMovingAverage(
        [
          { x: new Date("2024-12-01"), y: [100, 110, 95, 105] },
          { x: new Date("2024-12-02"), y: [105, 115, 100, 110] },
          { x: new Date("2024-12-03"), y: [110, 120, 105, 115] },
          { x: new Date("2024-12-04"), y: [115, 125, 110, 120] },
          { x: new Date("2024-12-05"), y: [120, 130, 115, 125] },
          { x: new Date("2024-12-06"), y: [125, 135, 120, 130] },
        ],
        5
      ),
    },
  ]);

  // 模擬實時更新
  useEffect(() => {
    const interval = setInterval(() => {
      const lastDate = series[0].data[series[0].data.length - 1].x;
      const newDate = new Date(lastDate);
      newDate.setDate(newDate.getDate() + 1);

      const newData = {
        x: newDate,
        y: [
          Math.random() * 10 + 130, // 開盤價
          Math.random() * 10 + 140, // 最高價
          Math.random() * 10 + 120, // 最低價
          Math.random() * 10 + 130, // 收盤價
        ],
      };

      setSeries((prevSeries) => {
        const updatedKLineData = [...prevSeries[0].data, newData].slice(-20);
        const updatedMAData = calculateMovingAverage(updatedKLineData, 5);

        return [
          { ...prevSeries[0], data: updatedKLineData }, // 更新 K 線數據
          { ...prevSeries[1], data: updatedMAData }, // 更新 MA 線數據
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [series]);

  const options = {
    chart: {
      height: 350,
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26a69a", // 綠色
          downward: "#ef5350", // 紅色
        },
      },
    },
    tooltip: {
      shared: true,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default CandleStickChart;
