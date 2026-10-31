import { siteConfig } from "@/config/site";

/**
 * Link to the Calendly booking page, tagged with where on the site it was clicked so Calendly's own
 * reports show which placement books calls. Empty when no booking page is configured.
 */
export function bookCallUrl(source: string): string {
    const base = siteConfig.links.calendly;
    if (!base) return "";
    const url = new URL(base);
    url.searchParams.set("utm_source", "stackwise");
    url.searchParams.set("utm_medium", "website");
    url.searchParams.set("utm_campaign", source);
    return url.toString();
}
