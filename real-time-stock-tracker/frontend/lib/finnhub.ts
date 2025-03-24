import axios from "axios";
import { mockStockChartData } from "@/mock/stockChartData";
import { mockFundamentals } from "@/mock/fundamentals";

const API_URL = "https://finnhub.io/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

// In lib/finnhub.ts

// Raw response from the Finnhub API
export type FinnhubQuote = {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t?: number;
};

export type StockQuote = {
  symbol: string;
  price: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  timestamp?: number;
  volume?: number; // ✅ make optional
};


export type CompanyProfile = {
  name: string;
  ticker: string;
  exchange: string;
  industry: string;
  weburl: string;
  country: string;
  logo: string;
};

export type CandleResponse = {
  c: number[]; // close prices
  t: number[]; // timestamps
  s: string;   // status
};

export type Fundamentals = {
  marketCapitalization: number;
  peBasicExclExtraTTM: number;
  epsInclExtraItemsTTM: number;
  revenueTTM: number;
  dividendYieldIndicatedAnnual: number;
};

type FundamentalsApiResponse = {
  metric: {
    marketCapitalization: number;
    peBasicExclExtraTTM: number;
    epsInclExtraItemsTTM: number;
    revenueTTM: number;
    dividendYieldIndicatedAnnual: number;
  };
};

export type NewsItem = {
  datetime: number;
  headline: string;
  source: string;
  url: string;
  summary: string;
  image: string;
};

export type Recommendation = {
  symbol: string;
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
};

export type ValuationMetrics = {
  metric: {
    peBasicExclExtraTTM?: number;
    pbAnnual?: number;
    evToEbitdaAnnual?: number;
    evToSalesAnnual?: number;
    trailingPEG1Y?: number;
  };
};

export type InsiderSentiment = {
  symbol: string;
  data: {
    year: any;
    month: string;
    change: number;
    mspr: number; // Monthly share purchase ratio
  }[];
};

export async function fetchValuationMetrics(symbol: string): Promise<ValuationMetrics["metric"]> {
  const res = await axios.get<ValuationMetrics>(`${API_URL}/stock/metric`, {
    params: {
      symbol,
      metric: "valuation",
      token: API_KEY,
    },
  });

  return res.data.metric;
}

export async function fetchInsiderSentiment(symbol: string): Promise<InsiderSentiment["data"]> {
  const currentDate = new Date();
  const from = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1)
    .toISOString()
    .split("T")[0];
  const to = currentDate.toISOString().split("T")[0];

  const res = await axios.get<InsiderSentiment>(`${API_URL}/stock/insider-sentiment`, {
    params: {
      symbol,
      from,
      to,
      token: API_KEY,
    },
  });

  return res.data.data;
}


export async function fetchAnalystRecommendations(symbol: string): Promise<Recommendation[]> {
  const res = await axios.get<Recommendation[]>(`${API_URL}/stock/recommendation`, {
    params: {
      symbol,
      token: API_KEY,
    },
  });

  return res.data;
}

export async function fetchPeerCompanies(symbol: string): Promise<string[]> {
  const res = await axios.get<string[]>(`${API_URL}/stock/peers`, {
    params: {
      symbol,
      token: API_KEY,
    },
  });

  return res.data;
}

export async function fetchCompanyNews(symbol: string): Promise<NewsItem[]> {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - 7); // fetch news from the past week

  const res = await axios.get<NewsItem[]>(`${API_URL}/company-news`, {
    params: {
      symbol,
      from: from.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
      token: API_KEY,
    },
  });

  return res.data;
}


export async function fetchFundamentals(symbol: string): Promise<Fundamentals> {
  try {
    const res = await axios.get<FundamentalsApiResponse>(`${API_URL}/stock/metric`, {
      params: {
        symbol,
        metric: "all",
        token: API_KEY,
      },
    });

    return res.data.metric;
  } catch (err) {
    console.warn(`⚠️ Falling back to mock fundamentals for ${symbol}:`, err);
    return mockFundamentals;
  }
}



export async function fetchStockCandles(symbol: string): Promise<{ time: string; price: number }[]> {
  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - 60 * 60 * 24;

  try {
    const res = await axios.get<CandleResponse>(`${API_URL}/stock/candle`, {
      params: {
        symbol,
        resolution: "5",
        from: oneDayAgo,
        to: now,
        token: API_KEY,
      },
    });

    if (res.data.s !== "ok") {
      console.warn("API responded with status:", res.data.s);
      return mockStockChartData;
    }

    return res.data.t.map((timestamp, i) => ({
      time: new Date(timestamp * 1000).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      price: res.data.c[i],
    }));
  } catch (error) {
    console.error("Error fetching stock candles:", error);
    return mockStockChartData;
  }
}


export async function fetchCompanyProfile(symbol: string): Promise<CompanyProfile> {
  const res = await axios.get<CompanyProfile>(`${API_URL}/stock/profile2`, {
    params: {
      symbol,
      token: API_KEY,
    },
  });

  return res.data;
}

export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  const res = await axios.get<FinnhubQuote>(`${API_URL}/quote`, {
    params: {
      symbol,
      token: API_KEY,
    },
  });

  return {
    symbol, 
    price: res.data.c,
    high: res.data.h,
    low: res.data.l,
    open: res.data.o,
    prevClose: res.data.pc,
    timestamp: res.data.t,
  };
};


export async function fetchQuote(symbol: string): Promise<FinnhubQuote> {
  const res = await axios.get<FinnhubQuote>(`${API_URL}/quote`, {
    params: {
      symbol,
      token: API_KEY,
    },
  });

  return res.data;
}
