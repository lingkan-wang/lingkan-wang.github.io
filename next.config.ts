import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a fully static `out/` for static hosts (preview links,
// Feishu Miaoda, etc.). Default build stays server-capable for Vercel.
const isStaticExport = !!process.env.STATIC_EXPORT;

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  ...(isStaticExport
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
