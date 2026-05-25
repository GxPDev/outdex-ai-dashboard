// src/app/enter-market/logic/marketLifecycle.ts
import { v4 as uuidv4 } from "uuid";

export type MarketType = "YES_NO" | "RANGE" | "CLOSE_PRICE";
export type MarketStatus = "CREATED" | "OPEN" | "LOCKED" | "RESOLVING" | "RESOLVED";

export interface Market {
  id: string;
  pair: string;
  type: MarketType;
  question: string;
  options: string[];
  pool: number;
  participants: number;
  status: MarketStatus;
  createdAt: number;
  closesAt: number;
  finalResult?: any;
  resolvedAt?: number | null;
  winners?: string[];
  payoutPerWinner?: number | null;
  predictions?: Prediction[];
}

export interface Prediction {
  userId: string;
  value: string | number;
}

// --- Market Lifecycle Functions ---

export function createMarket(signal: Omit<Market, "id" | "status" | "createdAt" | "closesAt" | "participants" | "pool" | "finalResult" | "predictions"> & { closesIn: number }): Market {
  return {
    ...signal,
    id: uuidv4(),
    status: "CREATED",
    createdAt: Date.now(),
    closesAt: Date.now() + signal.closesIn * 1000,
    participants: 0,
    pool: 0,
    finalResult: undefined,
    predictions: [],
  };
}

export function openMarket(market: Market): Market {
  if (market.status !== "CREATED") throw new Error("Market must be in CREATED state to open");
  return { ...market, status: "OPEN" };
}

export function lockMarket(market: Market): Market {
  if (market.status !== "OPEN") throw new Error("Market must be OPEN to lock");
  return { ...market, status: "LOCKED" };
}

export function resolveMarket(market: Market, priceData: any): Market {
  if (market.status !== "LOCKED") throw new Error("Market must be LOCKED to resolve");
  let winners: string[] = [];
  let finalResult: any = undefined;
  let payoutPerWinner: number | null = null;

  if (market.type === "CLOSE_PRICE") {
    const finalPrice = typeof priceData === "number" ? priceData : Number(priceData);
    finalResult = finalPrice;
    if (market.predictions && market.predictions.length > 0) {
      const ranked = market.predictions
        .map(p => ({ ...p, dist: Math.abs(Number(p.value) - finalPrice) }))
        .sort((a, b) => a.dist - b.dist);
      const topCount = Math.max(1, Math.ceil(ranked.length * 0.05));
      winners = ranked.slice(0, topCount).map(p => p.userId);
    }
  } else if (market.type === "RANGE") {
    finalResult = priceData;
    if (market.predictions && market.predictions.length > 0) {
      winners = market.predictions.filter((p: Prediction) => p.value === priceData).map((p: Prediction) => p.userId);
    }
  } else if (market.type === "YES_NO") {
    finalResult = priceData;
    if (market.predictions && market.predictions.length > 0) {
      winners = market.predictions.filter((p: Prediction) => p.value === priceData).map((p: Prediction) => p.userId);
    }
  }

  if (winners.length > 0) {
    payoutPerWinner = Math.floor(market.pool / winners.length);
  }

  return {
    ...market,
    status: "RESOLVED",
    finalResult,
    resolvedAt: Date.now(),
    winners,
    payoutPerWinner,
  };
}

export function getMarketState(market: Market): MarketStatus {
  return market.status;
}

// --- Utility: Enforce state transitions ---
export function canTransition(current: MarketStatus, next: MarketStatus): boolean {
  const order: MarketStatus[] = ["CREATED", "OPEN", "LOCKED", "RESOLVING", "RESOLVED"];
  const curIdx = order.indexOf(current);
  const nextIdx = order.indexOf(next);
  return nextIdx === curIdx + 1;
}
