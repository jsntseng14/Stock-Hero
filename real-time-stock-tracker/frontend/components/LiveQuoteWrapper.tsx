"use client";

import dynamic from "next/dynamic";

// Dynamically import LiveQuote with SSR disabled
const LiveQuote = dynamic(() => import("./LiveQuote"), { ssr: false });

export default function LiveQuoteWrapper({ symbol }: { symbol: string }) {
  return <LiveQuote symbol={symbol} />;
}
