
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
  finalResult?: any;
  predictions?: any[];
  confidence?: number;
  risk?: "Low" | "Medium" | "High";
  currentPrice?: number;
  helperText?: string;
}
