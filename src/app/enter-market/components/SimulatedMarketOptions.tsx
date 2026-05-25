
import React, { useEffect, useState } from "react";
import MarketCard from "./MarketCard";
import { Market } from "../types/market";
import { ActivityEvent, MarketStatus } from "../logic/useSimulatedMarket";

interface SimulatedMarketOptionsProps {
  initialMarkets: Market[];
  onActivity: (event: ActivityEvent) => void;
}


export default function SimulatedMarketOptions({ initialMarkets, onActivity }: SimulatedMarketOptionsProps) {
  // Only use initialMarkets once for initial state, and filter out duplicate IDs
  const [markets, setMarkets] = useState(() => {
    const seen = new Set();
    return initialMarkets
      .filter(m => {
        if (seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      })
      .map((m) => ({ ...m, status: "OPEN" as MarketStatus }));
  });
  const [pendingEvents, setPendingEvents] = useState<ActivityEvent[]>([]);

  // Simulate market state changes and batch activity events
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvents: ActivityEvent[] = [];
      setMarkets((prevMarkets) => {
        return prevMarkets.map((market) => {
          // Simulate closesIn countdown
          let closesIn = Math.max(0, (market.closesIn ?? 0) - 1);
          let confidence = Math.max(0, Math.min(100, (market.confidence ?? 50) + (Math.random() - 0.5) * 2));
          let participants = market.participants + (Math.random() < 0.1 ? 1 : 0);
          let pool = market.pool + (Math.random() < 0.1 ? Math.floor(Math.random() * 1000) : 0);
          let currentPrice = market.currentPrice !== undefined ? market.currentPrice + (Math.random() - 0.5) * 0.2 : undefined;
          let status = market.status;
          let finalResult = market.finalResult;

          // Simulate status transitions
          if (status === "OPEN" && closesIn === 0) {
            status = "LOCKED";
            newEvents.push({
              id: `locked-${market.id}`,
              message: `Market ${market.pair} locked for new entries`,
              timestamp: Date.now(),
            });
          } else if (status === "LOCKED" && Math.random() < 0.05) {
            status = "RESOLVING";
            newEvents.push({
              id: `resolving-${market.id}`,
              message: `Market ${market.pair} is resolving...`,
              timestamp: Date.now(),
            });
          } else if (status === "RESOLVING" && Math.random() < 0.1) {
            status = "RESOLVED";
            finalResult = market.type === "YES_NO"
              ? (Math.random() > 0.5 ? "Yes" : "No")
              : market.type === "RANGE"
                ? market.options?.[Math.floor(Math.random() * (market.options?.length || 1))]
                : market.currentPrice?.toFixed(2) || "N/A";
            newEvents.push({
              id: `resolved-${market.id}`,
              message: `Market ${market.pair} resolved: ${finalResult}`,
              timestamp: Date.now(),
            });
          }

          // Emit activity events for participants and pool
          if (participants > market.participants) {
            newEvents.push({
              id: `join-${market.id}-${participants}`,
              message: `+1 participant joined ${market.pair} market`,
              timestamp: Date.now(),
            });
          }
          if (pool > market.pool) {
            newEvents.push({
              id: `pool-${market.id}-${pool}`,
              message: `Pool increased to $${(pool / 1000).toFixed(1)}K for ${market.pair}`,
              timestamp: Date.now(),
            });
          }

          return {
            ...market,
            closesIn,
            confidence: Math.round(confidence),
            participants,
            pool,
            currentPrice,
            status,
            finalResult,
          };
        });
      });
      // After state update, batch events for emission
      if (newEvents.length > 0) setPendingEvents((prev) => [...prev, ...newEvents]);
    }, 1000);
    return () => clearInterval(interval);
  }, [onActivity]);

  // Emit activity events after state update
  useEffect(() => {
    if (pendingEvents.length > 0) {
      pendingEvents.forEach((event) => onActivity?.(event));
      setPendingEvents([]);
    }
  }, [pendingEvents, onActivity]);

  // Simulate markets appearing/disappearing
  useEffect(() => {
    const interval = setInterval(() => {
      let createdEvent: ActivityEvent | null = null;
      setMarkets((prev) => {
        if (Math.random() < 0.1 && prev.length > 1) {
          // Remove a random market
          const idx = Math.floor(Math.random() * prev.length);
          return prev.filter((_, i) => i !== idx);
        } else if (Math.random() < 0.1 && prev.length < 6) {
          // Add a new market (simulate new market creation)
          const newMarket: Market = {
            id: `${Date.now()}`,
            pair: ["SOL/USD", "DOGE/USD", "TSLA", "GOOG"][Math.floor(Math.random() * 4)],
            question: "AI-generated market: Will it move?",
            type: "YES_NO",
            confidence: Math.floor(Math.random() * 100),
            risk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as any,
            options: ["Yes", "No"],
            participants: Math.floor(Math.random() * 100),
            closesIn: 1800 + Math.floor(Math.random() * 3600),
            createdAt: Date.now(),
            pool: 10000 + Math.floor(Math.random() * 1000000),
          };
          createdEvent = {
            id: `created-${newMarket.id}`,
            message: `Zinax created new ${newMarket.pair} market`,
            timestamp: Date.now(),
          };
          return [...prev, { ...newMarket, status: "OPEN" as MarketStatus }];
        }
        return prev;
      });
      if (createdEvent) setPendingEvents((prev) => [...prev, ...(createdEvent ? [createdEvent] : [])]);
    }, 5000);
    return () => clearInterval(interval);
  }, [onActivity]);

  // Debug: log market IDs to check for duplicates
  console.log('SimulatedMarketOptions markets:', markets.map(m => m.id));
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {markets.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  );
}
