"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchQuote, fetchCompanyProfile } from "@/lib/finnhub";

interface LiveQuoteProps {
  symbol: string;
}

interface QuoteData {
  price: number;
  change: number;
  percentChange: number;
  high?: number;
  low?: number;
  open?: number;
  volume?: number;
}

export default function LiveQuote({ symbol }: LiveQuoteProps) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const quoteData = await fetchQuote(symbol);
        const profile = await fetchCompanyProfile(symbol);

        setQuote({
          price: quoteData.c,
          change: quoteData.c - quoteData.pc,
          percentChange: ((quoteData.c - quoteData.pc) / quoteData.pc) * 100,
          high: quoteData.h,
          low: quoteData.l,
          open: quoteData.o,
          volume: quoteData.v,
        });

        setLogoUrl(profile.logo);
        setCompanyName(profile.name);
      } catch (error) {
        console.error("Failed to fetch quote/profile:", error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (!quote) return <div className="bg-white shadow rounded p-4">Loading {symbol}...</div>;

  return (
    <Link
      href={`/stocks/${symbol}`}
      className="block bg-white shadow-md hover:shadow-lg rounded p-4 transition-transform hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={`${symbol} Logo`}
              width={40}
              height={40}
              className="rounded"
            />
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
            <p className="text-sm text-gray-600">{companyName}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-semibold text-green-600">
            ${quote.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {quote.change >= 0 ? "+" : "-"}
            {Math.abs(quote.change).toFixed(2)} ({Math.abs(quote.percentChange).toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mt-4">
        <p><strong>High:</strong> ${quote.high?.toFixed(2) ?? "N/A"}</p>
        <p><strong>Low:</strong> ${quote.low?.toFixed(2) ?? "N/A"}</p>
        <p><strong>Open:</strong> ${quote.open?.toFixed(2) ?? "N/A"}</p>
        <p><strong>Volume:</strong> {quote.volume?.toLocaleString() ?? "N/A"}</p>
      </div>
    </Link>
  );
}
