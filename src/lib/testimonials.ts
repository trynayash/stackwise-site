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
};

export const testimonials: Testimonial[] = [];
