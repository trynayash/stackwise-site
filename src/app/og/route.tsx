import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

const MAX_TITLE = 90;

/**
 * Branded 1200×630 social-share image. Used by every page's Open Graph / Twitter metadata:
 *   /og?title=SaaS%20Development&kicker=Services
 */
export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = (searchParams.get("title") || siteConfig.tagline).slice(0, MAX_TITLE);
    const kicker = (searchParams.get("kicker") || "Software Studio").slice(0, 40);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    backgroundColor: "#060606",
                    backgroundImage: "radial-gradient(ellipse 70% 60% at 85% 10%, rgba(200,255,0,0.22), transparent 70%)",
                    color: "#fff",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* Stacked-layers mark */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ width: 44, height: 10, borderRadius: 4, background: "#C8FF00" }} />
                        <div style={{ width: 44, height: 10, borderRadius: 4, background: "rgba(200,255,0,0.6)" }} />
                        <div style={{ width: 44, height: 10, borderRadius: 4, background: "rgba(200,255,0,0.3)" }} />
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            alignSelf: "flex-start",
                            padding: "8px 18px",
                            borderRadius: 999,
                            border: "1px solid rgba(200,255,0,0.4)",
                            background: "rgba(200,255,0,0.1)",
                            color: "#C8FF00",
                            fontSize: 22,
                            letterSpacing: 3,
                            textTransform: "uppercase",
                        }}
                    >
                        {kicker}
                    </div>
                    <div style={{ display: "flex", fontSize: title.length > 45 ? 64 : 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, maxWidth: 1000 }}>
                        {title}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
                    <div style={{ display: "flex" }}>SaaS · Custom Software · AI</div>
                    <div style={{ display: "flex", color: "#C8FF00" }}>{siteConfig.url.replace("https://", "")}</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
        }
    );
}
