export default function MarketOverview() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Market Indices */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-gray-800 font-bold mb-4">📊 Market Overview</h2>
          <div className="space-y-2">
            <p className="text-green-600">S&P 500: 4,500.12 (+1.2%)</p>
            <p className="text-green-600">NASDAQ: 13,500.45 (+0.9%)</p>
            <p className="text-red-600">Dow Jones: 34,200.76 (-0.5%)</p>
          </div>
        </div>
  
        {/* Biggest Gainers & Losers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-gray-800 font-bold mb-4">📈 Biggest Gainers</h2>
          <div className="space-y-2">
            <p className="text-green-600">Tesla (TSLA) +5.2%</p>
            <p className="text-green-600">Apple (AAPL) +3.8%</p>
            <p className="text-green-600">Amazon (AMZN) +2.5%</p>
          </div>
        </div>
      </div>
    );
  }
  