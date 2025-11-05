import { useMemo } from "react";
import { useOrderBookStore } from "../store/useOrderBookStore";

export default function OrderBook() {
  const { orderBook } = useOrderBookStore();

  const bids = useMemo(
    () =>
      [...orderBook.bids.entries()]
        .map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 20),
    [orderBook.bids]
  );

  const asks = useMemo(
    () =>
      [...orderBook.asks.entries()]
        .map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 20),
    [orderBook.asks]
  );

  // compute cumulative totals and max depth for depth bars
  const bidsWithTotals = useMemo(() => {
    let total = 0;
    return bids.map((b) => ({ ...b, total: (total += b.qty) }));
  }, [bids]);

  const asksWithTotals = useMemo(() => {
    let total = 0;
    return asks.map((a) => ({ ...a, total: (total += a.qty) }));
  }, [asks]);

  const maxBidTotal = bidsWithTotals[bidsWithTotals.length - 1]?.total || 1;
  const maxAskTotal = asksWithTotals[asksWithTotals.length - 1]?.total || 1;

  const bestBid = bids[0]?.price || 0;
  const bestAsk = asks[0]?.price || 0;
  const spread = bestAsk && bestBid ? (bestAsk - bestBid).toFixed(2) : "—";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* BIDS */}
      <div>
        <h2 className="text-green-400 font-semibold mb-2">Bids</h2>

        {/* Column headers */}
        <div className="flex justify-between text-gray-400 text-xs px-2 mb-1">
          <span>Price (USDT)</span>
          <span>Amount (BTC)</span>
          <span>Total</span>
        </div>

        {/* Bid rows */}
        <div className="space-y-0.5 text-sm">
          {bidsWithTotals.map((b) => (
            <div key={b.price} className="relative flex justify-between px-2">
              <div
                className="absolute inset-y-0 left-0 bg-green-900/40 -z-10 rounded"
                style={{ width: `${(b.total / maxBidTotal) * 100}%` }}
              />
              <span>{b.price.toFixed(2)}</span>
              <span>{b.qty.toFixed(5)}</span>
              <span>{b.total.toFixed(5)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ASKS */}
      <div>
        <h2 className="text-red-400 font-semibold mb-2">Asks</h2>

        {/* Column headers */}
        <div className="flex justify-between text-gray-400 text-xs px-2 mb-1">
          <span>Price (USDT)</span>
          <span>Amount (BTC)</span>
          <span>Total</span>
        </div>

        {/* Ask rows */}
        <div className="space-y-0.5 text-sm">
          {asksWithTotals.map((a) => (
            <div key={a.price} className="relative flex justify-between px-2">
              <div
                className="absolute inset-y-0 left-0 bg-red-900/40 -z-10 rounded"
                style={{ width: `${(a.total / maxAskTotal) * 100}%` }}
              />
              <span>{a.price.toFixed(2)}</span>
              <span>{a.qty.toFixed(5)}</span>
              <span>{a.total.toFixed(5)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spread */}
      <div className="col-span-2 text-center text-gray-400 mt-2">
        Spread: <span className="font-semibold">{spread}</span>
      </div>
    </div>
  );
}
