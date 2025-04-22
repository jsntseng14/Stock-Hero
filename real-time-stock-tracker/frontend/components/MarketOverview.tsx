import { BadgeDollarSign, BarChart, TrendingUp, TrendingDown } from 'lucide-react'; 

export default function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Market Indices */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center text-xl text-gray-800 font-bold mb-4">
          <BadgeDollarSign className="text-yellow-500 mr-2" size={24} />
          Market Overview
        </h2>
        <div className="space-y-2">
          <p className="text-green-600">S&P 500: 4,500.12 (+1.2%)</p>
          <p className="text-green-600">NASDAQ: 13,500.45 (+0.9%)</p>
          <p className="text-red-600">Dow Jones: 34,200.76 (-0.5%)</p>
        </div>
      </div>

      {/* Biggest Gainers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center text-xl text-gray-800 font-bold mb-4">
          <TrendingUp className="text-green-500 mr-2" size={24} />
          Biggest Gainers
        </h2>
        <div className="space-y-2">
          <p className="text-green-600">Tesla (TSLA) +5.2%</p>
          <p className="text-green-600">Apple (AAPL) +3.8%</p>
          <p className="text-green-600">Amazon (AMZN) +2.5%</p>
        </div>
      </div>

      {/* Sector Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center text-xl text-gray-800 font-bold mb-4">
          <BarChart className="text-blue-500 mr-2" size={24} />
          Sector Performance
        </h2>
        <div className="space-y-2">
          <p className="text-green-600">Tech: +1.5%</p>
          <p className="text-red-600">Energy: -0.8%</p>
          <p className="text-green-600">Finance: +0.6%</p>
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="flex items-center text-xl text-gray-800 font-bold mb-4">
          <TrendingDown className="text-red-500 mr-2" size={24} />
          Top Losers
        </h2>
        <div className="space-y-2">
          <p className="text-red-600">Netflix (NFLX) -4.2%</p>
          <p className="text-red-600">Meta (META) -3.5%</p>
          <p className="text-red-600">Intel (INTC) -2.9%</p>
        </div>
      </div>
    </div>
  );
}
