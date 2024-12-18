"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DataPoint {
  requestId: string;
  value: number;
  timestamp: number;
}

export default function Home() {
  const [data, setData] = useState<DataPoint[]>([]);
  const requestIds = ["req1", "req2", "req3"];

  useEffect(() => {
    const sockets: WebSocket[] = [];

    requestIds.forEach((requestId) => {
      const socket = new WebSocket("ws://localhost:3000/api/ws");

      socket.onopen = () => {
        console.log(`WebSocket 已連接: ${requestId}`);
        socket.send(JSON.stringify({ requestId }));
      };

      socket.onmessage = (event) => {
        const message: DataPoint = JSON.parse(event.data);
        setData((prev) => [...prev, message]);
      };

      socket.onclose = () => {
        console.log(`WebSocket 已關閉: ${requestId}`);
      };

      sockets.push(socket);
    });

    return () => {
      sockets.forEach((socket) => socket.close());
    };
  }, []);

  const series = requestIds.map((id) => ({
    name: id,
    data: data
      .filter((item) => item.requestId === id)
      .map((item) => ({ x: item.timestamp, y: item.value })),
  }));

  const options: ApexOptions = {
    chart: { id: "realtime", animations: { enabled: true, speed: 1000 } },
    xaxis: { type: "datetime" }, // 明確指定為字面值 "datetime"
  };

  return (
    <div>
      <h1>WebSocket 即時數據展示</h1>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}
