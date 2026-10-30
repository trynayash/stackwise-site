import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "hiring-a-software-company-in-mumbai",
    path: "/guides/hiring-a-software-company-in-mumbai",
    category: "Hiring",
    title: "How to hire a software development company in Mumbai",
    seo: {
        title: "Hiring a Software Development Company in Mumbai",
        description:
            "How to hire a software or web development company in Mumbai: in-person vs remote, fixed price vs retainer, GST on quotes, portfolio checks and red flags.",
    },
    summary: "Hiring a software company in Mumbai: engagement types, GST on quotes, portfolio checks and red flags.",
    answer: "Shortlist three to five Mumbai software companies with live work you can open, send each the same brief, and compare itemized quotes that list scope, exclusions, timeline, support and whether GST is included. Pick a fixed-price project, retainer or dedicated developer based on how settled your scope is. Meet in person for kickoff or handover if it helps, and keep every account in your name.",
    takeaways: [
        "Being nearby is a bonus, not a qualification: hire on evidence, then meet where it adds value.",
        "Pick the engagement type by how settled your scope is, not by the headline price.",
        "Ask whether every quote includes GST, so you compare like with like.",
        "Verify the business: open its live products, check its GSTIN and company records, and speak to a past client.",
        "Get scope, price and terms in a signed contract, never just a WhatsApp thread.",
    ],
    sections: [
        {
            id: "meet-in-person-or-work-remotely",
            heading: "Do you need a company you can meet in person?",
            blocks: [
                {
                    type: "p",
                    text: "Searching for a software company \"near me\" makes sense in a region that stretches from South Mumbai to Thane and Navi Mumbai, where crossing the city for one meeting can take hours. But sharing a city does not make a vendor better at the work. Hire on evidence first, then meet in person where it adds value:",
                },
                {
                    type: "list",
                    items: [
                        "**Kickoff and discovery.** Seeing how your team works today, at a desk or on the shop floor, surfaces requirements a video call misses.",
                        "**Design reviews.** Sitting together over a clickable prototype speeds up decisions.",
                        "**Handover and training.** Staff who will use a new internal tool learn it faster in person.",
                    ],
                },
                {
                    type: "p",
                    text: "The build itself runs well remotely: a shared Slack or email channel, a weekly demo call and a staging link you can open any time. If a vendor wants in-person meetings for routine updates, ask how that time is billed.",
                },
            ],
        },
        {
            id: "engagement-types",
            heading: "Fixed price, retainer or dedicated developer?",
            blocks: [
                {
                    type: "p",
                    text: "Most firms offer some mix of these. Choose based on how settled your scope is, not on which looks cheapest.",
                },
                {
                    type: "table",
                    caption: "Common engagement types with a software company",
                    head: ["Engagement type", "How it is billed", "Best for", "Watch for"],
                    rows: [
                        ["Fixed-price project", "One written quote for an agreed scope, often paid against milestones", "A website, MVP or internal tool with clear requirements", "Vague scope, and how changes are priced"],
                        ["Retainer", "A monthly fee for an agreed amount of work or support", "Maintenance and steady small improvements", "Unused hours that expire, and response times not in writing"],
                        ["Dedicated developer", "A monthly rate per developer working mainly on your product", "Long roadmaps you can direct week to week", "You manage priorities; check seniority and replacement terms"],
                        ["Time and materials", "Hourly or daily rates for time actually spent", "Audits, research or work that cannot be scoped yet", "No ceiling on cost unless you set one"],
                    ],
                },
                {
                    type: "callout",
                    title: "Confirm GST on every quote",
                    text: "GST-registered vendors add GST to their invoices, and some quotes include it while others do not. Ask whether each figure is inclusive or exclusive of GST, and for a tax invoice showing the vendor's GSTIN. Your accountant can confirm whether you can claim input tax credit.",
                },
                {
                    type: "p",
                    text: "StackWise works on a written quote per project, with no hourly billing. Each plan includes one to three months of support, after which an optional monthly maintenance retainer is quoted to fit. Starting prices are on the [pricing page](/pricing).",
                },
            ],
        },
        {
            id: "shortlist-and-check-portfolios",
            heading: "How to shortlist and check portfolios",
            blocks: [
                {
                    type: "p",
                    text: "Start with referrals from people you trust, then add firms from search, LinkedIn or startup communities. Treat directory rankings and \"top 10\" lists as leads, not evidence, since some placements are paid. Then check each one:",
                },
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "**Open the live work.** Sign up, click through on your phone and notice how fast it loads.",
                        "**Ask what they built.** Did they write the product end to end, or only a website on top of someone else's platform?",
                        "**Check the business.** You can verify a GSTIN on the government GST portal and look up a company or LLP on the Ministry of Corporate Affairs (MCA) website. A freelancer or sole proprietor will not appear on MCA, which is not a problem by itself.",
                        "**Speak to a past client.** Ask whether the project finished on time and budget, and how changes and bugs were handled.",
                        "**Look at code if you can.** Public repositories or a short technical call with an adviser of yours shows how they really work.",
                    ],
                },
            ],
        },
        {
            id: "questions-to-ask",
            heading: "Questions to ask a Mumbai software company",
            blocks: [
                {
                    type: "p",
                    text: "Beyond the usual questions about scope and code ownership, use the first call to ask:",
                },
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "Is this quote inclusive or exclusive of GST, and what would trigger an extra invoice?",
                        "Can we meet in person for kickoff and handover, and is that included?",
                        "Will any part of the work be subcontracted to another firm or a freelancer?",
                        "Who takes over if the developer on my project leaves or falls ill?",
                        "Where will our data be hosted, and in whose account? For Indian users, the AWS Mumbai region (ap-south-1) keeps data in India.",
                        "Can I see a contract or statement of work you have used before?",
                    ],
                },
                {
                    type: "p",
                    text: "Before you sign, run the agreement through the [software development contract checklist](/guides/software-development-contract-checklist).",
                },
            ],
        },
        {
            id: "red-flags",
            heading: "Red flags when hiring locally",
            blocks: [
                {
                    type: "list",
                    items: [
                        "The whole deal lives on WhatsApp: no written scope, quote or contract.",
                        "A request for cash, or for payment without a proper invoice.",
                        "A senior person runs the pitch, then the work goes to juniors you never meet.",
                        "A price far below every other quote, with no explanation of what is left out.",
                        "A \"custom\" website that turns out to be a resold theme or template.",
                        "A large upfront payment demanded before any scope is written down.",
                    ],
                },
            ],
        },
        {
            id: "small-studio-or-large-it-firm",
            heading: "Small studio or large IT services firm?",
            blocks: [
                {
                    type: "p",
                    text: "A **large IT services firm** fits enterprise programs: many teams working in parallel, formal vendor onboarding, compliance paperwork and round-the-clock support. Expect account managers, longer procurement and minimum engagement sizes that a small business may not reach.",
                },
                {
                    type: "p",
                    text: "A **small studio** fits startups and growing businesses that need an MVP, a SaaS product, an internal tool or a fast website, and want to talk to the person building it. The trade-off is capacity, so ask how it would handle your timeline. The [freelancer vs agency vs studio guide](/guides/freelancer-vs-agency-vs-studio) compares the smaller options.",
                },
                {
                    type: "p",
                    text: "StackWise is a small studio in Mumbai, run by founder and lead engineer Yash Suthar. The person who scopes your project is the person who builds it, and in-person meetings can be arranged for kickoff, a design review or handover. See [StackWise in Mumbai](/locations/mumbai) for how local projects run.",
                },
            ],
        },
    ],
    faqs: [
        {
            q: "How do I find a good software development company in Mumbai?",
            a: "Start with referrals from people you trust, then add firms found through search and LinkedIn. Shortlist three to five with live products you can open, send each the same brief, and compare itemized quotes. Verify the business through its GSTIN and company records, and speak to a past client before you sign.",
        },
        {
            q: "Is GST charged on software development services in India?",
            a: "Generally, yes. A GST-registered vendor adds GST to its invoices for software and web development, though a very small vendor below the registration threshold may not be registered. Quotes do not always show it, so ask whether each figure includes GST. Your accountant can confirm the rate that applies and whether you can claim input tax credit.",
        },
        {
            q: "What is the difference between fixed-price and dedicated developer hiring?",
            a: "A fixed-price project sets one quote for an agreed scope, so it suits a website, MVP or internal tool with clear requirements. A dedicated developer is billed monthly and works on whatever you prioritize, which suits a long roadmap if you have time to direct the work. If your scope is unclear, start with a small fixed-price first phase.",
        },
        {
            q: "Do I need a software company that can meet me in person?",
            a: "Not usually. Most of a software project runs well on a shared chat channel, a weekly video demo and a staging link. In-person meetings help most at kickoff, when the team needs to see how your business works, and at handover, when staff learn the new system. Choose on skills and evidence first, then on location.",
        },
        {
            q: "How much does it cost to hire a software company in Mumbai?",
            a: "It depends on scope, team seniority and engagement type more than on location. Quotes commonly range from tens of thousands of rupees for a simple website to several lakh or more for a SaaS product or custom platform. StackWise starts at ₹49,999 for business websites and ₹1,49,999 for SaaS products and web apps, with a written quote before work starts.",
        },
    ],
    keywords: [
        "hiring a software company in mumbai",
        "how to hire a software development company in mumbai",
        "software development company in mumbai",
        "software company in mumbai",
        "software companies in mumbai",
        "best software company in mumbai",
        "web development company in mumbai",
        "top web development companies in mumbai",
        "web development agency mumbai",
        "app development company mumbai",
        "custom software development mumbai",
        "software developers in mumbai",
        "hire developers in mumbai",
        "hire web developer mumbai",
        "software company in navi mumbai",
        "software company in thane",
        "software company near me",
        "web development company near me",
        "it company in mumbai for small business",
        "software development company for startups in mumbai",
        "local software company vs remote",
        "in-person vs remote software development",
        "meet software developer in person mumbai",
        "fixed price vs dedicated developer",
        "fixed price software development",
        "software development retainer",
        "dedicated developer model",
        "time and materials vs fixed price",
        "gst on software development services",
        "gst on website development",
        "is gst applicable on software development",
        "software development quote with gst",
        "how to check a software company portfolio",
        "verify software company gst number",
        "check software company on mca",
        "questions to ask a software company",
        "questions to ask a web development company",
        "software company red flags",
        "web development agency red flags",
        "small software studio vs large it company",
        "small agency vs big it company",
        "how to choose a web developer in mumbai",
        "mumbai startup tech partner",
        "software development cost in mumbai",
    ],
    related: [
        "/locations/mumbai",
        "/pricing",
        "/guides/software-development-contract-checklist",
        "/guides/freelancer-vs-agency-vs-studio",
    ],
    published: "2026-10-31",
    updated: "2026-10-31",
};

export default guide;
