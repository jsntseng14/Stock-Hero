"use client";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CornerDownLeft,
  BarChart,
  CalendarDays,
} from "lucide-react";

type StockSummaryProps = {
  price: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  timestamp?: number;
  volume?: number;
};

export default function StockSummary({
  price,
  high,
  low,
  open,
  prevClose,
  timestamp,
  volume,
}: StockSummaryProps) {
  const priceChange = price - prevClose;
  const percentChange = (priceChange / prevClose) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="col-span-full bg-white shadow rounded p-6">
      <h2 className="text-lg font-semibold text-blue-600 mb-4 tracking-tight">
        📈 Stock Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm md:text-base text-gray-800">
        <div className="flex items-center gap-3">
          <DollarSign className="text-green-600" size={20} />
          <p>
            <strong className="text-gray-900">Price:</strong>{" "}
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <BarChart
            className={isPositive ? "text-green-500" : "text-red-500"}
            size={20}
          />
          <p>
            <strong className="text-gray-900">Change:</strong>{" "}
            {isPositive ? "+" : "-"}${Math.abs(priceChange).toFixed(2)} (
            {percentChange.toFixed(2)}%)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="text-blue-500" size={20} />
          <p>
            <strong className="text-gray-900">High:</strong> ${high.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TrendingDown className="text-red-500" size={20} />
          <p>
            <strong className="text-gray-900">Low:</strong> ${low.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-purple-500" size={20} />
          <p>
            <strong className="text-gray-900">Open:</strong> ${open.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CornerDownLeft className="text-gray-500" size={20} />
          <p>
            <strong className="text-gray-900">Prev Close:</strong>{" "}
            ${prevClose.toFixed(2)}
          </p>
        </div>

        {timestamp !== undefined && (
            <div className="flex items-center gap-3">
                <CalendarDays className="text-orange-500" size={20} />
                <p>
                <strong className="text-gray-900">Last Updated:</strong>{" "}
                {new Date(timestamp! * 1000).toLocaleString()}
                </p>
            </div>
        )}

        <div className="flex items-center gap-3">
          <BarChart className="text-indigo-500" size={20} />
          <p>
            <strong className="text-gray-900">Volume:</strong>{" "}
            {volume !== undefined
              ? volume.toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
