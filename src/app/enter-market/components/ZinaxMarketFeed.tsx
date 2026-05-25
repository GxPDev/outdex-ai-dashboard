// src/app/enter-market/components/ZinaxMarketFeed.tsx

import React, { useMemo } from "react";
import { useZinaxOrchestratorFeed } from "../logic/useZinaxOrchestrator";
import { OrchestratedMarket, ZinaxSignal, ZinaxOrchestratorStats } from "../logic/zinaxOrchestrator";
import { motion, AnimatePresence } from "framer-motion";


export default function ZinaxMarketFeed() {
  const { signals, markets, stats } = useZinaxOrchestratorFeed(2500);

  // For live scanning pulse
  const scanningCount = signals.filter(s => s.status === "Scanning").length;
  const qualifiedCount = signals.filter(s => s.status === "Qualified").length;
  const rejectedCount = signals.filter(s => s.status === "Rejected").length;
  const marketCreatedCount = signals.filter(s => s.status === "MarketCreated").length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* System Stats */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow">
        <Stat label="Signals Scanned" value={stats?.totalScanned ?? scanningCount} pulse={scanningCount > 0} />
        <Stat label="Qualified" value={stats?.qualified ?? qualifiedCount} />
        <Stat label="Rejected" value={stats?.rejected ?? rejectedCount} />
        <Stat label="Markets Created" value={stats?.marketsCreated ?? marketCreatedCount} />
        <Stat label="Elite" value={stats?.eliteOpportunities ?? 0} highlight />
      </div>

      {/* Pipeline Feed */}
      <div className="space-y-4">
        {signals.map((signal) => (
          <SignalPipelineCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, pulse, highlight }: { label: string; value: number; pulse?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex flex-col items-center min-w-[90px] ${highlight ? "text-blue-300 font-bold" : "text-zinc-200"}`}>
      <span className={`text-lg font-mono ${pulse ? "animate-pulse text-green-400" : ""}`}>{value}</span>
      <span className="text-xs text-zinc-400 mt-1">{label}</span>
    </div>
  );
}

function SignalPipelineCard({ signal }: { signal: ZinaxSignal }) {
  // Visuals by status
  const statusColor =
    signal.status === "Rejected"
      ? "bg-zinc-800/60 border-zinc-800 text-zinc-500 opacity-60"
      : signal.status === "MarketCreated"
      ? "bg-gradient-to-r from-blue-900/80 to-blue-800/60 border-blue-700 text-blue-100 shadow-lg ring-2 ring-blue-600/30"
      : signal.status === "Qualified"
      ? "bg-zinc-900/80 border-green-800 text-green-200"
      : "bg-zinc-900/70 border-zinc-800 text-zinc-200";

  const icon =
    signal.status === "Rejected"
      ? "🚫"
      : signal.status === "MarketCreated"
      ? "✅"
      : signal.status === "Qualified"
      ? "🔎"
      : "🟢";

  // Pipeline steps
  const steps = [
    { label: "Scanning", active: signal.pipelineStep === 0 },
    { label: signal.status === "Rejected" ? "Rejected" : "Qualified", active: signal.pipelineStep === 1 },
    { label: signal.status === "MarketCreated" ? "Market Created" : "", active: signal.pipelineStep === 2 },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`relative border rounded-xl px-5 py-4 flex flex-col gap-2 transition-all duration-300 ${statusColor}`}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{icon}</span>
        <span className="font-mono text-xs tracking-wide uppercase text-zinc-400">{signal.assetClass}</span>
        <span className="font-bold text-base text-blue-200">{signal.asset}</span>
        <span className="ml-auto text-xs font-mono text-zinc-500">{signal.status}</span>
      </div>
      <div className="flex gap-4 text-xs">
        <span>Volatility: <span className="font-mono">{signal.volatility.toFixed(1)}</span></span>
        <span>Trend: <span className="font-mono">{signal.trend.toFixed(1)}</span></span>
        <span>Momentum: <span className="font-mono">{signal.momentum.toFixed(1)}</span></span>
        <span>Volume: <span className="font-mono">{signal.volume.toFixed(1)}</span></span>
        <span>Risk: <span className="font-mono">{signal.risk.toFixed(1)}</span></span>
        <span>Confidence: <span className="font-mono text-blue-400">{signal.confidence.toFixed(1)}%</span></span>
      </div>
      <div className="text-xs mt-1 italic text-zinc-400">{signal.reasoning}</div>
      {/* Pipeline steps */}
      <div className="flex gap-2 mt-2">
        {steps.map((step, i) =>
          step.label ? (
            <span
              key={step.label}
              className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                step.active
                  ? "bg-blue-700 text-blue-100 shadow"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {step.label}
            </span>
          ) : null
        )}
      </div>
    </motion.div>
  );
}

function ZinaxMarketCard({ market }: { market: OrchestratedMarket }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 shadow-lg flex flex-col gap-2 relative">
      <div className="absolute right-4 top-4 text-2xl">
        {market.tier === "Elite" && <span title="Elite">💎</span>}
        {market.tier === "Hot" && <span title="Hot">🔥</span>}
        {market.tier === "Active" && <span title="Active">⚡</span>}
        {market.tier === "Watch" && <span title="Watch">👀</span>}
      </div>
      <div className="text-xs text-zinc-400 mb-1">{market.signal.assetClass.toUpperCase()}</div>
      <div className="text-lg font-bold text-blue-200 mb-1">{market.question}</div>
      <div className="flex gap-4 text-sm text-zinc-300">
        <span>Confidence: <span className="font-mono text-blue-400">{market.signal.confidence.toFixed(1)}%</span></span>
        <span>Volatility: <span className="font-mono">{market.signal.volatility.toFixed(1)}</span></span>
        <span>Risk: <span className="font-mono text-red-400">{market.signal.risk.toFixed(1)}</span></span>
        <span>Volume: <span className="font-mono">{market.signal.volume.toFixed(1)}</span></span>
      </div>
      <div className="flex gap-4 text-xs text-zinc-500 mt-1">
        <span>Pool: <span className="font-mono">{market.pool}</span></span>
        <span>Participants: <span className="font-mono">{market.participants}</span></span>
        <span>Tier: <span className="font-mono">{market.tier}</span></span>
      </div>
      <div className="text-xs text-zinc-400 mt-2">AI Score: <span className="font-mono text-green-400">{market.score.toFixed(1)}</span></div>
      <div className="text-xs text-zinc-500 mt-1">Signal: {market.signal.asset} | Trend: {market.signal.trend.toFixed(1)} | Momentum: {market.signal.momentum.toFixed(1)}</div>
    </div>
  );
}
