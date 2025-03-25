"use client";

import { useEffect, useState } from "react";
import { fetchFundamentals } from "@/lib/finnhub";
import {
  DollarSign,
  BarChart,
  TrendingUp,
  LineChart,
  Percent,
} from "lucide-react";

type FundamentalsProps = {
  symbol: string;
};

export default function Fundamentals({ symbol }: FundamentalsProps) {
  const [fundamentals, setFundamentals] = useState<Awaited<ReturnType<typeof fetchFundamentals>> | null>(null);

  useEffect(() => {
    const loadFundamentals = async () => {
      const data = await fetchFundamentals(symbol);
      setFundamentals(data);
    };

    loadFundamentals();
  }, [symbol]);

  if (!fundamentals) {
    return <p className="text-sm text-gray-400">Loading fundamentals...</p>;
  }

  return (
    <div className="bg-white text-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 tracking-tight text-gray-800">📊 Fundamentals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm">
        <div className="flex items-start gap-3 border-b pb-2">
          <DollarSign className="text-blue-500 mt-1" size={18} />
          <div>
            <div className="font-semibold text-gray-700">Market Cap</div>
            <div className="font-mono text-blue-900">
              {fundamentals.marketCapitalization !== undefined
                ? `$${fundamentals.marketCapitalization.toLocaleString()}B`
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-2">
          <BarChart className="text-green-500 mt-1" size={18} />
          <div>
            <div className="font-semibold text-gray-700">P/E Ratio</div>
            <div className="font-mono text-blue-900">
              {fundamentals.peBasicExclExtraTTM !== undefined
                ? fundamentals.peBasicExclExtraTTM.toFixed(2)
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-2">
          <TrendingUp className="text-yellow-500 mt-1" size={18} />
          <div>
            <div className="font-semibold text-gray-700">EPS (TTM)</div>
            <div className="font-mono text-blue-900">
              {fundamentals.epsInclExtraItemsTTM !== undefined
                ? `$${fundamentals.epsInclExtraItemsTTM.toFixed(2)}`
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-2">
          <LineChart className="text-purple-500 mt-1" size={18} />
          <div>
            <div className="font-semibold text-gray-700">Revenue (TTM)</div>
            <div className="font-mono text-blue-900">
              {fundamentals.revenueTTM !== undefined
                ? `$${fundamentals.revenueTTM.toLocaleString()}B`
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Percent className="text-red-500 mt-1" size={18} />
          <div>
            <div className="font-semibold text-gray-700">Dividend Yield</div>
            <div className="font-mono text-blue-900">
              {fundamentals.dividendYieldIndicatedAnnual !== undefined
                ? `${fundamentals.dividendYieldIndicatedAnnual.toFixed(2)}%`
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
