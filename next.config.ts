import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Case study slugs before the work section was synced with yashsuthar.dev
      { source: "/work/limityourapis", destination: "/work/limityourapi", permanent: true },
      { source: "/work/startupdeck-ai", destination: "/work/startupdeck", permanent: true },
      { source: "/work/:slug(codefusionai|promptp|stackwise-platform)", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
