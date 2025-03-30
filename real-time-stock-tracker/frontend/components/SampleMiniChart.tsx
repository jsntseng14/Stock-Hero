"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart } from "lucide-react";

const mockData = [
  { name: "Mon", price: 150 },
  { name: "Tue", price: 153 },
  { name: "Wed", price: 149 },
  { name: "Thu", price: 155 },
  { name: "Fri", price: 158 },
];

const performanceData = [
  { name: "Tech", value: 12, volatility: 1.2, topMovers: ["AAPL", "MSFT"] },
  { name: "Energy", value: -3, volatility: 0.9, topMovers: ["XOM", "CVX"] },
  { name: "Finance", value: 7, volatility: 1.1, topMovers: ["JPM", "BAC"] },
  { name: "Healthcare", value: 4, volatility: 0.7, topMovers: ["JNJ", "PFE"] },
];

function generateMockData(basePrice: number = 150): { name: string; price: number }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return days.map((day, i) => ({
    name: day,
    price: parseFloat((basePrice + (Math.random() - 0.5) * 10).toFixed(2)), // ±$5 variation
  }));
}


function SectorCard({ sector }: { sector: (typeof performanceData)[0] }) {
  
  return (
    <div className="rounded border border-gray-300 p-4 shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">{sector.name}</h4>
        <span
          className={
            sector.value >= 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"
          }
        >
          {sector.value}%
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Volatility: {sector.volatility.toFixed(1)}%
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Top Movers: {sector.topMovers.join(", ")}
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={mockData} margin={{ top: 10, bottom: 0, left: -20, right: 0 }}>
          <XAxis dataKey="name" hide />
          <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip
            contentStyle={{ fontSize: "0.75rem" }}
            labelStyle={{ display: "none" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SampleMarketPerformance() {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <PieChart className="text-blue-500 mr-2" size={20} />
        Sector Performance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {performanceData.map((sector) => (
          <SectorCard key={sector.name} sector={sector} />
        ))}
      </div>
    </div>
  );
}

export function SampleMiniChart({ symbol }: { symbol: string }) {
  const mockData = generateMockData(145 + Math.random() * 20); // give each chart a unique base price

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold text-gray-800 mb-2">{symbol}</h3>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={mockData} margin={{ top: 10, bottom: 0, left: -20, right: 0 }}>
          <XAxis dataKey="name" hide />
          <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip
            contentStyle={{ fontSize: "0.75rem" }}
            labelStyle={{ display: "none" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export function SampleChartGrid() {
  const symbols = ["AAPL", "TSLA", "GOOGL", "AMZN"];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {symbols.map((symbol) => (
        <SampleMiniChart key={symbol} symbol={symbol} />
      ))}
    </div>
  );
}
