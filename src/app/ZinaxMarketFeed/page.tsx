"use client";
import dynamic from "next/dynamic";

const ZinaxMarketFeed = dynamic(() => import("../enter-market/components/ZinaxMarketFeed"), { ssr: false });

export default function ZinaxMarketFeedPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-300">Zinax Market Feed</h1>
        <ZinaxMarketFeed />
      </div>
    </main>
  );
}
