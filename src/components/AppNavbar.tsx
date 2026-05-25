import { ReactNode } from "react";

type AppNavbarProps = {
  children?: ReactNode;
};

export default function AppNavbar({ children }: AppNavbarProps) {
  return (
    <div className="h-[64px] border-b border-white/10 flex items-center justify-between px-6 bg-[#0B0F19]/80 backdrop-blur-md">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <a href="/explore-signals" className="text-sm text-blue-400 font-semibold px-2 py-1 rounded bg-blue-500/10">
          Explore Signals
        </a>
        <a href="/markets" className="text-sm text-white/80 hover:text-blue-400 transition font-medium px-2 py-1 rounded">
          Markets
        </a>
        {children && (
          <div className="ml-6 text-xl font-semibold text-white">
            {children}
          </div>
        )}
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* AI ACTIVE */}
        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AI Active
        </div>
        {/* NOTIFICATION */}
        <div className="text-white/60 hover:text-white cursor-pointer">
          🔔
        </div>
        {/* PROFILE */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
          AV
        </div>
      </div>
    </div>
  );
}
