// src/app/enter-market/logic/zinaxOrchestrator.ts
import { v4 as uuidv4 } from "uuid";
import { Market, MarketType } from "./marketLifecycle";

// --- Signal Status & Reasoning Types ---
export type SignalStatus = "Scanning" | "Qualified" | "Rejected" | "MarketCreated";
export interface ZinaxSignal extends Signal {
  status: SignalStatus;
  reasoning: string;
  pipelineStep: number; // 0: Scanning, 1: Qualified/Rejected, 2: MarketCreated
}

export interface ZinaxOrchestratorStats {
  totalScanned: number;
  qualified: number;
  rejected: number;
  marketsCreated: number;
  eliteOpportunities: number;
}

// --- Types ---
export type AssetClass = "crypto" | "forex" | "stocks" | "commodities";
export interface Signal {
  id: string;
  asset: string;
  assetClass: AssetClass;
  volatility: number;
  trend: number;
  momentum: number;
  volume: number;
  risk: number;
  confidence: number;
  timestamp: number;
}

export type MarketTier = "Elite" | "Hot" | "Active" | "Watch";

export interface OrchestratedMarket extends Market {
  tier: MarketTier;
  signal: Signal;
  score: number;
  published: boolean;
}

// --- Simulate Signal Scanning ---
export function scanSignals(): ZinaxSignal[] {
  const assets = [
    { asset: "BTCUSD", assetClass: "crypto" },
    { asset: "ETHUSD", assetClass: "crypto" },
    { asset: "EURUSD", assetClass: "forex" },
    { asset: "AAPL", assetClass: "stocks" },
    { asset: "XAUUSD", assetClass: "commodities" },
    { asset: "TSLA", assetClass: "stocks" },
    { asset: "GBPUSD", assetClass: "forex" },
    { asset: "WTI", assetClass: "commodities" },
  ];
  return assets.map(({ asset, assetClass }) => {
    const volatility = Math.random() * 100;
    const trend = Math.random() * 100;
    const momentum = Math.random() * 100;
    const volume = Math.random() * 100;
    const risk = Math.random() * 100;
    const confidence = Math.random() * 100;
    return {
      id: uuidv4(),
      asset,
      assetClass: assetClass as AssetClass,
      volatility,
      trend,
      momentum,
      volume,
      risk,
      confidence,
      timestamp: Date.now(),
      status: "Scanning",
      reasoning: "Scanning for opportunity...",
      pipelineStep: 0,
    };
  });
}

// --- AI Scoring ---
export function scoreSignal(signal: Signal): number {
  // Boost strong trend, high volume, high confidence, penalize high risk
  let score = 0;
  score += signal.trend * 1.2;
  score += signal.volume * 1.1;
  score += signal.confidence * 1.5;
  score -= signal.risk * 1.3;
  score += signal.momentum * 0.8;
  score += signal.volatility * 0.7;
  return score;
}

export function qualifySignals(signals: ZinaxSignal[]): ZinaxSignal[] {
  // Mark signals as Qualified or Rejected, add reasoning
  const seen = new Set<string>();
  return signals.map((s) => {
    if (s.confidence < 40 || s.risk > 70) {
      return {
        ...s,
        status: "Rejected",
        reasoning: s.confidence < 40
          ? "Rejected due to weak confirmation"
          : "Rejected due to high risk",
        pipelineStep: 1,
      };
    }
    if (seen.has(s.asset)) {
      return {
        ...s,
        status: "Rejected",
        reasoning: "Rejected as duplicate signal",
        pipelineStep: 1,
      };
    }
    seen.add(s.asset);
    // Reasoning for qualified
    let reason = "Qualified: ";
    if (s.trend > 70 && s.volume > 60) reason += "Strong momentum + rising volume detected";
    else if (s.volatility > 80) reason += "High volatility breakout conditions identified";
    else if (s.momentum > 60) reason += "Momentum spike detected";
    else reason += "Solid market setup";
    return {
      ...s,
      status: "Qualified",
      reasoning: reason,
      pipelineStep: 1,
    };
  });
}

// --- Market Template Selection ---
export function selectMarketType(signal: Signal): MarketType {
  if (signal.confidence > 80 && signal.volume > 70) return "CLOSE_PRICE";
  if (signal.volatility > 60) return "RANGE";
  return "YES_NO";
}

// --- Market Prioritization ---
export function assignTier(signal: Signal, pool: number, participants: number): MarketTier {
  if (signal.confidence > 90 && pool > 10000 && participants > 100) return "Elite";
  if (signal.confidence > 75 && pool > 5000) return "Hot";
  if (signal.confidence > 60) return "Active";
  return "Watch";
}

