import { marketingPages } from "@/lib/marketing-pages";
import { quoteBudgets, quoteServices } from "@/lib/quote";

/*
 * Price lookups for the quote chat. They read every service page's facts, so they live apart from the small
 * quote data in quote.ts: pages that only open the chat don't have to ship all the page content.
 */

export type QuoteEstimate = { price: string; timeline?: string };

/** Starting price and typical timeline for a service, read from its page. */
export function estimateFor(serviceLabel?: string): QuoteEstimate | null {
    const slug = quoteServices.find((s) => s.label === serviceLabel)?.slug;
    const page = slug ? marketingPages[slug] : undefined;
    if (!page) return null;
    const fact = (label: string) => page.facts.find((f) => f.label === label)?.value;
    const price = fact("Starting at");
    if (!price) return null;
    return { price: price === "Custom quote" ? price : `From ${price}`, timeline: fact("Typical timeline") };
}

function startingRupees(serviceLabel?: string): number | null {
    const price = estimateFor(serviceLabel)?.price;
    const digits = price?.replace(/[^\d]/g, "");
    return digits ? Number(digits) : null;
}

/** True when the chosen budget tops out below the service's starting price. */
export function budgetBelowStart(serviceLabel?: string, budgetLabel?: string): boolean {
    const start = startingRupees(serviceLabel);
    const max = quoteBudgets.find((b) => b.label === budgetLabel)?.max;
    return start !== null && max !== undefined && max < start;
}
