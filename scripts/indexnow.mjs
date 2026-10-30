/**
 * After a production build on Vercel, tells IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing also
 * feeds ChatGPT search and Copilot) about every URL in the sitemap, so new and changed pages are crawled
 * within hours. It never fails the build: any problem is logged and skipped.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

// Public by design: IndexNow proves site ownership by fetching this key from /<key>.txt.
const KEY = "3deac8340c3d5220ee273879b88ebf66";

/** Finds the prerendered sitemap in the build output (its folder differs between local and Vercel builds). */
async function findSitemapFile(dir, depth = 0) {
    if (depth > 6) return null;
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return null;
    }
    for (const e of entries) if (e.isFile() && /^sitemap\.xml(\.body)?$/.test(e.name)) return path.join(dir, e.name);
    for (const e of entries) {
        if (!e.isDirectory() || e.name === "cache" || e.name === "node_modules") continue;
        const found = await findSitemapFile(path.join(dir, e.name), depth + 1);
        if (found) return found;
    }
    return null;
}

/** The sitemap from this build if it can be found, otherwise the one currently live in production. */
async function sitemapXml() {
    for (const root of [".next", ".vercel/output"]) {
        const file = await findSitemapFile(path.resolve(root));
        if (file) {
            const xml = await readFile(file, "utf8");
            if (xml.includes("<urlset")) return xml;
        }
    }
    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (!host) throw new Error("no sitemap in the build output and no production URL");
    const res = await fetch(`https://${host}/sitemap.xml`, { signal: AbortSignal.timeout(10_000) });
    return res.text();
}

async function main() {
    if (process.env.VERCEL_ENV !== "production") {
        console.log("[indexnow] skipped (not a production deploy)");
        return;
    }
    const xml = await sitemapXml();
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
