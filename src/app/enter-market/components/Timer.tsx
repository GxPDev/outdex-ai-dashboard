"use client";
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(sec: number) {
    if (sec >= 3600) {
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    } else if (sec >= 60) {
      const m = Math.floor(sec / 60);
      return `${m}m`;
    } else {
      return `${sec}s`;
    }
  }

  return <span className="text-xs text-zinc-500">Updated {formatTime(seconds)} ago</span>;
}
