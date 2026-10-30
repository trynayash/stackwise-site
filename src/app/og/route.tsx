import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

const MAX_TITLE = 90;

const HOME_TITLE = "Your next product. Built right, from day one.";
const HOME_MARK = "Built right,";

// Static cuts of the site's own faces (the variable woff2 the site uses can't be read by the image renderer).
const fonts = Promise.all([
    readFile(join(process.cwd(), "src/app/og/SpaceGrotesk-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/og/SpaceGrotesk-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/fonts/Oughter.otf")),
]);

const [starter, product] = siteConfig.pricing;

/** Splits the title into wrap-able tokens, keeping the marked phrase whole so its highlight never breaks. */
function tokens(title: string, mark: string) {
    const at = mark ? title.indexOf(mark) : -1;
    if (at < 0) return title.split(" ").map((text) => ({ text, marked: false }));
    const words = (s: string) => s.split(" ").filter(Boolean).map((text) => ({ text, marked: false }));
    return [...words(title.slice(0, at)), { text: mark, marked: true }, ...words(title.slice(at + mark.length))];
}

/**
 * Branded 1200×630 social-share image, styled like the home hero: paper background, ink type and the
 * accent marker. Used by every page's Open Graph / Twitter metadata:
 *   /og?title=SaaS%20Development&kicker=Services
 *   /og?title=...&mark=phrase   highlights that phrase of the title
 * With no title it shows the home headline.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const custom = searchParams.get("title");
    const title = (custom || HOME_TITLE).slice(0, MAX_TITLE);
    const mark = custom ? (searchParams.get("mark") ?? "").slice(0, 40) : HOME_MARK;
    const kicker = (searchParams.get("kicker") || `Software studio, ${siteConfig.location.city}`).slice(0, 40);
    const size = title.length > 60 ? 66 : title.length > 36 ? 80 : 92;
    const [regular, semibold, wordmark] = await fonts;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "64px 80px 56px",
                    backgroundColor: "#f2f1ec",
                    color: "#0b0b0b",
                    fontFamily: "Space Grotesk",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", fontFamily: "Oughter", fontSize: 40, letterSpacing: -0.5 }}>STACKWISE</div>
                    <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "rgba(11,11,11,0.65)" }}>{kicker}</div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1000, fontSize: size, fontWeight: 600, lineHeight: 1.04 }}>
                    {tokens(title, mark).map((t, i) => (
                        <span
                            key={i}
                            style={
                                t.marked
                                    ? { backgroundColor: "#C8FF00", borderRadius: size * 0.2, padding: `0 ${size * 0.12}px`, margin: `0 ${size * 0.2}px 0 ${-size * 0.12}px` }
                                    : { marginRight: size * 0.22 }
                            }
                        >
                            {t.text}
                        </span>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 24,
                        borderTop: "2px solid rgba(11,11,11,0.15)",
                        fontSize: 22,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "rgba(11,11,11,0.6)",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        {`Websites from ${starter.price.replace("+", "")} / SaaS from ${product.price.replace("+", "")}`}
                    </div>
                    <div style={{ display: "flex", textTransform: "none", letterSpacing: 0 }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                { name: "Space Grotesk", data: regular, weight: 400, style: "normal" },
                { name: "Space Grotesk", data: semibold, weight: 600, style: "normal" },
                { name: "Oughter", data: wordmark, weight: 400, style: "normal" },
            ],
            headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
        }
    );
}
