"use client";

import { useEffect, useState } from "react";

type SignalCardProps = {
  asset: string;
  pair: string;
  timeframe: string;
  title: string;
  confidence: number;
  direction: "YES" | "NO";
  pool: number;
  traders: number;
  entryCloseTime: number; // timestamp (ms)
  entryProgress: number; // 0–100
  tags: string[];
};

export default function SignalCard({
  asset,
  pair,
  timeframe,
  title,
  confidence,
  direction,
  pool,
  traders,
  entryCloseTime,
  entryProgress,
  tags,
}: SignalCardProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = entryCloseTime - Date.now();

      if (diff <= 0) {
        setTimeLeft("Closed");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (h > 0) {
        setTimeLeft(`Closing in ${h}h ${m}m`);
      } else {
        setTimeLeft(`Closing in ${m}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [entryCloseTime]);

  const urgencyColor =
    timeLeft.includes("m") && !timeLeft.includes("h")
      ? "text-red-400"
      : timeLeft.includes("h") && parseInt(timeLeft) <= 3
      ? "text-yellow-400"
      : "text-white/50";

  return (
    <div
      className="p-5 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition cursor-pointer"
    >
      {/* TOP */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-white/60">
          {asset} / {pair} • {timeframe}
        </div>
        {/* Optional sparkline placeholder */}
        <div className="w-16 h-6 bg-white/5 rounded-md"></div>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* TAGS */}
      <div className="flex gap-2 text-xs mb-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`
              px-2 py-0.5 rounded-full
              ${
                tag === "High Confidence"
                  ? "bg-green-500/10 text-green-400"
                  : tag === "New"
                  ? "bg-blue-500/10 text-blue-400"
                  : tag === "Closing Soon"
                  ? "bg-red-500/10 text-red-400 animate-pulse"
                  : "bg-white/10 text-white/60"
              }
            `}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* PROBABILITY */}
      <div className="text-2xl font-bold mb-2">
        {direction} {confidence}%
      </div>

      {/* POOL */}
      <div className="mb-2">
        <span className="text-lg font-semibold text-white">
          ${Math.round(pool / 1000)}K
        </span>
        <span className="text-white/50 text-sm">
          {" "}
          • {traders} traders
        </span>
      </div>

      {/* URGENCY */}
      <div className={`text-sm mb-3 ${urgencyColor}`}>
        {timeLeft}
      </div>

      {/* ENTRY BAR */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
          style={{ width: `${entryProgress}%` }}
        />
      </div>

      {/* CTA */}
      <button
        className="
          w-full py-2 rounded-lg
          bg-gradient-to-r from-blue-600 to-blue-500
          hover:from-blue-500 hover:to-blue-400
          transition text-sm font-medium
        "
      >
        Enter Market →
      </button>
    </div>
  );
}
