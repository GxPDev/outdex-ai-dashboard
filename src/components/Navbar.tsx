"use client";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-8 py-3 md:px-12 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="flex items-center gap-8">
        <Logo />
        <a href="#" className="hidden md:inline-block hover:text-blue-600 transition text-base text-slate-700 font-medium">Leaderboard</a>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="hidden sm:inline-flex rounded-xl border border-slate-200 bg-white px-5 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-md transition"
          onClick={() => router.push('/markets')}
        >
          Enter Markets
        </button>
      </div>
    </header>
  );
}
