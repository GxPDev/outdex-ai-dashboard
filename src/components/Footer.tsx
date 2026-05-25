export default function Footer() {
  return (
    <div className="mt-16 border-t pt-10">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* LEFT */}
        <div>
          <h3 className="font-semibold text-slate-900">OUTDEX</h3>
          <p className="text-sm text-slate-500 mt-2">
            The intelligence layer for global financial markets.
          </p>
          <p className="text-xs text-slate-400 mt-4">
            © 2025 Outdex. Trading involves risk.
          </p>
        </div>
        {/* CENTER */}
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#">Docs</a>
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        {/* RIGHT */}
        <div className="flex gap-3">
          {["X", "IG", "IN", "DS", "YT"].map((icon, i) => (
            <div
              key={i}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
            >
              <span className="text-xs text-slate-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
