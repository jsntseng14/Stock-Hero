"use client";

import { useEffect, useState } from "react";
import { fetchStockQuote } from "@/lib/finnhub";

type Quote = {
  symbol: string;
  price: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
};

export default function LiveQuote({ symbol }: { symbol: string }) {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      const data = await fetchStockQuote(symbol);
      setQuote(data);
    };

    getQuote();

    const interval = setInterval(getQuote, 30000); // update every 5 seconds
    return () => clearInterval(interval);
  }, [symbol]);

  if (!quote) return <p>Loading {symbol}...</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
    <h2 className="text-xl font-bold text-gray-800">{quote.symbol}</h2>
    <p className="text-lg text-gray-900">💵 Price: ${quote.price.toFixed(2)}</p>
    <p className="text-sm text-gray-700">
        High: <span className="font-semibold">{quote.high}</span> | Low: <span className="font-semibold">{quote.low}</span>
    </p>
    </div>
  );
}
