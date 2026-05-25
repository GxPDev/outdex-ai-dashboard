"use client";

import { useEffect, useState } from "react";

export default function LiveStats() {
  const [signals, setSignals] = useState(1585);

  // simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-500">

      <div>
        <span className="font-semibold text-slate-900">{signals.toLocaleString()}</span>{" "}
        signals today
      </div>

      <div>
        <span className="font-semibold text-slate-900">$420K+</span> volume
      </div>

      <div>
        <span className="font-semibold text-slate-900">12K+</span> predictions
      </div>

      <div>
        <span className="font-semibold text-green-600 animate-pulse">92%</span> accuracy
      </div>

    </div>
  );
}
