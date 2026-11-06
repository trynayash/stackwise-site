"use client";

import React, { useEffect } from "react";
import { siteConfig } from "@/config/site";

const page: React.CSSProperties = {
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "24px",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    WebkitFontSmoothing: "antialiased",
};

const button: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    height: 52,
    padding: "0 28px",
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    border: 0,
};

/**
 * Last resort when the root layout itself fails, so it carries its own html and body and no site styles.
 * Plain inline styles on purpose: nothing here can depend on the thing that just broke.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error("[site] layout failed", error.digest ?? error.message);
    }, [error]);

    return (
        <html lang="en">
            <body style={page}>
                <main style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
                    <p style={{ fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8FF00", margin: 0 }}>{siteConfig.name}</p>
                    <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "20px 0 0" }}>
                        Something went wrong loading the site.
                    </h1>
                    <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "20px 0 0", maxWidth: 520 }}>
                        Reload to try again. If it keeps happening, email {siteConfig.emails.inbound}.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
                        <button type="button" onClick={reset} style={{ ...button, background: "#C8FF00", color: "#000" }}>
                            Try again
                        </button>
                        {/* A full reload on purpose: the app shell that <Link> relies on is what just failed. */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href="/" style={{ ...button, background: "rgba(255,255,255,0.08)", color: "#fff" }}>
                            Back to home
                        </a>
                    </div>
                    {error.digest && (
                        <p style={{ marginTop: 36, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                            Reference: {error.digest}
                        </p>
                    )}
                </main>
            </body>
        </html>
    );
}
