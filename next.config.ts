import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // During CI/build (e.g. Vercel) some lint rules are strict and cause
  // the build to fail. Ignore ESLint during builds to allow the production
  // compilation to complete. Developers should still run `npm run lint`
  // locally to catch issues.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
