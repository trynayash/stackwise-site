import { NextResponse } from "next/server";

export function middleware() {
    const response = NextResponse.next();

    // 1. Strict-Transport-Security (HSTS) - 2 years (63072000 seconds), includes subdomains and preload
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
    );

    // 2. Permissions-Policy - Disable camera, mic, geolocation, and FLoC by default
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );

    // 3. X-Content-Type-Options - Prevent MIME-sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");

    // 4. X-Frame-Options - Prevent Clickjacking attacks
    response.headers.set("X-Frame-Options", "DENY");

    // 5. Referrer-Policy - Secure referrers when navigating away
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // 6. Content Security Policy (CSP)
    // Configured to support Google Analytics, Vercel Insights, self-hosted sources, fonts, and inline Next.js styles/scripts.
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://s3-us-west-2.amazonaws.com https://images.unsplash.com https://i.postimg.cc;
        font-src 'self' https://fonts.gstatic.com data:;
        connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com;
        frame-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
    `.replace(/\s{2,}/g, " ").trim();

    response.headers.set("Content-Security-Policy", cspHeader);

    return response;
}

// Match all routes except static assets, images, favicons, robots, sitemaps
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/|.*\\..*).*)",
    ],
};
