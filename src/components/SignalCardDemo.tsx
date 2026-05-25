"use client";
import { useAnimatedNumber } from "./useAnimatedNumber";

export default function SignalCardDemo() {
  // Example: animate confidence and pool values
  const animatedConfidence = useAnimatedNumber(72); // Replace 72 with dynamic value if needed
  const animatedPool = useAnimatedNumber(120000); // $120K
  return (
    <div className="
      p-5 rounded-xl
      bg-[#111827]/60 backdrop-blur-md
      border border-white/10
      hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]
      transition
    ">
      {/* HEADER */}
      <div className="text-sm text-white/50 mb-1">
        BTC / USDT • 24H
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-2">
        Breakout Momentum
      </h3>

      {/* TAGS (MINIMAL) */}
      <div className="flex gap-3 text-xs mb-3">
        <span className="text-green-400">● High Confidence</span>
        <span className="text-blue-400">● New</span>
      </div>

      {/* MAIN SIGNAL */}
      <div className="text-2xl font-bold mb-2">
        YES <span className="text-white">{animatedConfidence}%</span>
      </div>

      {/* POOL */}
      <div className="text-sm text-white/60 mb-2">
        <span className="text-white font-medium">${animatedPool.toLocaleString()}</span> • 2.1K traders
      </div>

      {/* URGENCY */}
      <div className="text-sm text-red-400 mb-3 animate-pulse">
        ● Closing in 44m
      </div>

      {/* PROGRESS */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[70%]" />
      </div>

      {/* CTA */}
      <button className="
        w-full py-2 rounded-lg
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-500 hover:to-blue-400
        hover:scale-[1.02]
        shadow-[0_0_20px_rgba(59,130,246,0.3)]
        transition text-sm font-medium
      ">
        Enter Market →
      </button>
    </div>
  );
}
