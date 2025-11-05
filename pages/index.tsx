"use client"; // ✅ ensures this runs on the client (important for WebSocket + Zustand)

import { useEffect } from "react";
import { useBinanceSocket } from "../hooks/useBinanceSocket";
import { useOrderBookStore } from "../store/useOrderBookStore";
import OrderBook from "../components/OrderBook";
import RecentTrades from "../components/RecentTrades";

export default function Home() {
  const { updateOrderBook, addTrade } = useOrderBookStore();

  // 🔌 Connect to Binance WebSocket for BTC/USDT data
  useBinanceSocket("BTCUSDT", addTrade, updateOrderBook);

  // Optional: log state updates (debugging)
  useEffect(() => {
    console.log("✅ Binance WebSocket connected — streaming BTC/USDT data");
  }, []);

  return (
    <main className="bg-gray-900 text-white min-h-screen p-6 grid md:grid-cols-3 gap-4">
      {/* 🟢 Order Book Section */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">
          Binance BTC/USDT Order Book
        </h1>
        <OrderBook />
      </div>

      {/* 🔴 Recent Trades Section */}
      <div>
        <RecentTrades />
      </div>
    </main>
  );
}
