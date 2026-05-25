"use client";

import { useState } from "react";

type FilterBarProps = {
  setActiveCategory?: (c: string) => void;
  fetchSignals?: () => void;
};

const categories = ["All", "Crypto", "FX", "Stocks", "Commodities"];
const filters = ["High Confidence", "Closing Soon", "New"];

export default function FilterBar({ setActiveCategory: setActiveCategoryProp, fetchSignals }: FilterBarProps = {}) {
  const [activeCategory, setActiveCategoryState] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("Most Relevant");

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f)
        ? prev.filter((x) => x !== f)
        : [...prev, f]
    );
  };

  return (
    <div className="flex items-center justify-between gap-6 mb-8 flex-wrap md:flex-nowrap">

      {/* LEFT SIDE (Categories + Filters grouped) */}
      <div className="flex items-center gap-6">

        {/* CATEGORY GROUP */}
        <div className="flex items-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActiveCategoryState(c);
                setActiveCategoryProp?.(c);
                fetchSignals?.();
              }}
              className={`
                px-4 py-1.5 rounded-full text-sm transition-all duration-200 ease-out active:scale-95
                border border-white/10
                ${
                  activeCategory === c
                    ? "bg-blue-600/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-5 w-px bg-white/10" />

        {/* FILTER GROUP */}
        <div className="flex items-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`
                px-4 py-1.5 rounded-full text-sm transition-all duration-200 ease-out active:scale-95
                border border-white/10
                ${
                  activeFilters.includes(f)
                    ? f === "Closing Soon"
                      ? "bg-red-500/10 text-red-400 border-red-400/20 shadow-[0_0_10px_rgba(248,113,113,0.2)]"
                      : f === "High Confidence"
                      ? "bg-green-500/10 text-green-400 border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                      : "bg-blue-500/10 text-blue-400 border-blue-400/20"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (SORT) */}
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            bg-white/5 border border-white/10 text-white/70 text-sm
            px-4 py-2 rounded-lg
            hover:bg-white/10 hover:text-white
            focus:outline-none focus:ring-1 focus:ring-blue-500/30
            transition
          "
        >
          <option>Most Relevant</option>
          <option>Highest Confidence</option>
          <option>Closing Soon</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
}
