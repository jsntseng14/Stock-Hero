import { fetchStockQuote, fetchCompanyProfile, fetchCompanyNews, fetchPeerCompanies, fetchAnalystRecommendations, fetchValuationMetrics, fetchInsiderSentiment  } from "@/lib/finnhub";
import CompanyProfileCard from "@/components/CompanyProfileCard";
import StockBreadcrumbs from "@/components/StockBreadcrumbs";
import StockChart from "@/components/StockChart";
import Fundamentals from "@/components/Fundamentals";
import StockSummary from "@/components/StockSummary";
import NewsCard from "@/components/NewsCard";
import InsightsCard from "@/components/InsightsCard";
  



export default async function StockDetail({ params }: { params: { symbol: string } }) {
  const symbol = (await params).symbol;
  const quote = await fetchStockQuote(symbol);
  const profile = await fetchCompanyProfile(symbol);
  const news = await fetchCompanyNews(symbol);
  const recommendations = await fetchAnalystRecommendations(symbol);
  const peers = await fetchPeerCompanies(symbol);
  const valuationMetrics = await fetchValuationMetrics(symbol);
  const sentiment = await fetchInsiderSentiment(symbol);

  

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <StockBreadcrumbs symbol={symbol} />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Profile - full width */}
          <div className="col-span-full">
            <CompanyProfileCard profile={profile} peers={peers} />
          </div>

          {/* Quote Summary - full width */}
          <StockSummary
            price={quote.price}
            high={quote.high}
            low={quote.low}
            open={quote.open}
            prevClose={quote.prevClose}
            timestamp={quote.timestamp}
            volume={quote.volume} // optional
          />


          {/* Placeholder Cards */}
          
          <StockChart symbol={symbol} />
          <Fundamentals symbol={symbol} />
          <NewsCard news={news} />
          <InsightsCard
            recommendations={recommendations[0]}
            valuation={valuationMetrics} 
          />
        </div>
      </div>
    </div>
  );
}
