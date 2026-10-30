import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // The share-image route reads these font files at runtime, so ship them with its function.
  outputFileTracingIncludes: {
    "/og": ["./src/app/og/*.ttf", "./src/fonts/Oughter.otf"],
  },
  async redirects() {
    return [
      // Case study slugs before the work section was synced with yashsuthar.dev
      { source: "/work/limityourapis", destination: "/work/limityourapi", permanent: true },
      { source: "/work/startupdeck-ai", destination: "/work/startupdeck", permanent: true },
      { source: "/work/stackwise-platform", destination: "/work/stackwise", permanent: true },
    ];
  },
};

export default nextConfig;
