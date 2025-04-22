"use client";

import StockTicker from "../components/StockTicker";
import MarketOverview from "../components/MarketOverview";
import PortfolioSummary from "../components/PortfolioSummary";
import LiveQuoteWrapper from "@/components/LiveQuoteWrapper";
import Watchlist from "@/components/WatchList";
import { SampleMarketPerformance } from "@/components/SampleMiniChart";
import { BarChart2, TrendingUp, Zap} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";


// Simulate user authentication for now
const isLoggedIn = false;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StockTicker />

      {!isLoggedIn && (
          <div className="relative text-center py-10 shadow-inner overflow-hidden">
        
          {/* Overlay Content */}
          <div className="text-center py-16 px-6 bg-white shadow-sm">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Track Stocks Like a Pro
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Real-time data, live insights, and beautiful charts to keep you ahead of the market.
            </p>
            <button className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded">
              Get Started for Free
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-6 py-8 text-center">
          <div className="bg-white p-6 rounded shadow">
            <Zap className="mx-auto text-yellow-500 mb-2" size={100} />
            <h3 className="text-lg font-semibold text-gray-800">Real-time Quotes</h3>
            <p className="text-sm text-gray-600">Stay updated with the latest stock prices.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <TrendingUp className="mx-auto text-green-500 mb-2" size={100} />
            <h3 className="text-lg font-semibold text-gray-800">Market Movers</h3>
            <p className="text-sm text-gray-600">See what stocks are trending right now.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <BarChart2 className="mx-auto text-blue-500 mb-2" size={100} />
            <h3 className="text-lg font-semibold text-gray-800">Interactive Charts</h3>
            <p className="text-sm text-gray-600">Visualize performance over time.</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sample Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <LiveQuoteWrapper symbol="AAPL" />
          <LiveQuoteWrapper symbol="TSLA" />
          <LiveQuoteWrapper symbol="GOOGL" />
          <LiveQuoteWrapper symbol="AMZN" />
          <LiveQuoteWrapper symbol="SNOW" />
          <LiveQuoteWrapper symbol="UBER" />
          <LiveQuoteWrapper symbol="ABNB" />
          <LiveQuoteWrapper symbol="MSFT" />
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {isLoggedIn ? (
          <>
            <PortfolioSummary />
            <Watchlist />
          </>
        ) : (
          <>
            <MarketOverview />
            <SampleMarketPerformance />
          </>
        )}
      </div>

      {/* Second Hero Section with Animation & Illustration */}
      <div className="bg-gray-100 pb-10">
        <div className="text-center  py-12 px-6 bg-white shadow-sm mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Stay Ahead of the Market
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Explore top-performing sectors, trending stocks, and expert insights — all in one place.
            </p>
            <button className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition">
              Browse Market Insights
            </button>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex justify-center"
            viewport={{ once: true }}
          >
            <Image
              src="/illustrations/growth-4.png"
              alt="Market Illustration"
              width={400}
              height={200}
            />
            <Image
              src="/illustrations/growth-5.png"
              alt="Market Illustration"
              width={400}
              height={200}
            />
            <Image
              src="/illustrations/growth-3.png"
              alt="Market Illustration"
              width={400}
              height={200}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
