import React, { useEffect, useRef, useState } from "react";
import type { ActivityEvent } from "../logic/useSimulatedMarket";

export default function ActivityTicker({ events }: { events: ActivityEvent[] }) {
  const [visibleEvents, setVisibleEvents] = useState<ActivityEvent[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length === 0) return;
    setVisibleEvents((prev) => {
      const lastId = prev[prev.length - 1]?.id;
      if (lastId !== events[events.length - 1].id) {
        return [...prev.slice(-4), events[events.length - 1]];
      }
      return prev;
    });
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
