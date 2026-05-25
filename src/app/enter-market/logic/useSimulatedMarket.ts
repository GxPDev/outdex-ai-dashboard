
import { useEffect, useRef, useState } from "react";
import type { Market } from "../types/market";

export type MarketStatus = "OPEN" | "LOCKED" | "RESOLVING" | "RESOLVED";

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: number;
}

function getNextStatus(status: MarketStatus): MarketStatus {
  switch (status) {
    case "OPEN": return "LOCKED";
    case "LOCKED": return "RESOLVING";
    case "RESOLVING": return "RESOLVED";
    case "RESOLVED": return "OPEN";
    default: return "OPEN";
  }
}

export function useSimulatedMarket(
  initialMarket: Market,
  emitActivity?: (event: ActivityEvent) => void
) {
  const [market, setMarket] = useState<Market & { status: MarketStatus; finalResult?: string }>(
    { ...initialMarket, status: "OPEN" }
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMarket((prev: Market & { status: MarketStatus; finalResult?: string }) => {
        let closesIn = Math.max(0, (prev.closesIn ?? 0) - 1);
        let confidence = Math.max(0, Math.min(100, (prev.confidence ?? 50) + (Math.random() - 0.5) * 2));
        let participants = prev.participants + (Math.random() < 0.1 ? 1 : 0);
        let pool = prev.pool + (Math.random() < 0.1 ? Math.floor(Math.random() * 1000) : 0);
        let currentPrice = prev.currentPrice !== undefined ? prev.currentPrice + (Math.random() - 0.5) * 0.2 : undefined;
        let status = prev.status;
        let finalResult = prev.finalResult;

        // Simulate status transitions
        if (status === "OPEN" && closesIn === 0) {
          status = "LOCKED";
          emitActivity?.({
            id: `locked-${prev.id}`,
            message: `Market ${prev.pair} locked for new entries`,
            timestamp: Date.now(),
          });
        } else if (status === "LOCKED" && Math.random() < 0.05) {
          status = "RESOLVING";
          emitActivity?.({
            id: `resolving-${prev.id}`,
            message: `Market ${prev.pair} is resolving...`,
            timestamp: Date.now(),
          });
        } else if (status === "RESOLVING" && Math.random() < 0.1) {
          status = "RESOLVED";
          finalResult = prev.type === "YES_NO"
            ? (Math.random() > 0.5 ? "Yes" : "No")
            : prev.type === "RANGE"
              ? prev.options?.[Math.floor(Math.random() * (prev.options?.length || 1))]
              : prev.currentPrice?.toFixed(2) || "N/A";
          emitActivity?.({
            id: `resolved-${prev.id}`,
            message: `Market ${prev.pair} resolved: ${finalResult}`,
            timestamp: Date.now(),
          });
        }

        // Emit activity events for participants and pool
        if (participants > prev.participants) {
          emitActivity?.({
            id: `join-${prev.id}-${participants}`,
            message: `+1 participant joined ${prev.pair} market`,
            timestamp: Date.now(),
          });
        }
        if (pool > prev.pool) {
          emitActivity?.({
            id: `pool-${prev.id}-${pool}`,
            message: `Pool increased to $${(pool / 1000).toFixed(1)}K for ${prev.pair}`,
            timestamp: Date.now(),
          });
        }

        return {
          ...prev,
          closesIn,
          confidence: Math.round(confidence),
          participants,
          pool,
          currentPrice,
          status,
          finalResult,
        };
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emitActivity]);

  return market;
}
