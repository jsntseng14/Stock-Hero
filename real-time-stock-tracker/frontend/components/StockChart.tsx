"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type StockPoint = {
    time: string;
    price: number;
  };

export default function StockChart() {
    const [data, setData] = useState<StockPoint[]>([]);

  useEffect(() => {
    // Simulate chart data loading from client (avoid server-rendering dynamic data)
    const generatedData = [
      { time: "12 AM", price: 147 },
      { time: "1 AM", price: 146 },
      { time: "2 AM", price: 148 },
      { time: "3 AM", price: 147.5 },
      { time: "4 AM", price: 149 },
      { time: "5 AM", price: 150 },
      { time: "6 AM", price: 151 },
      { time: "7 AM", price: 150.5 },
      { time: "8 AM", price: 152 },
      { time: "9 AM", price: 153 },
      { time: "10 AM", price: 154 },
      { time: "11 AM", price: 155 },
      { time: "12 PM", price: 156 },
      { time: "1 PM", price: 158 },
      { time: "2 PM", price: 157 },
      { time: "3 PM", price: 159 },
      { time: "4 PM", price: 161 },
      { time: "5 PM", price: 160 },
      { time: "6 PM", price: 158.5 },
      { time: "7 PM", price: 157 },
      { time: "8 PM", price: 156 },
      { time: "9 PM", price: 155 },
      { time: "10 PM", price: 154 },
      { time: "11 PM", price: 153 },
    ];
    
    setData(generatedData);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl text-gray-900 font-bold mb-4">📈 Stock Price Chart</h2>
      {data.length > 0 && (
        <LineChart width={1400} height={300} data={data}>
        <XAxis dataKey="time" tick={{ fill: "#1f2937" }} />
        <YAxis tick={{ fill: "#1f2937" }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
          labelStyle={{ color: "#1f2937", fontWeight: 500 }}
          itemStyle={{ color: "#111827" }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>      
      )}
    </div>
  );
}
