# Live Order Book Visualizer (Next.js + TypeScript)

## Overview
A high-performance live order book visualizer that connects to Binance WebSocket streams for real-time market data (order book diffs and aggregate trades).  
Features:
- Local depth cache initialized via REST snapshot + diff application
- Bids/Asks columns with price, amount, cumulative total and spread
- Depth bars showing cumulative depth proportionally
- Recent 50 trades with color flash on new trades
- Performance-conscious: Map-backed orderbook, batched updates, memoized sorting

## Quick start
1. Clone:
   ```bash
   git clone <repo>
   cd repo
