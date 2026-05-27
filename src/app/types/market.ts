export type MarketType = "YES_NO" | "RANGE" | "CLOSE_PRICE" | "BREAKOUT";

export interface Market {
  id: string;
  pair: string;
  question: string;
  type: MarketType;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  options: string[];
  participants: number;
  pool?: number;
  closesIn: number; // seconds
  createdAt: number;
  // Optional runtime/resolution fields
  finalResult?: string | number;
  predictions?: { userId: string; value: string | number }[];
  currentPrice?: number;
}
