import Navbar from "../components/Navbar";
import StockTicker from "../components/StockTicker";
import MarketOverview from "../components/MarketOverview";
import StockChart from "../components/StockChart";
import PortfolioSummary from "../components/PortfolioSummary";
import Footer from "../components/Footer";
import LiveQuoteWrapper from "@/components/LiveQuoteWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Real-time Stock Ticker */}
      <StockTicker />

      {/* Live Stock Quotes */}
      <div className="container mx-auto px-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <LiveQuoteWrapper symbol="AAPL" />
        <LiveQuoteWrapper symbol="TSLA" />
        <LiveQuoteWrapper symbol="GOOGL" />
        <LiveQuoteWrapper symbol="AMZN" />
      </div>

      <div className="container mx-auto p-6">
        {/* Market Overview + Biggest Gainers */}
        <MarketOverview />

        {/* Stock Chart */}
        <StockChart />

        {/* Portfolio Summary */}
        <PortfolioSummary />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
