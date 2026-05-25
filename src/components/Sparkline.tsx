"use client";


import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";


type SparklineProps = {
  prices?: number[];
  color?: string;
  type?: "linear" | "monotone";
  strokeWidth?: number;
  opacity?: number;
  strokeDasharray?: string;
  signalType?: string;
};

export default function Sparkline({ prices, color, type = "monotone", strokeWidth = 2, opacity = 0.9, strokeDasharray, signalType }: SparklineProps) {
  const safePrices = Array.isArray(prices) && prices.length > 0 ? prices : [0, 0];
  const formatted = safePrices.map((v, i) => ({ x: i, y: v }));
  const last5 = formatted.slice(-5);

  // Dynamic style object for main line
  const style = {
    curve: type,
    stroke: color || "#3b82f6",
    strokeWidth,
    opacity,
    strokeDasharray,
  };

  return (
    <div className="w-full h-14 mb-3 opacity-90">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <Line
            type={style.curve}
            dataKey="y"
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            opacity={style.opacity}
            strokeDasharray={style.strokeDasharray}
            dot={false}
          />
          {signalType === "breakout" && last5.length > 1 && (
            <Line
              data={last5}
              dataKey="y"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              strokeDasharray="0"
              isAnimationActive={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
