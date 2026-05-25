

import { formatTime } from "../utils/formatTime";
import { formatPool } from "../utils/formatPool";
import type { Market } from "../types/market";
import { MarketStatus } from "../logic/useSimulatedMarket";
import { MarketStatusBadge } from "./MarketStatusBadge";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
// Generate dynamic AI reasoning for a market
function useZinaxReasoning(market: any) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3500 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [market.id]);
  return useMemo(() => {
    const reasons: string[] = [];
    if (market.status === "RESOLVING") return "Zinax is analyzing final outcome...";
    if (market.status === "RESOLVED") return "Market closed. Awaiting next opportunity.";
    if ((market.confidence ?? 0) > 90) reasons.push("AI confidence boosted by strong trend behavior");
    if ((market.confidence ?? 0) > 80) reasons.push("Zinax detected breakout momentum + rising volume");
    if ((market.confidence ?? 0) > 70) reasons.push("High volatility detected near resistance");
    if ((market.confidence ?? 0) > 60) reasons.push("Moderate trend with above-average volume");
    if ((market.confidence ?? 0) <= 60) reasons.push("Low conviction: market signals mixed");
    if ((market.risk ?? "") === "High") reasons.push("Caution: High risk profile detected");
    if ((market.participants ?? 0) > 100) reasons.push("Surge in participant activity");
    if ((market.pool ?? 0) > 1_000_000) reasons.push("Premium pool attracting elite traders");
    // Add some random flavor
    const aiFlavors = [
      "Pattern recognition: bullish engulfing spotted",
      "Volume spike detected on recent tick",
      "AI monitoring for reversal signals",
      "No major anomalies detected",
      "Sentiment analysis: positive bias",
      "Watching for breakout confirmation",
      "AI scanning for arbitrage opportunities",
      "Volatility within expected range",
      "Order book depth increasing",
      "Momentum building on higher timeframe"
    ];
    if (Math.random() > 0.5) reasons.push(aiFlavors[Math.floor(Math.random() * aiFlavors.length)]);
    return reasons[Math.floor(tick % reasons.length)] || "Zinax is monitoring market conditions...";
  }, [market, tick]);
}


