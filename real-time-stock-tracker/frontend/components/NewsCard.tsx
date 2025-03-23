"use client";

import { CalendarDays, ExternalLink } from "lucide-react";

type NewsItem = {
  datetime: number;
  headline: string;
  source: string;
  url: string;
  summary: string;
  image: string;
};

export default function NewsCard({ news }: { news: NewsItem[] }) {
  return (
    <div className="col-span-full bg-white shadow rounded p-6 space-y-4">
      <h2 className="text-lg font-semibold text-blue-600">📰 Recent News</h2>
      {news.length === 0 && (
        <p className="text-sm text-gray-500">No recent news found.</p>
      )}
      {news.slice(0, 5).map((item) => (
        <div
          key={item.datetime}
          className="border-b pb-4 mb-4 last:border-none last:mb-0"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-blue-700 hover:underline flex items-center gap-1"
          >
            {item.headline} <ExternalLink size={16} />
          </a>
          <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <CalendarDays size={14} />
            {new Date(item.datetime * 1000).toLocaleDateString()}
            <span>•</span>
            {item.source}
          </div>
        </div>
      ))}
    </div>
  );
}
