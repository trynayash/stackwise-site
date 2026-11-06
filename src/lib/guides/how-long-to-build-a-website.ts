import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "how-long-to-build-a-website",
    path: "/guides/how-long-to-build-a-website",
    category: "Planning",
    title: "How long does it take to build a website or app?",
    seo: {
        title: "How Long Does It Take to Build a Website or App?",
        description:
            "How long a website, online store, web app, MVP or mobile app takes to build in 2026, typical agency timelines, what causes delays and how to launch sooner.",
    },
    summary: "Typical build times for websites, online stores, web apps, MVPs and mobile apps, and how to launch sooner.",
    answer: "A custom business website usually takes 2–12 weeks to build, depending on who builds it: a small, focused team can launch one in 2–3 weeks, while agencies commonly quote 6–12. An online store or MVP web app takes 4–16 weeks, and a mobile app three to six months. Content, feedback speed and scope matter more than the technology.",
    takeaways: [
        "A custom business website takes 2–3 weeks with a small, focused team; agencies commonly quote 6–12 weeks.",
        "Online stores and MVP web apps take 4–8 weeks with a lean team and 8–16 weeks at a typical agency.",
        "Waiting for content, slow feedback and growing scope cause most delays, not the code.",
        "Fix the scope in writing, have content ready and name one person who approves decisions to launch sooner.",
    ],
    sections: [
        {
            id: "typical-timelines",
            heading: "Typical timelines by type of project",
            blocks: [
                {
                    type: "p",
                    text: "These are typical durations from an agreed scope to launch. The agency ranges are the ones commonly quoted in published agency timeline guides; the StackWise column is what we quote for the same kinds of project.",
                },
                {
                    type: "table",
                    caption: "Typical build times from agreed scope to launch",
                    head: ["Project", "What it usually includes", "Typical agency", "StackWise"],
                    rows: [
                        ["Business website", "5–15 pages, custom design, contact forms, SEO setup", "6–12 weeks", "2–3 weeks"],
                        ["Online store", "Catalogue, cart, payments, shipping and order emails", "8–16 weeks", "4–6 weeks"],
                        ["MVP web app", "Sign-up, one core workflow, payments and an admin view", "8–16 weeks", "4–8 weeks"],
                        ["SaaS product, first version", "Team accounts, roles, subscriptions and a few integrations", "12–24 weeks", "8–12 weeks"],
                        ["Mobile app", "iOS and Android from one codebase, with a backend", "3–6 months", "Quoted after discovery"],
                        ["AI assistant or chatbot", "Answers from your own documents, with testing", "4–8 weeks", "Quoted after discovery"],
                    ],
                },
                {
                    type: "callout",
                    title: "Template sites are quicker",
                    text: "A site put together from a template on a website builder can go live in days. The trade-off is less control over speed, design and SEO; the [Next.js vs WordPress guide](/guides/nextjs-vs-wordpress) compares the options.",
                },
            ],
        },
        {
            id: "where-the-time-goes",
            heading: "Where the time goes",
            blocks: [
                {
                    type: "p",
                    text: "Every project moves through the same four stages. On a three-week business website the split usually looks like this:",
                },
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "**Discovery, 2–3 days.** Agree the pages, the audience, the features and what is out of scope, then a written quote and timeline.",
                        "**Design, 4–6 days.** A clickable design of the key pages in Figma, with a round or two of changes.",
                        "**Build, 6–8 days.** Pages, forms, content editing, SEO setup and speed tuning, shown on a live staging link.",
                        "**Testing and launch, 2–3 days.** Phones, browsers, forms and page speed checked, then the domain is switched over.",
                    ],
                },
                {
                    type: "p",
                    text: "Apps follow the same stages with a longer build, because accounts, data, payments and integrations take most of the time. For SaaS products, the [week-by-week SaaS plan](/guides/how-long-to-build-a-saas) breaks down a typical 10-week build.",
                },
            ],
        },
        {
            id: "what-slows-projects-down",
            heading: "What slows a website or app project down",
            blocks: [
                {
                    type: "list",
                    items: [
                        "**Content that isn't ready.** Copy, photos and product data are the most common reason a finished site waits to launch.",
                        "**Slow feedback.** A design that waits a week for approval adds a week to the project.",
                        "**Scope that keeps growing.** New pages and features added mid-build push every later step back.",
                        "**Integrations.** Payment gateways, CRMs and courier APIs need accounts, keys and testing, and payment account activation alone can take several days.",
                        "**Approvals outside the build.** App store review, domain transfers and business verification take calendar time nobody on the project controls.",
                        "**Hand-offs.** When sales, project management and development are different people, details get lost and explained again.",
                    ],
                },
            ],
        },
        {
            id: "how-to-launch-sooner",
            heading: "How to get your website or app live sooner",
            blocks: [
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "**Fix the scope in writing.** Agree what the first version includes, and park the rest for version two.",
                        "**Prepare content early.** Write copy and gather photos while the design is under way, not after.",
                        "**Name one decision-maker.** One person who can approve designs within a day or two keeps the project moving.",
                        "**Choose a proven stack.** A team building on tools it already runs in production spends none of your budget learning them.",
                        "**Launch, then improve.** A smaller first version that is live beats a bigger one that is still in progress.",
                    ],
                },
            ],
        },
        {
            id: "why-a-small-team-is-faster",
            heading: "Why a small team can be faster than an agency",
            blocks: [
                {
                    type: "p",
                    text: "Speed comes from fewer people in the chain, not from skipping steps. At StackWise the team that scopes a project builds it, so nothing is lost between a salesperson, a project manager and a developer. We build on Next.js, TypeScript and PostgreSQL, the stack behind our own live products, and every project still gets a Figma design first, testing on real devices and a speed and security check before launch.",
                },
                {
                    type: "p",
                    text: "Websites start at ₹19,999 and SaaS products at ₹59,999, each with a fixed price and timeline in a written quote. See [pricing](/pricing) or the [web development service](/services/web-development).",
                },
            ],
        },
        {
            id: "what-a-timeline-should-include",
            heading: "What a realistic timeline in a quote should include",
            blocks: [
                {
                    type: "list",
                    items: [
                        "Milestones with dates, not just a launch date.",
                        "What the team needs from you, and by when: content, logins and approvals.",
                        "How many rounds of design changes are included.",
                        "What happens to the dates if the scope changes.",
                        "When testing happens, and how long support lasts after launch.",
                    ],
                },
            ],
        },
    ],
    faqs: [
        {
            q: "How long does it take to build a website in India?",
            a: "A custom business website typically takes 2–12 weeks in India. Small studios working from a fixed scope can launch one in 2–3 weeks, agencies commonly quote 6–12 weeks, and template sites can go live in days. StackWise builds custom Next.js websites in 2–3 weeks, from ₹19,999.",
        },
        {
            q: "How long does it take to build an e-commerce website?",
            a: "A custom online store usually takes 4–16 weeks, depending on the number of products and variants and the payment and courier integrations. StackWise typically launches custom Next.js stores in 4–6 weeks; a store on a hosted platform with a ready-made theme can be quicker.",
        },
        {
            q: "How long does it take to develop a mobile app?",
            a: "A cross-platform app for iOS and Android commonly takes three to six months at an agency, and complex apps take longer. A focused first version on an existing backend can be faster. StackWise scopes mobile apps on a free discovery call and puts the timeline in a written quote.",
        },
        {
            q: "Can a website be built in one week?",
            a: "A landing page or a small template site can be, if the content and decisions are ready. A custom-designed business website with several pages, SEO setup and testing on real devices usually needs two to three weeks to be done properly.",
        },
        {
            q: "Why do some agencies take months to build a website?",
            a: "Larger teams spend more time on hand-offs, meetings and approvals, and developers are often spread across several projects at once. Waiting for client content and feedback adds more. A small team working from a fixed scope avoids most of that.",
        },
    ],
    keywords: [
        "how long does it take to build a website",
        "how long to build a website",
        "how long does it take to make a website",
        "website development timeline",
        "website development time",
        "how many weeks to build a website",
        "how long does it take to build a website in india",
        "how long does it take to build an ecommerce website",
        "ecommerce website development timeline",
        "how long does it take to develop an app",
        "how long does it take to make an app",
        "app development timeline",
        "mobile app development timeline",
        "web app development timeline",
        "how long does it take to build a web app",
        "mvp development timeline",
        "how long does website design take",
        "can a website be built in a week",
        "why do agencies take so long to build websites",
        "fast website development company",
    ],
    related: ["/guides/how-long-to-build-a-saas", "/guides/website-development-cost-india", "/pricing", "/services/web-development"],
    published: "2026-11-06",
    updated: "2026-11-06",
};

export default guide;
