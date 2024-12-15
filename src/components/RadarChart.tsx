"use client";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const RadarChart = () => {
  const options: ApexOptions = {
    chart: { 
      type: "radar", 
      height: 350, // 增大圖表高度
      toolbar: { show: false }
    },
    plotOptions: {
      radar: {
        size: 170, // 增大整體五角形的大小
        polygons: {
          strokeColors: "#e8e8e8",
          connectorColors: "#e8e8e8",
        },
      },
    },
    yaxis: {
      tickAmount: 6, // 控制數值間距，加大網格的間隔數量
      labels: {
        formatter: (val: number) => `${val}%`, // 可選：格式化數值顯示
        style: {
          colors: "#333", // 設置數值顏色
          fontSize: "12px",
        },
      },
    },
    title: { text: "Performance by Metrics", align: "left" },
    xaxis: {
      categories: ["Speed", "Quality", "Cost", "Customer Satisfaction", "Efficiency"],
      labels: {
        style: {
          colors: ["#555", "#555", "#555", "#555", "#555"], // 調整軸上文字顏色
          fontSize: "12px",
        },
      },
    },
  };

  const series = [
    { name: "Metric A", data: [80, 90, 70, 85, 60] },
    { name: "Metric B", data: [70, 60, 85, 90, 75] },
  ];

  return (
    <div className="rounded-lg shadow-lg p-5 bg-white">
      <ReactApexChart options={options} series={series} type="radar" height={450} />
    </div>
  );
};

export default RadarChart;
