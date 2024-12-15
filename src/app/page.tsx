import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import RadarChart from '@/components/RadarChart';

export default function ChartDemoPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Professional Chart Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart />
        <BarChart />
        <PieChart />
        <RadarChart />
      </div>
    </main>
  );
}