type MarketCardProps = { market: any };

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((prev) => {
        if (Math.abs(prev - value) < 0.5) return value;
        return prev + (value - prev) * 0.25;
      });
    }, 24);
    return () => clearInterval(id);
  }, [value]);
  return Math.round(display * 100) / 100;
}
export default function MarketCard({ market }: MarketCardProps) {
  // Zinax AI reasoning (must be inside the component to access the prop)
  const zinaxReasoning = useZinaxReasoning(market);
  const isOpen = market.status === "OPEN";
  const isLocked = market.status === "LOCKED";
  const isResolving = market.status === "RESOLVING";
  const isResolved = market.status === "RESOLVED";

  // Animated numbers
  const animatedConfidence = useAnimatedNumber(market.confidence ?? 0);
  const animatedParticipants = useAnimatedNumber(market.participants ?? 0);
  const animatedPool = useAnimatedNumber(market.pool ?? 0);

  // --- Tier logic ---
  let tier: 'Elite' | 'Hot' | 'Active' | 'Watch';
  if (animatedConfidence >= 90 || animatedPool >= 1_000_000) {
    tier = 'Elite';
  } else if (animatedConfidence >= 80 || animatedParticipants >= 100) {
    tier = 'Hot';
  } else if (animatedConfidence >= 65) {
    tier = 'Active';
  } else {
    tier = 'Watch';
  }

  // Tier badge and styles
  const tierConfig = {
    Elite: {
      badge: '💎 Elite',
      badgeClass: 'text-blue-400 font-bold animate-glow',
      cardClass: 'border-blue-500 shadow-[0_0_16px_2px_rgba(59,130,246,0.15)] ring-1 ring-blue-700/30 hover:shadow-blue-500/30',
      questionClass: 'text-2xl font-bold text-white drop-shadow-[0_1px_8px_rgba(59,130,246,0.25)]',
      poolClass: 'ml-auto px-3 py-1 rounded-lg bg-gradient-to-r from-blue-800/80 to-blue-600/80 text-blue-100 font-bold text-lg shadow-lg border border-blue-400/40',
    },
    Hot: {
      badge: '🔥 Hot',
      badgeClass: 'text-red-400 font-bold animate-pulse',
      cardClass: 'border-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.10)]',
      questionClass: 'text-xl font-semibold text-white',
      poolClass: 'ml-auto px-3 py-1 rounded-lg bg-gradient-to-r from-red-800/80 to-red-600/80 text-red-100 font-bold text-base border border-red-400/40',
    },
    Active: {
      badge: '⚡ Active',
      badgeClass: 'text-yellow-400 font-bold',
      cardClass: 'border-yellow-500 shadow-[0_0_8px_2px_rgba(250,204,21,0.10)]',
      questionClass: 'text-xl font-semibold text-white',
      poolClass: 'ml-auto px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-800/80 to-yellow-600/80 text-yellow-100 font-bold text-base border border-yellow-400/40',
    },
    Watch: {
      badge: '👀 Watch',
      badgeClass: 'text-zinc-500 font-semibold',
      cardClass: 'border-zinc-800',
      questionClass: 'text-lg font-medium text-zinc-200',
      poolClass: 'ml-auto px-3 py-1 rounded-lg bg-zinc-800 text-zinc-100 font-bold text-base border border-zinc-700',
    },
  }[tier];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`bg-zinc-900 border rounded-2xl p-4 space-y-3 transition-shadow relative ${tierConfig.cardClass} ${isOpen && tier === 'Hot' ? 'animate-pulse-slow' : ''}`}
      style={{ opacity: isLocked || isResolving ? 0.7 : 1, filter: isResolved ? 'grayscale(0.7)' : undefined }}
    >
      <div className="absolute right-4 top-4 z-10">
        <MarketStatusBadge status={market.status as MarketStatus} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {market.pair} <span className="mx-1">•</span> {formatTime(market.closesIn)}
        </p>
        <span className={`ml-2 text-xs flex items-center gap-1 ${tierConfig.badgeClass}`}>{tierConfig.badge}</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Zinax AI Reasoning */}
        <div className="text-xs text-blue-300/80 font-mono mt-2 mb-1 min-h-[1.5em]">
          <AnimatePresence mode="wait">
            <motion.span
              key={zinaxReasoning}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="block"
            >
              {zinaxReasoning}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className={tierConfig.questionClass}>
          {market.question}
        </div>
        <motion.div layout className={tierConfig.poolClass}>
          {formatPool(animatedPool)}
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-gray-400 flex items-center gap-1">
          {(() => {
            if (animatedConfidence >= 90) return <span className="text-blue-400 font-bold">💎 Elite</span>;
            if (animatedConfidence >= 80) return <span className="text-red-400">🔥 Hot</span>;
            if (animatedConfidence >= 65) return <span className="text-yellow-400">⚡ Active</span>;
            return <span className="text-zinc-500">👀 Watch</span>;
          })()} <span className="mx-1 text-gray-400">•</span> <motion.span layout>{animatedConfidence}%</motion.span>
        </span>
        <span className="text-gray-400">Risk: {market.risk}</span>
      </div>


      {/* YES_NO market: Yes/No buttons */}
      {market.type === "YES_NO" && market.options && !isResolved && (
        <div className="grid grid-cols-2 gap-2">
          {market.options.slice(0, 2).map((option: string) => (
            <button
              key={option}
              type="button"
              className={`bg-zinc-800 py-2 rounded-lg text-sm w-full transition-all duration-300 ${isOpen ? 'hover:bg-zinc-700 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
              disabled={!isOpen}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* RANGE market: 4 range options in a grid */}
      {market.type === "RANGE" && market.options && !isResolved && (
        <div className="grid grid-cols-2 gap-2">
          {market.options.map((option: string) => (
            <button
              key={option}
              type="button"
              className={`bg-zinc-800 py-2 rounded-lg text-sm w-full transition-all duration-300 ${isOpen ? 'hover:bg-zinc-700 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
              disabled={!isOpen}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* CLOSE_PRICE market: show current price, numeric input, and helper text */}
      {market.type === "CLOSE_PRICE" && !isResolved && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Current price:</span>
            <span className="text-sm font-mono text-blue-300">{market.currentPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <input
            type="number"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your prediction"
            disabled={!isOpen}
          />
          {market.helperText && (
            <div className="text-xs text-gray-400 text-center pt-1">{market.helperText}</div>
          )}
        </div>
      )}

      {/* RESOLVING state: show loading spinner */}
      {isResolving && (
        <div className="flex justify-center items-center py-6">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></span>
        </div>
      )}

      {/* RESOLVED state: show result summary */}
      {isResolved && (
        <div className="flex flex-col items-center py-4 bg-gradient-to-br from-blue-900/60 to-blue-700/40 rounded-xl shadow-inner border border-blue-800 px-4">
          <span className="text-lg font-bold text-blue-200 drop-shadow mb-1">
            Final Result: <span className="text-blue-300">{String(market.finalResult)}</span>
          </span>
          {market.winners && market.winners.length > 0 ? (
            <>
              <span className="text-sm text-green-300 font-semibold mt-1">{market.winners.length} Winner{market.winners.length > 1 ? 's' : ''}</span>
              <span className="text-xs text-green-200 mt-0.5">Payout: <span className="font-mono">{market.payoutPerWinner}</span> ODX</span>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {market.winners.slice(0, 5).map((uid: string, i: number) => (
                  <span key={uid} className="bg-green-900/60 text-green-200 text-[10px] px-2 py-0.5 rounded-full font-mono shadow-sm">{uid.slice(0, 6)}…</span>
                ))}
                {market.winners.length > 5 && (
                  <span className="text-xs text-green-400 ml-1">+{market.winners.length - 5} more</span>
                )}
              </div>
            </>
          ) : (
            <span className="text-xs text-red-300 mt-1">No winners</span>
          )}
          <span className="text-xs text-gray-400 mt-2">Resolved at: {market.resolvedAt ? new Date(market.resolvedAt).toLocaleString() : '—'}</span>
        </div>
      )}

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>
          {isResolved ? 'Closed' : `Closes in ${formatTime(market.closesIn)}`}
        </span>
        <motion.span layout>{animatedParticipants} participants</motion.span>
      </div>

    </motion.div>
  );
}
