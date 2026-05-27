import { Market } from "../types/market";

export const mockMarkets: Market[] = [
  {
    id: "1",
    pair: "BTC/USD",
    question: "Will BTC close above $70,000 today?",
    type: "YES_NO",
    confidence: 61,
    risk: "Medium",
    options: ["Yes", "No"],
    participants: 120,
    closesIn: 3600,
    createdAt: Date.now(),
    pool: 3200000, // $3.2M
  },
  {
    id: "2",
    pair: "ETH/USD",
    question: "Will ETH break $4,000 this week?",
    type: "BREAKOUT",
    confidence: 54,
    risk: "High",
    options: ["Yes", "No"],
    participants: 98,
    closesIn: 7200,
    createdAt: Date.now(),
    pool: 450000, // $450K
  },
];
