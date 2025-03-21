"use client"
import { useState, useEffect } from "react";

const mockStocks = [
  { symbol: "AAPL", price: 150.25 },
  { symbol: "TSLA", price: 780.12 },
  { symbol: "AMZN", price: 3200.50 },
  { symbol: "GOOGL", price: 2800.32 },
];

export default function StockTicker() {
  const [stocks, setStocks] = useState(mockStocks);

  useEffect(() => {
    // Simulate real-time stock updates
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => ({
          ...stock,
          price: Number((stock.price + Math.random() * 5 - 2.5).toFixed(2)), // Ensure it's a number
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 text-white pl-4 py-3 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex space-x-10">
        {stocks.map((stock) => (
          <span key={stock.symbol} className="text-lg font-semibold">
            {stock.symbol}: ${stock.price}
          </span>
        ))}
      </div>
    </div>
  );
}