// --- Market Creation ---
export function createMarketFromSignal(signal: Signal, pool = 0, participants = 0): OrchestratedMarket {
  const type = selectMarketType(signal);
  const tier = assignTier(signal, pool, participants);
  const score = scoreSignal(signal);
  const market: OrchestratedMarket = {
    id: uuidv4(),
    pair: signal.asset,
    type,
    question: generateMarketQuestion(signal, type),
    options: generateMarketOptions(type),
    pool,
    participants,
    status: "CREATED",
    createdAt: Date.now(),
    closesAt: Date.now() + 60 * 60 * 1000, // 1h
    finalResult: undefined,
    resolvedAt: null,
    winners: [],
    payoutPerWinner: null,
    predictions: [],
    tier,
    signal,
    score,
    published: false,
  };
  return market;
}

function generateMarketQuestion(signal: Signal, type: MarketType): string {
  if (type === "YES_NO") return `Will ${signal.asset} go up in the next hour?`;
  if (type === "RANGE") return `Where will ${signal.asset} close?`;
  if (type === "CLOSE_PRICE") return `Predict the closing price of ${signal.asset}.`;
  return "";
}

function generateMarketOptions(type: MarketType): string[] {
  if (type === "YES_NO") return ["Yes", "No"];
  if (type === "RANGE") return ["Low", "Medium", "High", "Extreme"];
  if (type === "CLOSE_PRICE") return ["Enter Price"];
  return [];
}

// --- Market Quality Filters ---
export function filterMarkets(markets: OrchestratedMarket[]): OrchestratedMarket[] {
  const seen = new Set<string>();
  return markets.filter((m) => {
    if (m.signal.confidence < 40 || m.signal.risk > 70) return false;
    if (seen.has(m.pair)) return false;
    seen.add(m.pair);
    return true;
  });
}

// --- Market Publishing ---
export function publishMarket(market: OrchestratedMarket): OrchestratedMarket {
  return { ...market, published: true, status: "OPEN" };
}

// --- Live Monitoring ---
export function monitorMarket(market: OrchestratedMarket): OrchestratedMarket {
  // Simulate live updates
  const confidenceDelta = (Math.random() - 0.5) * 2;
  const participantDelta = Math.random() > 0.7 ? 1 : 0;
  const poolDelta = Math.random() > 0.6 ? Math.floor(Math.random() * 100) : 0;
  const newConfidence = Math.max(0, Math.min(100, market.signal.confidence + confidenceDelta));
  const newParticipants = market.participants + participantDelta;
  const newPool = market.pool + poolDelta;
  const newTier = assignTier({ ...market.signal, confidence: newConfidence }, newPool, newParticipants);
  return {
    ...market,
    signal: { ...market.signal, confidence: newConfidence },
    participants: newParticipants,
    pool: newPool,
    tier: newTier,
  };
}

// --- Orchestrator Pipeline ---
export function zinaxOrchestratorPipeline(): {
  signals: ZinaxSignal[];
  markets: OrchestratedMarket[];
  stats: ZinaxOrchestratorStats;
} {
  // SCAN
  let signals = scanSignals();
  // QUALIFY
  signals = qualifySignals(signals);
  // SCORE & PRIORITIZE
  const qualified = signals.filter((s) => s.status === "Qualified");
  const scored = qualified.map((s) => ({ signal: s, score: scoreSignal(s) }));
  scored.sort((a, b) => b.score - a.score);
  // SELECT TEMPLATE & CREATE
  let markets = scored.map(({ signal }) => {
    const m = createMarketFromSignal(signal);
    // Mark signal as MarketCreated
    signal.status = "MarketCreated";
    signal.pipelineStep = 2;
    signal.reasoning = "Market generated and published on Outdex";
    return m;
  });
  // FILTER
  markets = filterMarkets(markets);
  // PUBLISH
  markets = markets.map((m) => publishMarket(m));
  // MONITOR (simulate live)
  markets = markets.map((m) => monitorMarket(m));
  // Stats
  const stats: ZinaxOrchestratorStats = {
    totalScanned: signals.length,
    qualified: signals.filter((s) => s.status === "Qualified" || s.status === "MarketCreated").length,
    rejected: signals.filter((s) => s.status === "Rejected").length,
    marketsCreated: markets.length,
    eliteOpportunities: markets.filter((m) => m.tier === "Elite").length,
  };
  // (RESOLVE handled elsewhere)
  return { signals, markets, stats };
}
