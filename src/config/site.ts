export const siteConfig = {
    name: "StackWise",
    tagline: "Engineering Digital Growth",
    description:
        "StackWise is a Mumbai SaaS and software development company building SaaS products, AI features, web apps and fast Next.js websites. You own the code.",
    /** Home page <title>; every other page uses "Page title | StackWise". */
    homeTitle: "SaaS & Software Development Company in Mumbai | StackWise",
    /**
     * Canonical site URL: the Vercel production address. If a custom domain is ever connected,
     * set NEXT_PUBLIC_SITE_URL to it and canonical links and share images follow.
     */
    url:
        process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://stackwise-site.vercel.app"),
    location: { city: "Mumbai", region: "Maharashtra", country: "India", countryCode: "IN" },
    author: "Yash Suthar",
    emails: {
        /** The one inbox that receives everything: enquiries, legal and privacy questions. */
        inbound: "yashrsuthar90@gmail.com",
    },
    links: {
        twitter: "https://x.com/YashVibes1",
        github: "https://github.com/trynayash",
        portfolio: "https://yashsuthar.dev",
        orcid: "https://orcid.org/0009-0004-6775-1113",
        devto: "https://dev.to/trynayash",
    },
    /** Primary navigation. `id` scrolls to a home-page section; `href` links to a page. */
    navItems: [
        { title: "Work", href: "/work" },
        { title: "Process", id: "process" },
        { title: "Pricing", href: "/pricing" },
        { title: "About", id: "founder" },
        { title: "FAQ", id: "faq" },
    ],
    pricing: [
        {
            title: "Starter Build",
            price: "₹49,999+",
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
            price: "₹1,49,999+",
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
