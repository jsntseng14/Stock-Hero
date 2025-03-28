"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type WatchlistStock = {
  symbol: string;
  name: string;
  price: number;
  change: number; // positive or negative
};

const mockWatchlist: WatchlistStock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 192.35, change: 1.21 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 255.81, change: -3.45 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 137.50, change: 0.92 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 112.78, change: -0.58 },
];

export default function Watchlist() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-semibold text-blue-600 mb-4 tracking-tight">📌 Your Watchlist</h2>
      <ul className="space-y-3">
        {mockWatchlist.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <li key={stock.symbol} className="flex justify-between items-center border-b pb-2 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{stock.symbol} - {stock.name}</p>
                <p className="text-sm text-gray-500">${stock.price.toFixed(2)}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stock.change.toFixed(2)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
