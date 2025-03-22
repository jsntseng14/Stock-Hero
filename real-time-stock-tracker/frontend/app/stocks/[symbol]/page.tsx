interface StockDetailProps {
    params: {
      symbol: string;
    };
  }
  
  export default async function StockDetail({ params }: StockDetailProps) {
    const { symbol } = params;
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Stock: {symbol}</h1>
        <p className="text-gray-600 mt-2">This will show detailed info for {symbol}.</p>
      </div>
    );
  }
  