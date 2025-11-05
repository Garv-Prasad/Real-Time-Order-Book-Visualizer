import { useEffect, useRef } from "react";

type TradeEvent = {
  p: string; // price
  q: string; // quantity
  m: boolean; // is buyer market maker?
  T: number; // trade time
};

type OrderBookDelta = {
  b: [string, string][]; // bids [price, quantity]
  a: [string, string][]; // asks [price, quantity]
};

export function useBinanceSocket(
  symbol: string,
  onTrade: (trade: TradeEvent) => void,
  onDepth: (delta: OrderBookDelta) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lowerSymbol = symbol.toLowerCase();
    const streamUrl = `wss://stream.binance.com:9443/stream?streams=${lowerSymbol}@aggTrade/${lowerSymbol}@depth`;

    function connect() {
      const ws = new WebSocket(streamUrl);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ Connected to Binance WebSocket");

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.stream.endsWith("@aggTrade")) {
          onTrade(msg.data);
        } else if (msg.stream.endsWith("@depth")) {
          onDepth(msg.data);
        }
      };

      ws.onclose = () => {
        console.warn("❌ WebSocket closed. Reconnecting in 3s...");
        reconnectTimeout.current = setTimeout(connect, 3000); // ✅ safely reconnect
      };

      ws.onerror = (err) => {
        console.error("⚠️ WebSocket error:", err);
        ws.close();
      };
    }

    connect();

    // Cleanup when component unmounts
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
    };
  }, [symbol, onTrade, onDepth]);
}
