"use client";

import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        // borderRadius: 5,
      },
    },
    title: {
      text: "Product Revenue Comparison",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: ["Product A", "Product B", "Product C", "Product D"],
      title: { text: "Products" },
    },
    yaxis: {
      title: { text: "Revenue ($)" },
    },
    colors: ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"],

    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Revenue",
      data: [12000, 15000, 10000, 8000],
    },
  ];

  return (
    <div className="rounded-lg shadow-lg p-5 bg-white">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
