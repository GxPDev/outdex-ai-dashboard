import { useEffect, useState } from "react";
import { Market, MarketStatus, resolveMarket } from "./marketLifecycle";
// If resolveMarket is not exported from marketLifecycle, implement it below:

// Example implementation if needed:
// function resolveMarket(market: Market, finalValue: any): Market {
//   return { ...market, status: "RESOLVED", finalValue };
// }

// Simulate a final value for each market type
function simulateFinalValue(market: Market): any {
  if (market.type === "YES_NO") {
    return Math.random() > 0.5 ? "Yes" : "No";
  }
  if (market.type === "RANGE") {
    return market.options[Math.floor(Math.random() * market.options.length)];
  }
  if (market.type === "CLOSE_PRICE") {
    if (market.predictions && market.predictions.length > 0) {
      const avg = market.predictions.reduce((sum, p) => sum + Number(p.value), 0) / market.predictions.length;
      return Number((avg + (Math.random() - 0.5) * avg * 0.05).toFixed(2));
    }
    return Number((100 + Math.random() * 1000).toFixed(2));
  }
  return null;
}

export function useMarketLifecycleEngine(initialMarkets: Market[]) {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prevMarkets) =>
        prevMarkets.map((market) => {
          if (market.status === "OPEN") {
            // Countdown
            const closesIn = Math.max(0, (market.closesAt - Date.now()) / 1000);
            if (closesIn <= 0) {
              return { ...market, status: "LOCKED" };
            }
            return market;
          }
          if (market.status === "LOCKED") {
            // After a short delay, move to RESOLVING
            if (!(market as any)._lockedAt) {
              return { ...market, _lockedAt: Date.now() };
            }
            if (Date.now() - (market as any)._lockedAt > 2000) {
              const { _lockedAt, ...rest } = market as any;
              return { ...rest, status: "RESOLVING" };
            }
            return market;
          }
          if (market.status === "RESOLVING") {
            // After a short delay, resolve
            if (!(market as any)._resolvingAt) {
              return { ...market, _resolvingAt: Date.now() };
            }
            if (Date.now() - (market as any)._resolvingAt > 2000) {
              const finalValue = simulateFinalValue(market);
              const { _resolvingAt, ...rest } = market as any;
              return resolveMarket({ ...rest }, finalValue);
            }
            return market;
          }
          return market;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return [markets, setMarkets] as const;
}
