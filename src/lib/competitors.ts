/**
 * What the usual alternatives typically offer next to StackWise. Competitor cells describe common market patterns in
 * India (the same ranges the cost guides use), not any named company, and must stay fair: where an option is good at
 * something, say so. StackWise cells must match the pricing, timelines and terms stated elsewhere on the site.
 */
export const competitorColumns = ["Freelancer", "Typical agency", "Large IT firm"] as const;

export type CompetitorRow = {
    label: string;
    others: [string, string, string];
    stackwise: string;
};

export const competitorRows: CompetitorRow[] = [
    {
        label: "Business website",
        others: ["Tens of thousands of rupees", "Up to a few lakh", "Rarely takes small sites"],
        stackwise: "From ₹19,999",
    },
    {
        label: "SaaS or web app MVP",
        others: ["Varies widely", "A few lakh to tens of lakhs", "Tens of lakhs and up"],
        stackwise: "From ₹59,999",
    },
    {
        label: "Time to launch an MVP",
        others: ["Depends on one person's availability", "8–16 weeks", "3–6 months or more"],
        stackwise: "4–8 weeks",
    },
    {
        label: "Price and dates in writing",
        others: ["Often hourly or informal", "Usually, after a proposal", "Yes, after a long discovery"],
        stackwise: "Fixed price and timeline before work starts",
    },
    {
        label: "Who you talk to",
        others: ["The developer", "An account or project manager", "Several layers of managers"],
        stackwise: "The team building your product",
    },
    {
        label: "If someone is away",
        others: ["Work stops", "Another developer steps in", "Another team steps in"],
        stackwise: "The team covers, on documented code",
    },
    {
        label: "Support after launch",
        others: ["Ad hoc", "Paid retainer", "Paid support contract"],
        stackwise: "1–3 months included",
    },
    {
        label: "Code and IP ownership",
        others: ["Depends on the contract", "Depends on the contract", "Depends on the contract"],
        stackwise: "100% yours, in your own repository",
    },
];
