"use client";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      height: 350,
      toolbar: { show: false },
     },
    labels: ["Product A", "Product B", "Product C", "Product D"],

    legend: { position: "bottom" },
    title: { text: "Sales Distribution by Product", align: "left" },
  };

  const series = [44, 55, 13, 43];

  return (
    <div className="rounded-lg shadow-lg p-5 bg-white">
      <ReactApexChart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default PieChart;
