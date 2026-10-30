import type { NextConfig } from "next";

// Vercel's preview toolbar (comments, feedback) loads from vercel.live on preview deployments only.
const preview = process.env.VERCEL_ENV === "preview";

/**
 * Content Security Policy. Next.js inlines its hydration scripts and the font/animation styles, so inline
 * script and style stay allowed; everything else is pinned to this origin plus the analytics hosts the
 * layout can load when NEXT_PUBLIC_GA_ID is set. No eval, no frames, no plugins.
 */
const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com${preview ? " https://vercel.live" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
    "font-src 'self' data:",
    `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com${preview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
    `frame-src ${preview ? "https://vercel.live" : "'none'"}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
    { key: "Content-Security-Policy", value: csp },
    // Two years, subdomains included, eligible for browser preload lists.
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    // The site never asks for device access, so turn it all off up front.
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
    },
];

const nextConfig: NextConfig = {
    reactCompiler: true,
    poweredByHeader: false,
    // The share-image route reads these font files at runtime, so ship them with its function.
    outputFileTracingIncludes: {
        "/og": ["./src/app/og/*.ttf", "./src/fonts/Oughter.otf"],
    },
    async headers() {
        return [{ source: "/(.*)", headers: securityHeaders }];
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
