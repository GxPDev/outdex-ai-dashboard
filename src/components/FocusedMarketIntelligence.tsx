import React from "react";

export default function FocusedMarketIntelligence() {
  return (
    <section className="w-full py-12 bg-white/80 dark:bg-black/60 backdrop-blur rounded-2xl shadow-lg my-8 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Focused Market Intelligence
      </h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl w-full">
        {/* Example intelligence icons/info - replace with real data as needed */}
        <div className="flex flex-col items-center">
          <span className="bg-gradient-to-tr from-blue-500 to-cyan-400 text-white rounded-full p-4 mb-2 shadow-lg">
            {/* Example icon (replace with SVG or image) */}
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="currentColor" /></svg>
          </span>
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">AI Insights</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Real-time signal analysis</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-gradient-to-tr from-purple-500 to-pink-400 text-white rounded-full p-4 mb-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="currentColor" /></svg>
          </span>
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">Market Coverage</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">100+ assets tracked</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-gradient-to-tr from-green-500 to-lime-400 text-white rounded-full p-4 mb-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M8 24L24 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
          </span>
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">Actionable Alerts</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Instant trade signals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-full p-4 mb-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" /></svg>
          </span>
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">24/7 Monitoring</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Always-on intelligence</span>
        </div>
      </div>
    </section>
  );
}
