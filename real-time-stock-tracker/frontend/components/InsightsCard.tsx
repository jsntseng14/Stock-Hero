"use client";

import { ThumbsUp, TrendingUp, ActivitySquare } from "lucide-react";

export type AnalystRecommendation = {
  buy: number;
  hold: number;
  sell: number;
  strongBuy: number;
  strongSell: number;
};

export type ValuationMetric = {
  peBasicExclExtraTTM?: number;
  pbAnnual?: number;
  evToEbitdaAnnual?: number;
  evToSalesAnnual?: number;
  trailingPEG1Y?: number;
};

type InsiderSentiment = {
  sentimentDescription: string;
  sentimentScore: any;
  month: string;
  change: number;
  mspr: number;
};


type StockInsightsProps = {
  recommendations: AnalystRecommendation;
  valuation?: ValuationMetric;
  insiderSentiment?: InsiderSentiment;
};

export default function StockInsights({
  recommendations,
  valuation,
  insiderSentiment,
}: StockInsightsProps) {
  return (
    <div className="col-span-full bg-white shadow rounded p-6">
      <h2 className="text-lg font-semibold text-blue-600 mb-4 tracking-tight">
          Stock Insights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm md:text-base text-gray-800">
        {/* Analyst Recommendations */}
        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
            <ThumbsUp size={18} />
            Analyst Recommendations
          </h3>
          <ul className="space-y-1">
            <li>🟢 Strong Buy: {recommendations.strongBuy}</li>
            <li>🟢 Buy: {recommendations.buy}</li>
            <li>🟡 Hold: {recommendations.hold}</li>
            <li>🔴 Sell: {recommendations.sell}</li>
            <li>🔴 Strong Sell: {recommendations.strongSell}</li>
          </ul>
        </div>

        {/* Insider Sentiment */}
        {insiderSentiment && (
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-purple-500 mb-2 flex items-center gap-2">
              <ActivitySquare size={18} />
              Insider Sentiment
            </h3>
            <p>
              <strong>Score:</strong>{" "}
              {insiderSentiment.sentimentScore?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {insiderSentiment.sentimentDescription ?? "N/A"}
            </p>
          </div>
        )}

        {/* Valuation Metrics */}
        {valuation && (
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
              <TrendingUp size={18} />
              Valuation Metrics
            </h3>
            <p>
              <strong>P/E (Excl Extra):</strong>{" "}
              {valuation.peBasicExclExtraTTM?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <strong>P/B Annual:</strong>{" "}
              {valuation.pbAnnual?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <strong>EV/EBITDA Annual:</strong>{" "}
              {valuation.evToEbitdaAnnual?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <strong>EV/Sales Annual:</strong>{" "}
              {valuation.evToSalesAnnual?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <strong>Trailing PEG (1Y):</strong>{" "}
              {valuation.trailingPEG1Y?.toFixed(2) ?? "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
