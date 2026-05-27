import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Re-enable ESLint during builds so CI fails on lint errors.
  // This was temporarily disabled to validate type fixes; re-enabling
  // will ensure the production build fails until lint issues are fixed.
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
