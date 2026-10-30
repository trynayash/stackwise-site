/**
 * After a production build on Vercel, tells IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing also
 * feeds ChatGPT search and Copilot) about every URL in the sitemap, so new and changed pages are crawled
 * within hours. It never fails the build: any problem is logged and skipped.
 */
import { readFile } from "node:fs/promises";

// Public by design: IndexNow proves site ownership by fetching this key from /<key>.txt.
const KEY = "3deac8340c3d5220ee273879b88ebf66";

async function main() {
    if (process.env.VERCEL_ENV !== "production") {
        console.log("[indexnow] skipped (not a production deploy)");
        return;
    }
    const xml = await readFile(new URL("../.next/server/app/sitemap.xml.body", import.meta.url), "utf8");
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(webp|png|jpe?g)$/i.test(u));
    if (urls.length === 0) throw new Error("no URLs in the sitemap");
    const { host, origin } = new URL(urls[0]);
    const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList: urls }),
        signal: AbortSignal.timeout(10_000),
    });
    console.log(`[indexnow] submitted ${urls.length} URLs for ${host}: HTTP ${res.status}`);
}

main().catch((err) => console.log(`[indexnow] skipped: ${err.message}`));
