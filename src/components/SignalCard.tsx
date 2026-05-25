
"use client";

// Map confidence value to label and color
export function getConfidenceLevel(confidence: number) {
  if (confidence < 60) {
    return { label: "Low Confidence", color: "text-red-400" };
  }
  if (confidence < 70) {
    return { label: "Moderate Confidence", color: "text-yellow-400" };
  }
  if (confidence < 85) {
    return { label: "High Confidence", color: "text-green-400" };
  }
  return { label: "Very High Confidence", color: "text-green-300" };
}

// Compute confidence from price history
export function computeConfidence(prices: number[]) {
  const n = prices.length;
  const first = prices[0];
  const last = prices[n - 1];
  const slope = Math.abs((last - first) / first);
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const volatility = (max - min) / min;
  // normalize
  let confidence = slope * 100 + volatility * 50;
  return Math.min(95, Math.max(50, Math.round(confidence)));
}
// Utility to get sparkline style from type, confidence, direction
export function getSparklineStyle(signalType: string, confidence: number, direction?: string) {
  const baseColor =
    direction === "bull"
      ? "#22c55e"
      : direction === "bear"
      ? "#ef4444"
      : "#3b82f6";
  const opacity = confidence > 75 ? 1 : 0.7;
  return {
    stroke: baseColor,
    strokeWidth: signalType === "trend" ? 2.5 : 2,
    opacity,
    curve: signalType === "breakout" ? "linear" : "monotone",
  };
}
// Detect signal type from price history
export function detectSignalType(prices: number[]) {
  const n = prices.length;
  const first = prices[0];
  const last = prices[n - 1];
  // 1. TREND (directional slope)
  const slope = (last - first) / n;
  // 2. VOLATILITY (range of movement)
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const volatility = (max - min) / min;
  // 3. BREAKOUT (recent acceleration)
  const recent = prices.slice(-5);
  const prev = prices.slice(-10, -5);
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const prevAvg = prev.length > 0 ? prev.reduce((a, b) => a + b, 0) / prev.length : recentAvg;
  const acceleration = (recentAvg - prevAvg) / prevAvg;
  // DECISION
  if (Math.abs(acceleration) > 0.02 && volatility > 0.01) {
    return "breakout";
  }
  if (Math.abs(slope) > 0.5) {
    return "trend";
  }
  return "range";
}
// Color logic for sparkline based on confidence and direction
const getColor = (confidence: number, direction?: string) => {
  if (direction === "bull") {
    return confidence > 75 ? "#22c55e" : "#4ade80";
  }
  if (direction === "bear") {
    return confidence > 75 ? "#ef4444" : "#f87171";
  }
  return "#3b82f6";
};
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimatedNumber } from "./useAnimatedNumber";
import { FaArrowRight } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import Sparkline from "./Sparkline";
import { AnimatedPercent, AnimatedMoney } from "./AnimatedNumber";

const assetIcons: Record<string, React.ReactElement> = {
  btc: <img src="/icons/btc.svg" alt="BTC" className="w-5 h-5" />,
  eth: <img src="/icons/eth.svg" alt="ETH" className="w-5 h-5" />,
  gold: <img src="/icons/gold.svg" alt="Gold" className="w-5 h-5" />,
  usdjpy: <img src="/icons/usdjpy.svg" alt="USDJPY" className="w-5 h-5" />,
  eurusd: <img src="/icons/eurusd.svg" alt="EURUSD" className="w-5 h-5" />,
  tsla: <img src="/icons/tsla.svg" alt="TSLA" className="w-5 h-5" />,
};

// Fallback chart data if no prices are available
const initialChart = [100, 102, 101, 103, 104, 106, 105, 107, 108, 110];

export type Signal = {
  pair: string;
  timeframe: string;
  type: string;
  confidence: number;
  bias: "bullish" | "bearish";
  volume: number;
  traders: number;
  closingIn: string;
  entryWindow: number; // Percentage of entry window filled
  prices?: number[]; // Optional prices property for live price updates
};

