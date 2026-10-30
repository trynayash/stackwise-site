# SEO and AEO

How the site is set up to rank in search (SEO) and to be quoted by answer engines such as Google AI Overviews, ChatGPT search and Perplexity (AEO).

## Keyword map

`keyword-map.csv` lists every search query the site targets, the one page that answers it, and the intent behind it. Each query maps to a single page so pages don't compete with each other. The keywords live next to the content:

| Pages | Where the keywords are |
| --- | --- |
| Home, pricing, hubs, services, solutions, technologies | `src/lib/seo-keywords.ts` |
| White-label for agencies | `src/lib/pages/agencies.ts` |
| Industries | `src/lib/pages/industries.ts` |
| Locations | `src/lib/pages/locations.ts` |
| Guides | `src/lib/guides/<slug>.ts` |

Keywords are never rendered or stuffed into meta tags; they guide what each page's title, headings, intro and FAQs cover. Use the CSV to track positions in Google Search Console (Performance → Queries) and add new queries to the page that should own them.

## Page types

- **Landing pages** (services, solutions, technologies, industries, locations): one search intent each, a starting price, FAQs and `Service`, `BreadcrumbList` and `FAQPage` structured data.
- **Guides** (`/guides/*`): answer-first articles. Each opens with a 40–70 word short answer and key takeaways (the parts answer engines quote), then sections, a comparison table and FAQs, with `Article`, `BreadcrumbList` and `FAQPage` structured data.
- **Pricing** (`/pricing`): plans, a comparison table and starting prices for every service, read from each service page so they never drift. US$ figures are reference conversions set by `INR_PER_USD` in `src/lib/pricing.ts`.

## For answer engines

- `/llms.txt` is a map of the site and `/llms-full.txt` the full text of every landing page and guide, both generated from the same content files.
- `robots.txt` explicitly allows AI search and assistant crawlers.
- FAQ answers are present in the page HTML even when collapsed.

## After each deploy

1. In Google Search Console and Bing Webmaster Tools, submit `https://stackwise-site.vercel.app/sitemap.xml` (set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel first).
2. Use URL Inspection → Request indexing for new pages.
3. If a custom domain is connected, set `NEXT_PUBLIC_SITE_URL` so canonical links, the sitemap and structured data use it.
