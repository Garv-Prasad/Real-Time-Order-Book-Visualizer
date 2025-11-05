import { useEffect, useState } from "react";
import { useOrderBookStore } from "../store/useOrderBookStore";
import { motion, AnimatePresence } from "framer-motion";

export default function RecentTrades() {
  const { trades } = useOrderBookStore();
  const [visibleTrades, setVisibleTrades] = useState<any[]>([]);

  // Keep only 50 most recent trades
  useEffect(() => {
    setVisibleTrades(trades.slice(0, 50));
  }, [trades]);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-4 text-sm">
      <h2 className="text-lg font-semibold mb-2">Recent Trades</h2>
      <div className="overflow-y-auto max-h-[500px] pr-2">
        <AnimatePresence initial={false}>
          {visibleTrades.map((trade) => (
            <motion.div
              key={trade.T}
              // 🔥 Flash effect for new trade
              initial={{ backgroundColor: trade.m ? "#3b0d0d" : "#0d3b1a" }}
              animate={{ backgroundColor: "transparent" }}
              transition={{ duration: 0.5 }}

              // 💹 Trade row styling
              className={`flex justify-between items-center py-0.5 px-2 rounded ${
                trade.m ? "text-red-400" : "text-green-400"
              }`}
            >
              <span>{parseFloat(trade.p).toFixed(2)}</span>
              <span>{parseFloat(trade.q).toFixed(5)}</span>
              <span className="text-gray-400 text-xs">
                {new Date(trade.T).toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
