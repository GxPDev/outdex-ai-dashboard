import MarketCard from "./MarketCard";
import { Market } from "../types/market";

export default function MarketOptions({ markets }: { markets: Market[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {markets.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  );
}
