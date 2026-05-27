import React, { useRef, useMemo } from "react";
import type { ActivityEvent } from "../logic/useSimulatedMarket";

export default function ActivityTicker({ events }: { events: ActivityEvent[] }) {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Derive visible events directly from incoming `events` to avoid
  // calling setState synchronously inside effects (lint rule).
  const visibleEvents = useMemo(() => {
    if (events.length === 0) return [] as ActivityEvent[];
    // Keep the most recent event and a small history for the ticker.
    return events.slice(-5);
  }, [events]);

  return (
    <div className="overflow-x-auto whitespace-nowrap mb-4">
      <div
        ref={tickerRef}
        className="flex gap-4 items-center text-sm text-blue-200 font-mono animate-marquee"
        style={{ minHeight: 32 }}
      >
        {visibleEvents.map((event) => (
            <span key={event.id + '-' + event.timestamp} className="bg-zinc-800 rounded px-2 py-1 shadow border border-zinc-700/60 transition-all duration-300">
            {event.message}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
