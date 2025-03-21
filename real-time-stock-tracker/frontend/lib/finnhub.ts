import axios from "axios";

const API_URL = "https://finnhub.io/api/v1";

type QuoteResponse = {
    c: number;  // current price
    h: number;  // high
    l: number;  // low
    o: number;  // open
    pc: number; // previous close
  };
  

  export const fetchStockQuote = async (symbol: string) => {
    const res = await axios.get<QuoteResponse>(`${API_URL}/quote`, {
      params: {
        symbol,
        token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
      },
    });

    console.log(res);
  
    return {
      symbol,
      price: res.data.c,
      high: res.data.h,
      low: res.data.l,
      open: res.data.o,
      prevClose: res.data.pc,
    };
  };
