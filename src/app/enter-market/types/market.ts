
export type MarketType = "YES_NO" | "RANGE" | "CLOSE_PRICE" | "BREAKOUT";

export interface Market {
  id: string;
  pair: string;
  type: MarketType;
  question: string;
  options: string[];
  pool: number;
  participants: number;
  status?: string;
  createdAt: number;
  closesAt?: number;
  closesIn?: number;
  finalResult?: string | number;
  predictions?: { userId: string; value: string | number }[];
  confidence?: number;
  risk?: "Low" | "Medium" | "High";
  currentPrice?: number;
  helperText?: string;
}
