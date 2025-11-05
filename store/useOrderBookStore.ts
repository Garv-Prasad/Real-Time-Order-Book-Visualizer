import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 🔹 Define trade and delta types for type safety
type TradeEvent = {
  p: string; // price
  q: string; // quantity
  m: boolean; // market maker flag
  T: number; // timestamp
};

type OrderBookDelta = {
  b: [string, string][]; // bids
  a: [string, string][]; // asks
};

// 🔹 Define main store shape
type OrderBook = {
  bids: Map<string, string>;
  asks: Map<string, string>;
};

type State = {
  orderBook: OrderBook;
  trades: TradeEvent[];
  updateOrderBook: (delta: OrderBookDelta) => void;
  addTrade: (trade: TradeEvent) => void;
};

// 🧠 Zustand store with immer
export const useOrderBookStore = create<State>()(
  immer((set) => ({
    orderBook: { bids: new Map(), asks: new Map() },
    trades: [],

    updateOrderBook: (delta) =>
      set((state) => {
        // ✅ Update bids
        delta.b.forEach(([price, qty]) => {
          if (qty === "0") state.orderBook.bids.delete(price);
          else state.orderBook.bids.set(price, qty);
        });

        // ✅ Update asks
        delta.a.forEach(([price, qty]) => {
          if (qty === "0") state.orderBook.asks.delete(price);
          else state.orderBook.asks.set(price, qty);
        });
      }),

    addTrade: (trade) =>
      set((state) => {
        state.trades.unshift(trade); // add to top
        if (state.trades.length > 100) state.trades.pop(); // keep only recent 100
      }),
  }))
);
