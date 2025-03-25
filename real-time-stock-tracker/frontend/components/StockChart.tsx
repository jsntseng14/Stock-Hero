"use client";

import { useEffect, useState } from "react";
import { fetchStockCandles } from "@/lib/finnhub";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  symbol?: string;
  title?: string;
  height?: number;
};

export default function StockChart({
  symbol = "AAPL",         // default for homepage
  title = "Stock Chart",
  height = 300,
}: Props) {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const candles = await fetchStockCandles(symbol);
      setData(candles);
    };

    loadData();
  }, [symbol]);

  return (
    <div className="bg-white shadow rounded p-6 pb-12" style={{ height }}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937", // dark gray (Tailwind's gray-800)
              borderColor: "#3b82f6",     // Tailwind blue-500
              color: "#ffffff",           // white text
              borderRadius: "0.5rem",
              fontSize: "0.875rem",       // text-sm
              padding: "0.5rem 0.75rem",
            }}
            labelStyle={{
              color: "#d1d5db", // Tailwind gray-300
            }}
         />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
