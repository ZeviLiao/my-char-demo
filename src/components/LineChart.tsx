"use client";

import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      width: 2, // 設置線條寬度，單位為像素
    },
    markers: {
      size: 5, // 設置小點的大小（像素）
      colors: ["#FF4560"], // 小點顏色
      strokeColors: "#fff", // 小點外圈的顏色
      strokeWidth: 2, // 小點外圈線條寬度
      shape: "circle", // 小點的形狀，可以是 "circle", "square" 等
      hover: {
        size: 7, // 滑鼠懸停時小點的大小
      },
    },
    title: {
      text: "Monthly Sales Data",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      title: { text: "Months" },
    },
    yaxis: {
      title: { text: "Sales ($)" },
    },

    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Sales",
      data: [4500, 5600, 4800, 6200, 7000, 8000],
    },
  ];

  return (
    <div className="rounded-lg shadow-lg p-5 bg-white">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
