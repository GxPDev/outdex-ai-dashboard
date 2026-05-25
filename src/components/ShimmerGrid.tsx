import React from "react";
import ShimmerCard from "./ShimmerCard";

export default function ShimmerGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ShimmerCard key={idx} />
      ))}
    </div>
  );
}
