/**
 * Client testimonials shown on the home page. Only real, attributable quotes, used with the client's
 * permission: name, role and company as they agreed to be credited. The section stays hidden while this is empty.
 */
export type Testimonial = {
    quote: string;
    name: string;
    role: string;
    company?: string;
    /** Optional public profile or company site, e.g. a LinkedIn URL. */
    link?: string;
    /** Optional case study slug this project relates to. */
    work?: string;
    /** Shown only once the client has confirmed the wording. */
    published: boolean;
};

export const testimonials: Testimonial[] = [
    {
        // Wording confirmed with the client on 1 November 2026.
        quote: "Our counter runs on this now. Prices, bills and the catalogue come from one place, and I can approve a discount from my phone without being in the shop.",
        name: "Kishan Suthar",
        role: "Owner",
        company: "OM ENTERPRISE, Naswadi",
        link: "https://omenterprise-n.vercel.app",
        work: "omenterprise",
        published: true,
    },
];

/** The quotes that are cleared to show. */
export const publishedTestimonials = testimonials.filter((t) => t.published);
