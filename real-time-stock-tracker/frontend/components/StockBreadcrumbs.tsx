"use client";

import { useRouter } from "next/navigation";

export default function StockBreadcrumbs({ symbol }: { symbol: string }) {
  const router = useRouter();

  return (
    <div className="text-sm text-gray-600 mb-4">
      <span
        className="text-gray-800 hover:underline cursor-pointer"
        onClick={() => router.push("/")}
      >
        Home
      </span>
      <span className="mx-2">/</span>
      <span
        className="text-gray-800 hover:underline cursor-pointer"
        onClick={() => router.push("/stocks")}
      >
        Stocks
      </span>
      <span className="mx-2">/</span>
      <span className="text-blue-600 font-semibold">{symbol}</span>
    </div>
  );
}