export default function SignalCard({ signal: initialSignal, icon }: { signal: Signal, icon?: React.ReactNode }) {
  const [signal, setSignal] = useState<Signal>(initialSignal);
  if (!signal || typeof signal !== 'object') return null;
  // Fallbacks for missing fields
  const pair = signal.pair;
  const timeframe = signal.timeframe;
  const type = signal.type;
  const confidence = signal.confidence;
  const bias = signal.bias;
  const volume = signal.volume;
  const traders = signal.traders;
  const closingIn = signal.closingIn;
  const entryWindow = typeof signal.entryWindow === "number" ? signal.entryWindow : 0;

  // Fetch and update prices every 2s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/prices?symbol=${signal.pair}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.prices)) {
          setSignal(prev => ({
            ...prev,
            prices: data.prices,
          }));
        }
      } catch (e) {
        // Optionally handle error
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [signal.pair]);
  // Tag color map
  const tagColors: Record<string, string> = {
    'High Confidence': 'text-green-400',
    'New': 'text-blue-400',
    'Trending': 'text-purple-400',
    'Closing Soon': 'text-red-400',
  };

  // Compute tags based on signal properties (single declaration)
  const tags: string[] = [];
  if (confidence >= 80) tags.push('High Confidence');
  if (type && type.toLowerCase().includes('trend')) tags.push('Trending');
  if (closingIn && typeof closingIn === 'string' && closingIn.toLowerCase().includes('min')) tags.push('Closing Soon');
  // You can add more tag logic as needed

  return (
    <div
      className="relative rounded-xl bg-[#111827]/60 border border-white/10 p-6 overflow-hidden flex flex-col min-h-[320px] transition-all backdrop-blur-md hover:shadow-[0_4px_32px_rgba(59,130,246,0.18)] hover:scale-[1.015] cursor-pointer"
      style={{ background: '#11182799' }}
    >
      {/* 1. Pair + timeframe */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-medium text-white/40 tracking-wide uppercase">{pair} • {timeframe}</span>
      </div>

      {/* 2. Signal type */}
      <div className="text-lg font-bold mb-1 text-white leading-tight">
        {type}
      </div>

      {/* 3. Tags (minimal, dot + color, no pills) */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-2">
          {tags.map((tag: string) => (
            <span key={tag} className={`text-xs font-semibold flex items-center gap-1 ${tag === 'High Confidence' ? 'text-green-400' : tag === 'New' ? 'text-blue-400' : tag === 'Trending' ? 'text-purple-400' : 'text-white/40'}`}>
              <span className="text-[10px]">{tag === 'High Confidence' ? '●' : '·'}</span> {tag}
            </span>
          ))}
        </div>
      )}

      {/* 4. Sparkline (mini chart) */}
      <motion.div
        className="mb-3 mt-1 opacity-90 hover:opacity-100 transition-all duration-300"
        style={{
          filter: (() => {
            const prices = Array.isArray(signal.prices) && signal.prices.length > 0 ? signal.prices : initialChart;
            const direction = prices[prices.length - 1] > prices[0] ? "bull" : "bear";
            return `drop-shadow(0 0 6px ${getSparklineStyle(
              detectSignalType(prices),
              signal.confidence,
              direction
            ).stroke}99)`;
          })()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {(() => {
          const prices = Array.isArray(signal.prices) && signal.prices.length > 0 ? signal.prices : initialChart;
          const signalType = detectSignalType(prices);
          const confidence = computeConfidence(prices);
          const direction = prices[prices.length - 1] > prices[0] ? "bull" : "bear";
          const style = getSparklineStyle(signalType, confidence, direction);
          return (
            <>
              <Sparkline
                prices={prices}
                color={style.stroke}
                type={style.curve as "linear" | "monotone"}
                strokeWidth={style.strokeWidth}
                opacity={style.opacity}
                strokeDasharray={signalType === "breakout" ? "0" : "3 3"}
                signalType={signalType}
              />
              <div className={`mt-1 text-xs font-bold uppercase tracking-wide ${direction === "bull" ? "text-green-400" : "text-red-400"}`}
                style={{ letterSpacing: '0.08em' }}>
                {direction === "bull" ? "Bullish" : "Bearish"}
              </div>
            </>
          );
        })()}
      </motion.div>


      {/* 5. Main signal (confidence, large) */}
      <div className="flex flex-col items-start gap-1 mb-3">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-white leading-none">
            <AnimatedPercent value={confidence} />
          </span>
        </div>
        {(() => {
          const { label, color } = getConfidenceLevel(confidence);
          return (
            <span className={`text-xs font-semibold tracking-wide ${color}`}>
              ● {label}
            </span>
          );
        })()}
      </div>

      {/* 6. Volume + traders */}
      <div className="flex items-center gap-3 text-sm mb-2 text-white/70">
        <span className="font-bold text-white/90">${volume.toLocaleString()}K</span>
        <span className="text-white/50">•</span>
        <span className="font-bold text-white/80">{traders} traders</span>
      </div>

      {/* 7. Urgency (always show time, red dot) */}
      <div className="flex items-center gap-2 text-xs mb-2">
        <span className="flex items-center gap-1 text-red-400 font-semibold">
          <span className="text-[10px]">●</span>
          <span>Closing in</span>
          <span className="font-bold text-white ml-1">{closingIn}</span>
        </span>
      </div>

      {/* 8. Entry status (choose one format, here: Entry filling) */}
      <div className="flex items-center gap-2 text-xs mb-2">
        <span className="font-bold text-white/80">{entryWindow}%</span>
        <span className="font-bold text-white/80">{signal.entryWindow}%</span>
      </div>

      {/* 9. Progress bar (subtle, smooth) */}
      <div className="flex items-center gap-2 text-xs mb-2">
        <div className="w-28 h-2 bg-white/10 rounded overflow-hidden">
          <div
            style={{ width: `${signal.entryWindow}%` }}
          ></div>
        </div>
      </div>

      {/* 10. CTA button (primary action) */}
      <button className="mt-4 w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-[0_0_16px_2px_rgba(59,130,246,0.4)] hover:scale-[1.03] border-none active:scale-[0.98] focus:outline-none">
        Enter Market <FaArrowRight />
      </button>
    </div>
  );
}
