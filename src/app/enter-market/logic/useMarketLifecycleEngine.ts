import { useEffect, useState } from "react";
import { Market, MarketStatus, resolveMarket } from "./marketLifecycle";

type MarketInternal = Market & { _lockedAt?: number; _resolvingAt?: number };
// If resolveMarket is not exported from marketLifecycle, implement it below:

// Example implementation if needed:
// function resolveMarket(market: Market, finalValue: any): Market {
//   return { ...market, status: "RESOLVED", finalValue };
// }

// Simulate a final value for each market type
function simulateFinalValue(market: Market): string | number | null {
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
  const [markets, setMarkets] = useState<MarketInternal[]>(initialMarkets as MarketInternal[]);

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
            if (!market._lockedAt) {
              return { ...market, _lockedAt: Date.now() };
            }
            if (Date.now() - (market._lockedAt as number) > 2000) {
              const { _lockedAt, ...rest } = market as MarketInternal;
              return { ...(rest as MarketInternal), status: "RESOLVING" };
            }
            return market;
          }
          if (market.status === "RESOLVING") {
            // After a short delay, resolve
            if (!market._resolvingAt) {
              return { ...market, _resolvingAt: Date.now() };
            }
            if (Date.now() - (market._resolvingAt as number) > 2000) {
              const finalValue = simulateFinalValue(market);
              const { _resolvingAt, ...rest } = market as MarketInternal;
              return resolveMarket({ ...(rest as Market) }, finalValue as string | number);
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
