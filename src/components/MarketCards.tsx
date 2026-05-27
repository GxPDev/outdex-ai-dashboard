const markets = [
  {
    asset: "EUR/USD",
    type: "FX",
    icon: (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xl font-bold">
        €
      </span>
    ),
    question: "Will EUR/USD break 1.10 in 24h?",
    subtitle: "Derived from: breakout pressure",
    yes: "68%",
    no: "32%",
    pool: "$98,420",
    time: "18h 24m",
    traders: "1.2K",
    btn: "bg-blue-900 hover:bg-blue-800",
    border: "border-l-4 border-blue-600",
    text: "text-blue-900",
  },
  {
    asset: "BTC",
    type: "Crypto",
    icon: (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-100 text-orange-600 text-xl font-bold">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold" dy=".3em">₿</text></svg>
      </span>
    ),
    question: "Will BTC rise 4% in 24h?",
    subtitle: "Derived from: momentum acceleration",
    yes: "72%",
    no: "28%",
    pool: "$120,531",
    time: "21h 12m",
    traders: "2.1K",
    btn: "bg-orange-500 hover:bg-orange-400",
    border: "border-l-4 border-orange-500",
    text: "text-orange-700",
  },
  {
    asset: "NVDA",
    type: "Stocks",
    icon: (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-700 text-xl font-bold">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold" dy=".3em">S</text></svg>
      </span>
    ),
    question: "Will NVDA close above $950 this week?",
    subtitle: "Derived from: sentiment surge",
    yes: "64%",
    no: "36%",
    pool: "$86,231",
    time: "16h 24m",
    traders: "1.1K",
    btn: "bg-green-700 hover:bg-green-600",
    border: "border-l-4 border-green-600",
    text: "text-green-800",
  },
  {
    asset: "Gold",
    type: "Commodities",
    icon: (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-100 text-yellow-700 text-xl font-bold">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold" dy=".3em">G</text></svg>
      </span>
    ),
    question: "Gold closing range (24h)",
    subtitle: "Derived from: range compression",
    yes: "$2,300 – $2,350",
    no: "42% Probability",
    pool: "$63,420",
    time: "16h 24m",
    traders: "842",
    btn: "bg-yellow-400 hover:bg-yellow-300 text-slate-900",
    border: "border-l-4 border-yellow-400",
    text: "text-yellow-700",
  },
];

export default function MarketCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <div className="w-full rounded-xl px-6 py-4 bg-white/5 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%)] border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-lg font-bold">Z</span>
            <span className="font-semibold text-white">Zinax Active</span>
            <span className="text-white/50 text-sm">• Processing global markets</span>
          </div>
          <div className="text-white/70 text-sm">
            Showing top opportunities from <span className="font-semibold text-white">1,296 signals</span> today
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            From Signals to Markets
          </h2>
          <a href="#" className="text-sm font-medium text-blue-400 hover:underline">View all markets →</a>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {markets.map((m) => (
          <div
            key={m.asset}
            className={
              `relative border border-white/10 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_60px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition flex flex-col px-6 pt-6 pb-5 min-h-[270px] backdrop-blur-md bg-[#111827]/60 ` +
              'bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%)]'
            }
          >
            <div className="flex items-center gap-3 mb-2">
              {m.icon}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">{m.type}</span>
                <span className="text-xs text-white/60">{m.asset}</span>
              </div>
            </div>
            <div className="mb-1">
              <p className="text-base font-semibold text-white leading-tight">
                {m.question}
              </p>
              <p className="text-xs text-white/60 mt-1">{m.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-2">
              {/* Example tags: Buy, Sell, Neutral */}
              {['Buy', 'Sell', 'Neutral'].map((tag, tagIdx) => {
                let tagColor = "bg-green-500/20 text-green-400";
                if (tag.toLowerCase() === "sell") tagColor = "bg-red-500/20 text-red-400";
                if (tag.toLowerCase() === "neutral") tagColor = "bg-blue-500/20 text-blue-400";
                return (
                  <span
                    key={tagIdx}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${tagColor}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-3 mb-2">
              <span className="text-lg font-semibold text-white">
                {m.pool}
              </span>
              <span className="text-white/50 text-sm">
                • {m.traders} traders
              </span>
            </div>
            <div className="text-red-400 text-sm animate-pulse mb-2 flex items-center gap-1">
              <span role="img" aria-label="closing">🔴</span> Closing in 45m
            </div>
            {/* YES/NO or Range/Probability */}
            {m.asset !== "Gold" ? (
              <div className="flex items-end justify-between mt-2 mb-2">
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-500">YES</span>
                  <span className="flex items-center gap-1 font-bold text-lg text-slate-900">
                    <span
                      className={
                        `inline-block w-3 h-3 rounded-full ` +
                        (m.asset === "EUR/USD"
                          ? "bg-blue-500"
                          : m.asset === "BTC"
                          ? "bg-orange-500"
                          : m.asset === "NVDA"
                          ? "bg-green-600"
                          : "")
                      }
                    />
                    {m.yes}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-500">NO</span>
                  <span className="font-bold text-lg text-slate-900">{m.no}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 mt-2 mb-2">
                <span className="text-xs text-slate-500">Range</span>
                <span className="font-bold text-lg text-slate-900">{m.yes}</span>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1 mb-1">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '70%' }} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{m.no}</span>
                  <span className="text-slate-400">42% Probability</span>
                </div>
              </div>
            )}
            <button
              className="mt-auto w-full rounded-xl px-4 py-3 text-sm font-semibold transition bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow"
            >
              Enter Market
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
