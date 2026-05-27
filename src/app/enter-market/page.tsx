
"use client";
import TopBar from "./components/TopBar";
import ZinaxStatus from "./components/ZinaxStatus";
import SectionHeader from "./components/SectionHeader";
import SimulatedMarketOptions from "./components/SimulatedMarketOptions";
import ActivityTicker from "./components/ActivityTicker";
import Timer from "./components/Timer";
import { mockMarkets } from "../data/mockMarkets";
import { useRef, useState } from "react";
import type { ActivityEvent } from "./logic/useSimulatedMarket";


export default function EnterMarketPage() {
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>([]);
  const handleActivity = (event: ActivityEvent) => {
    setActivityEvents((prev) => [...prev.slice(-9), event]);
  };
  return (
    <main className="min-h-screen bg-[#101014] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <TopBar />
        <ZinaxStatus />
        <ActivityTicker events={activityEvents} />
        <div className="flex items-center justify-between">
          <SectionHeader
            title="Live Markets"
            subtitle="AI-generated markets ready for participation"
          />
          <Timer />
        </div>
        <SimulatedMarketOptions
          initialMarkets={mockMarkets.map((m) => ({
            ...m,
            pool: (m as any).pool ?? 10000,
          }))}
          onActivity={handleActivity}
        />
        <footer className="pt-8 text-center text-zinc-500 text-xs">
          Outdex &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}
