import React from "react";
import { Market } from "../types/market";

const MarketCard = ({ market }: { market: Market }) => (
  <div className="rounded-lg bg-white shadow p-4 flex flex-col gap-2 border border-gray-100">
    <div className="font-bold text-lg text-blue-700">{market.id}</div>
    {/* Description property does not exist on Market type */}
    {/* <div className="text-xs text-gray-400 mt-1">{market.status}</div> */}
  </div>
);

export default MarketCard;
