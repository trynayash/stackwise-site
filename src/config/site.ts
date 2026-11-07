export const siteConfig = {
    name: "StackWise",
    tagline: "Engineering Digital Growth",
    description:
        "Affordable software development company in Mumbai: SaaS, web apps, AI and websites from ₹19,999, live in weeks at fixed prices. You own the code.",
    /** Home page <title>; every other page uses "Page title | StackWise". */
    homeTitle: "Affordable Software Development Company in Mumbai | StackWise",
    /**
     * Canonical site URL for canonicals, the sitemap and structured data. Set explicitly rather than taken from
     * Vercel's production URL, which is the shortest attached domain and would change if another one were added.
     */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackwise.yashsuthar.dev",
    /** Date the page copy last changed (YYYY-MM-DD); the sitemap reports it. Guides carry their own dates. */
    contentUpdated: "2026-11-06",
    location: { city: "Mumbai", region: "Maharashtra", country: "India", countryCode: "IN" },
    author: "Yash Suthar",
    emails: {
        /** The one inbox that receives everything: enquiries, legal and privacy questions. */
        inbound: "stackwiseind@gmail.com",
    },
    links: {
        /** The studio's GitHub organization: the footer's GitHub link and the Organization's sameAs. */
        githubOrg: "https://github.com/StackwiseInd",
        twitter: "https://x.com/YashVibes1",
        /** The founder's personal GitHub profile, used only in the founder's Person structured data. */
        github: "https://github.com/trynayash",
        portfolio: "https://yashsuthar.dev",
        orcid: "https://orcid.org/0009-0004-6775-1113",
        devto: "https://dev.to/trynayash",
        /** Calendly booking page behind every "Book a call" button; an empty NEXT_PUBLIC_CALENDLY_URL hides them. */
        calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/yashsuthar-dev/intro-call-with-yash",
    },
    /** Primary navigation. `id` scrolls to a home-page section; `href` links to a page. */
    navItems: [
        { title: "Work", href: "/work" },
        { title: "Process", id: "process" },
        { title: "Pricing", href: "/pricing" },
        { title: "About", href: "/about" },
        { title: "FAQ", id: "faq" },
    ],
    pricing: [
        {
            title: "Starter Build",
            price: "₹19,999+",
            description: "For business websites, landing pages and marketing sites.",
            features: [
                "Custom Next.js website",
                "Designed around your brand",
                "Fast and responsive on every device",
                "SEO and speed tuning",
                "1 month of support after launch",
            ],
            highlight: false,
        },
        {
            title: "Product Build",
            price: "₹59,999+",
            description: "For SaaS products, dashboards, web apps and database-driven tools.",
            features: [
                "Custom web application",
                "Sign-up, login and user dashboards",
                "Stripe or Razorpay payments and subscriptions",
                "Built on Next.js and TypeScript",
                "3 months of support after launch",
            ],
            highlight: true,
        },
        {
            title: "Scale",
            price: "Custom",
            description: "For AI systems, complex platforms and larger products.",
            features: [
                "AI workflows and LLM integrations",
                "High-traffic APIs and infrastructure",
                "Cloud setup and DevOps on AWS",
                "Security review and hardening",
                "Long-term support options",
            ],
            highlight: false,
        },
    ],
};
