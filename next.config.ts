import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Three.js ships several packages; let Next transpile/tree-shake them.
  transpilePackages: ["three"],
  experimental: { optimizePackageImports: ["@react-three/drei", "gsap"] },
};

export default nextConfig;
