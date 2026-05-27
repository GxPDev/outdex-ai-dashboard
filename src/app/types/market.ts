export type MarketType = "YES_NO" | "RANGE" | "CLOSE_PRICE" | "BREAKOUT";

export interface Market {
  id: string;
  pair: string;
  question: string;
  type: MarketType;
  pool: number;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  options: string[];
  participants: number;
  closesIn: number; // seconds
  createdAt: number;
  currentPrice?: number;
  helperText?: string;
}
