import React from "react";

export default function ShimmerCard() {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 animate-pulse">
      <div className="h-4 w-1/3 bg-white/10 rounded mb-3" />
      <div className="h-6 w-2/3 bg-white/10 rounded mb-4" />
      <div className="h-4 w-1/4 bg-white/10 rounded mb-3" />
      <div className="h-4 w-full bg-white/10 rounded mb-4" />
      <div className="h-2 w-full bg-white/10 rounded mb-4" />
      <div className="h-10 w-full bg-white/10 rounded" />
    </div>
  );
}
