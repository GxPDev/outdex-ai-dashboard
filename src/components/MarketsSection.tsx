"use client";
export default function MarketsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {/* ================= BINARY CARD ================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition">
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>FX • EUR/USD</span>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">High Confidence</span>
            </div>
            <p className="mt-3 font-semibold text-slate-900">Will EUR/USD break 1.10 in 24h?</p>
            <p className="text-xs text-slate-400 mt-1">Entry closes in 2h • Resolves in 24h</p>
            {/* Expanded Probability bar and info */}
            <div className="mt-5 flex flex-col gap-3">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '68%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Market probability</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-500">YES</p>
                  <p className="text-2xl font-bold text-blue-600">68%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">NO</p>
                  <p className="text-xl text-slate-500">32%</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Pool: $98,420</span>
                <span>1.2K traders</span>
              </div>
              <div className="flex flex-col gap-1 mt-4 border-t border-slate-100 pt-3">
                <span className="text-xs text-slate-400">Current price: 1.0987 <span className="text-slate-400 ml-2">(+1.2%)</span></span>
                <span className="text-xs text-slate-400">Volatility: Low</span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl" onClick={() => window.location.href = '/markets'}>Enter Markets &rarr;</button>
        </div>
      </div>
      {/* ================= BINARY 2 ================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition">
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Crypto • BTC</span>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">High Confidence</span>
            </div>
            <p className="mt-3 font-semibold">Will BTC rise 4% in 24h?</p>
            <p className="text-xs text-slate-400 mt-1">Entry closes in 3h • Resolves in 24h</p>
            {/* Expanded Probability bar and info */}
            <div className="mt-5 flex flex-col gap-3">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '72%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Market probability</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs">YES</p>
                  <p className="text-2xl font-bold text-orange-500">72%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs">NO</p>
                  <p className="text-xl text-slate-500">28%</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Pool: $120,531</span>
                <span>2.1K traders</span>
              </div>
              <div className="flex flex-col gap-1 mt-4">
                <span className="text-xs text-slate-400">Current price: $64,120 <span className="text-slate-400 ml-2">(+1.2%)</span></span>
                <span className="text-xs text-slate-400">Volatility: Medium</span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl" onClick={() => window.location.href = '/markets'}>Enter Markets &rarr;</button>
        </div>
      </div>
      {/* ================= RANGE CARD ================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition">
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-900">Gold</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold text-slate-900">Medium</span>
            </div>
            <p className="mt-3 font-semibold text-slate-900">Where will Gold close in 24h?</p>
            <p className="text-xs text-slate-400 mt-1">Entry closes in 5h • Resolves in 24h</p>
            <div className="mt-4 space-y-3">
              {[
                { r: "$2,250–$2,280", p: 18 },
                { r: "$2,280–$2,310", p: 32 },
                { r: "$2,310–$2,340", p: 28 },
                { r: "$2,340–$2,370", p: 22 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{item.r}</span>
                    <span>{item.p}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full mt-1">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${item.p}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Market probability</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-4">
              <span>Pool: $63,420</span>
              <span>842 traders</span>
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <span className="text-xs text-slate-400">Current price: $64,120 <span className="text-slate-400 ml-2">(+1.2%)</span></span>
              <span className="text-xs text-slate-400">Volatility: Medium</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl" onClick={() => window.location.href = '/markets'}>Enter Markets &rarr;</button>
        </div>
      </div>
      {/* ================= CLOSE PRICE ================= */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition">
        <div className="flex flex-col h-full justify-between">
          <div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Stocks • NVDA</span>
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">Speculative</span>
        </div>
        <p className="mt-3 font-semibold">What will NVDA close at this week?</p>
            <p className="text-xs text-slate-400 mt-1">Entry closes in 1d • Resolves in 4d</p>
        <input
          placeholder="$ 950.00"
          className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-4">
          <span>Pool: $86,231</span>
          <span>1.1K traders</span>
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">Top 5% win</span>
          <div className="relative group cursor-pointer">
            <span className="text-slate-400">ⓘ</span>
            {/* Tooltip */}
            <div className="absolute left-0 top-6 w-56 p-3 rounded-lg bg-slate-900 text-white text-[11px] opacity-0 group-hover:opacity-100 transition">
              Top 5% of most accurate predictions share the entire pool.
              Accuracy is based on how close your prediction is to the final price.
            </div>
          </div>
        </div>
          <div className="mt-4 text-xs">
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-xs text-slate-400">Current price: <span className="text-slate-700 font-medium">$942.30</span><span className="text-slate-400 ml-2">(+1.2%)</span></span>
              <span className="text-xs text-slate-400">Volatility: Medium</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500">Top predictions</p>
            </div>
          <div className="space-y-1">
            {(() => {
              const data = [
                { name: "TraderX", price: "$951.20", score: "98.3%" },
                { name: "Alpha01", price: "$949.80", score: "97%" },
                { name: "QuantPro", price: "$952.10", score: "95.3%" },
              ];
              return (
                <>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center">#{1} {data[0].name}
                      <span className="ml-2 text-xs text-blue-500 font-semibold">{data[0].score}</span>
                    </span>
                    <span className="font-medium text-slate-900">{data[0].price}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center">#{2} {data[1].name}
                      <span className="ml-2 text-xs text-blue-500 font-semibold">{data[1].score}</span>
                    </span>
                    <span className="font-medium text-slate-900">{data[1].price}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center">#{3} {data[2].name}
                      <span className="ml-2 text-xs text-blue-500 font-semibold">{data[2].score}</span>
                    </span>
                    <span className="font-medium text-slate-900">{data[2].price}</span>
                  </div>
                  <div className="flex flex-col items-end mt-1">
                    {/* 97% now appears inline above */}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Ranked by prediction accuracy</p>
        <button className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl">Submit Prediction</button>
          </div>
        </div>
      </div>
    </div>
  );
}