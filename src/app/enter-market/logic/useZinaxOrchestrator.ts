// src/app/enter-market/logic/useZinaxOrchestrator.ts
import { useEffect, useState } from "react";

import {
  zinaxOrchestratorPipeline,
  OrchestratedMarket,
  ZinaxSignal,
  ZinaxOrchestratorStats
} from "./zinaxOrchestrator";

export function useZinaxOrchestratorFeed(refreshInterval = 5000) {
  const [signals, setSignals] = useState<ZinaxSignal[]>([]);
  const [markets, setMarkets] = useState<OrchestratedMarket[]>([]);
  const [stats, setStats] = useState<ZinaxOrchestratorStats | null>(null);

  useEffect(() => {
    const update = () => {
      const { signals, markets, stats } = zinaxOrchestratorPipeline();
      setSignals(signals);
      setMarkets(markets);
      setStats(stats);
    };
    update();
    const interval = setInterval(update, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { signals, markets, stats };
}
