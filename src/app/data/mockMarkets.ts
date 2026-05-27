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
    pool: 3200000, // $3.2M (premium)
  },
  {
    id: "2",
    pair: "ETH/USD",
    question: "Where will ETH close today?",
    type: "RANGE",
    confidence: 85,
    risk: "High",
    options: ["Below $3,800", "$3,800-$3,900", "$3,900-$4,000", "Above $4,000"],
    participants: 98,
    closesIn: 7200,
    createdAt: Date.now(),
    pool: 450000, // $450K (medium)
  },
  {
    id: "3",
    pair: "AAPL",
    question: "What will AAPL's closing price be today?",
    type: "CLOSE_PRICE",
    confidence: 72,
    risk: "Low",
    options: [],
    currentPrice: 192.34,
    participants: 45,
    closesIn: 14400,
    createdAt: Date.now(),
    helperText: "Top 5% closest predictions share the prize pool",
    pool: 12000, // $12K (small)
  },
];
