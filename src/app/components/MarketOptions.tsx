import React from "react";
import { Market } from "../types/market";

const MarketOptions = ({ markets, onSelect }: { markets: Market[]; onSelect: (market: Market) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {markets.map((market) => (
      <button key={market.id} onClick={() => onSelect(market)} className="focus:outline-none">
        <div className="hover:shadow-lg transition">
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <div className="font-semibold text-blue-700">{market.name}</div>
            <div className="text-xs text-gray-500">{market.description}</div>
          </div>
        </div>
      </button>
    ))}
  </div>
);

export default MarketOptions;
