// Captures the StackWise site's pages with Playwright, for the "Website" shot and any re-shoot.
// Usage: SITE_URL=http://localhost:3000 node tools/shoot-site.mjs out/site-shots/
// Playwright is loaded from wherever it is installed (globally in the build environment); install it locally if needed.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const load = createRequire(import.meta.url);
const { chromium } = load("playwright");
const out = process.argv[2] || "out/site-shots/";
const base = process.env.SITE_URL || "http://localhost:3000";
mkdirSync(out, { recursive: true });

const pages = [
  ["home", "/", 1440, 900],
  ["work", "/work", 1440, 900],
  ["pricing", "/pricing", 1440, 900],
  ["home-mobile", "/", 390, 844],
];

const browser = await chromium.launch();
for (const [name, path, width, height] of pages) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
  // Hide the Next.js dev overlay badge when shooting a dev server.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}site-${name}.png` });
  await ctx.close();
  console.log("shot", name);
}
await browser.close();
