"use client";

import { useEffect, useRef } from "react";

export default function TradingViewChart({
  symbol = "FX:EURUSD",
}: {
  symbol?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      backgroundColor: "rgba(0,0,0,0)",
      gridColor: "rgba(255,255,255,0.05)",
      allow_symbol_change: true,
    });

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="w-full h-[320px] rounded-xl overflow-hidden border border-white/10">
      <div ref={container} className="h-full w-full" />
    </div>
  );
}
