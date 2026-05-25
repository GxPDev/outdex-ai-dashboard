
"use client";
import { useEffect, useState } from "react";
// Utility to format time ago for the header
function formatPanelTimeAgo(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 10) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}
import { motion } from "framer-motion";
import MiniChart from "./MiniChart";
import EngineStatus from "./EngineStatus";

function formatTimeAgo(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// ...existing code...

type Signal = {
  asset: string;
  title: string;
  prob: string;
  label: string;
  trend: "flat" | "up" | "down";
  timestamp: number;
  chart?: number[];
};

const signals: Signal[] = [
  {
    asset: "EUR/USD",
    title: "Breakout pressure",
    prob: "68%",
    label: "High Confidence",
    trend: "up",
    timestamp: Date.now() - 2 * 60 * 1000,
  },
  {
    asset: "BTC",
    title: "Momentum acceleration",
    prob: "72%",
    label: "High Confidence",
    trend: "up",
    timestamp: Date.now() - 3 * 60 * 1000,
  },
  {
    asset: "NVDA",
    title: "Sentiment surge",
    prob: "64%",
    label: "Emerging",
    trend: "up",
    timestamp: Date.now() - 5 * 60 * 1000,
  },
  {
    asset: "Gold",
    title: "Range compression",
    prob: "58%",
    label: "Speculative",
    trend: "flat",
    timestamp: Date.now() - 8 * 60 * 1000,
  },
];

export default function SignalPanel() {
  const [liveSignals, setLiveSignals] = useState(signals);
  const [now, setNow] = useState(Date.now());
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate panel update every 30s (or tie to real data update)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update the 'now' timer every 10s for live label
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  // List of possible assets and chart data
  const assetOptions = [
    { asset: "BTC", title: "Volatility spike" },
    { asset: "ETH", title: "Liquidity surge" },
    { asset: "EUR/USD", title: "Breakout pressure" },
    { asset: "NVDA", title: "Sentiment surge" },
    { asset: "Gold", title: "Range compression" },
    { asset: "AAPL", title: "Momentum build" },
    { asset: "TSLA", title: "Volume spike" },
    { asset: "JPY/USD", title: "Trend reversal" },
  ];

  function randomChartData() {
    // Generate 8 random y values between 4 and 20 for sparkline
    return Array.from({ length: 8 }, () => 4 + Math.round(Math.random() * 16));
  }

  useEffect(() => {
    const nowInterval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    const signalInterval = setInterval(() => {
      const assetIdx = Math.floor(Math.random() * assetOptions.length);
      const { asset, title } = assetOptions[assetIdx];
      const trends: Array<"flat" | "up" | "down"> = ["flat", "up", "down"];
      const newSignal: Signal = {
        asset,
        title,
        prob: `${60 + Math.floor(Math.random() * 20)}%`,
        label: ["Emerging", "High Confidence", "Speculative"][Math.floor(Math.random() * 3)],
        trend: trends[Math.floor(Math.random() * trends.length)],
        timestamp: Date.now(),
        chart: randomChartData(),
      };
      setLiveSignals((prev) => [newSignal, ...prev.slice(0, 3)]);
    }, 15000);

    return () => {
      clearInterval(nowInterval);
      clearInterval(signalInterval);
    };
  }, []);

  return (
    <div className="w-full rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">Live Signal Scan</span>
          <span className="text-blue-600">● Live</span>
        </div>
        <span className="text-xs text-slate-400">
          Updated {formatPanelTimeAgo(lastUpdate)}
        </span>
      </div>
      <div className="space-y-5">
        {liveSignals.map((s, i) => {
          // Use s.chart if present, otherwise fallback to a static chart for initial signals
          const chartData = s.chart || [20, 12, 16, 8, 14, 6, 12, 4];
          const points = chartData.map((y: number, idx: number) => `${idx * 7},${24 - y}`).join(" ");
          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={i}
              className={`
                flex flex-col gap-1 rounded-3xl px-6 py-5
                border border-slate-100 transition
                ${i === 0
                  ? "bg-white shadow-md scale-[1.02]"
                  : "bg-slate-50/70 opacity-90"}
              `}
            >
              <div className="flex items-center justify-between gap-4">
                {/* LEFT */}
                <div className="flex flex-col min-w-[90px]">
                  <p className="text-sm font-semibold text-slate-900">{s.asset}</p>
                  <p className="text-sm text-slate-500">{s.title}</p>
                </div>

                {/* MIDDLE: MiniChart */}
                <div className="flex-1 flex justify-center">
                  <MiniChart trend={s.trend} delay={i * 0.2} />
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end min-w-[90px]">
                  <p className="text-sm font-semibold text-slate-900">{s.prob}</p>
                  <p className="text-xs text-green-600">{s.label}</p>
                  <span className="text-xs text-slate-400 mt-1">
                    {mounted ? formatTimeAgo(s.timestamp) : "—"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
