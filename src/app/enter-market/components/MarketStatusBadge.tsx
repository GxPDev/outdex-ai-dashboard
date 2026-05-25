import React from "react";
import { MarketStatus } from "../logic/useSimulatedMarket";

const statusMap: Record<MarketStatus, { label: string; color: string }> = {
  OPEN: { label: "Live", color: "bg-green-600 text-white animate-pulse" },
  LOCKED: { label: "Locked", color: "bg-yellow-600 text-white" },
  RESOLVING: { label: "Resolving", color: "bg-blue-600 text-white animate-pulse" },
  RESOLVED: { label: "Resolved", color: "bg-zinc-700 text-blue-200" },
};

export function MarketStatusBadge({ status }: { status: MarketStatus }) {
  const { label, color } = statusMap[status];
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold shadow-sm ${color} transition-all duration-300`}
      style={{ minWidth: 70, display: "inline-block", textAlign: "center" }}
    >
      {label}
    </span>
  );
}
