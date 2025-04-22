"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";



type SearchResult = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const router = useRouter();


  const searchStocks = async (term: string, signal: AbortSignal) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.get<{ result: SearchResult[] }>(
        "https://finnhub.io/api/v1/search",
        {
          params: {
            q: term,
            token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
          },
          signal,
        } as any
      );
      setResults(res.data.result);
      setIsOpen(true);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return; // Request was aborted
      }
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };
  

  // Debounce the search input
  useEffect(() => {
    const controller = new AbortController();
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchStocks(query, controller.signal);
      }
    }, 1000); // 1.0s debounce

    return () => {
      clearTimeout(delay)
      controller.abort();
    }; // clear previous timeout on each keystroke
  }, [query]);


  // Close dropdown if input is cleared
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
    }
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        });
    }
}, [selectedIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto text-sm"
    >
      <div className="relative">
            <input
                type="text"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded shadow-sm text-gray-800  focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Search stocks (e.g. AAPL, Tesla)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                setIsOpen(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSelectedIndex((prev) => {
                        const nextIndex = prev === null ? 0 : Math.min(prev + 1, results.length - 1);
                        return nextIndex;
                      });
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSelectedIndex((prev) => {
                        const nextIndex = prev === null ? results.length - 1 : Math.max(prev - 1, 0);
                        return nextIndex;
                      });
                    } else if (e.key === "Enter" && selectedIndex !== null) {
                      const selected = results[selectedIndex];
                      router.push(`/stocks/${selected.symbol}`);
                      setQuery("");
                      setResults([]);
                      setIsOpen(false);
                      setSelectedIndex(null);
                    } else if (e.key === "Escape") {
                      setIsOpen(false);
                      setSelectedIndex(null);
                    }
                  }}
            />

            <AnimatePresence>
                {query && (
                    <motion.button
                    key="clear-button"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onClick={() => {
                        setQuery("");
                        setTimeout(() => {
                        setResults([]);
                        setIsOpen(false);
                        }, 200);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Clear search"
                    >
                    &times;
                    </motion.button>
                )}
                </AnimatePresence>
            </div>
             
             <div
                className={`absolute bg-white shadow rounded w-full mt-2 z-50 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
            {query.trim().length === 0 ? (
                <div className="px-4 py-3 text-gray-500 italic">Start typing to search stocks...</div>
            ) : results.length > 0 ? (
                <ul>
                    {results.map((stock, i) => (
                        <li
                        key={stock.symbol}  
                        ref={(el) => {(itemRefs.current[i] = el)}}
                        className={`px-4 py-2 text-gray-600 cursor-pointer hover:bg-blue-100 ${
                            i === selectedIndex ? "bg-blue-100 font-semibold" : ""
                        }`}
                        onClick={() => {
                            router.push(`/stocks/${stock.symbol}`);
                            setQuery("");
                            setResults([]);
                            setIsOpen(false);
                            setSelectedIndex(null);
                          }}                          
                        >
                        <span>{stock.displaySymbol}</span> -{" "}
                        <span className="text-gray-600">{stock.description}</span>
                        </li>
                    ))}
                </ul>

            ) : (
                !loading && (
                <div className="px-4 py-3 text-gray-500 italic">Searching...</div>
                )
            )}
        </div>

    </div>
  );
}
