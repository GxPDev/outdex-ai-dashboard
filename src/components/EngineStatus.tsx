"use client";

import { useEffect, useState } from "react";

export default function EngineStatus() {
  // No need for index state, message is static
  const [count, setCount] = useState(1284);

  // No rotation needed for static message

  // Fake live counter (replace later with real backend)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="flex flex-col gap-1 mb-5">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        AI engine active — tracking global financial markets
      </div>

      {/* LIVE METRIC */}
      <div className="text-xs text-slate-400 pl-4">
        {count.toLocaleString()} signals processed today
      </div>

    </div>
  );
}
