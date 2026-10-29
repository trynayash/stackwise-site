export const siteConfig = {
    name: "StackWise",
    tagline: "Engineering Digital Growth",
    description: "A software studio by Yash Suthar that designs and builds SaaS products, custom software and AI features.",
    url: "https://stackwise.agency",
    author: "Yash Suthar",
    emails: {
        primary: "hello@stackwise.agency",
        inbound: "yashrsuthar90@gmail.com",
    },
    links: {
        twitter: "https://twitter.com/stackwise",
        github: "https://github.com/trynayash/Stackwise",
    },
    /** Primary navigation. `id` is the home-page section each item scrolls to. */
    navItems: [
        { title: "Work", id: "portfolio" },
        { title: "Process", id: "process" },
        { title: "Pricing", id: "pricing" },
        { title: "About", id: "founder" },
        { title: "FAQ", id: "faq" },
    ],
    pricing: [
        {
            title: "Starter Build",
            price: "₹49,999+",
            description: "Perfect for premium business presence, marketing websites, and landing systems.",
            features: [
                "Custom Next.js Site",
                "Editorial Custom Typography",
                "Mobile Responsive & Fluid Motion",
                "Lighthouse Performance & SEO Tuning",
                "1 Month Post-Launch Support",
            ],
            highlight: false,
            gradient: "from-white/10 to-white/5",
        },
        {
            title: "Product Build",
            price: "₹1,49,999+",
            description: "For custom SaaS products, dashboards, web applications, and database-driven tools.",
            features: [
                "Custom Product Web Application",
                "Next.js App Router Architecture",
                "Authentication & User Dashboards",
                "Stripe / Razorpay Payments & Subscriptions",
                "3 Months Dedicated Support",
            ],
            highlight: true,
            gradient: "from-[#C8FF00]/20 to-[#9EFF00]/20",
        },
        {
            title: "Scale",
            price: "Custom",
            description: "Advanced architectures, custom AI systems, and scalable enterprise software.",
            features: [
                "Custom AI Workflows & LLM Integrations",
                "High-Performance API Infrastructures",
                "Cloud Orchestration & Dedicated DevOps (AWS)",
                "Security Hardening",
                "Long-Term Support Options",
            ],
            highlight: false,
            gradient: "from-white/10 to-white/5",
        },
    ],
    engineeringPrinciples: [
        {
            title: "Zero-Debt Codebase",
            description: "We write clean, strictly-typed TypeScript and Go code, with no shortcuts or legacy hacks.",
            metric: "Clean Code",
        },
        {
            title: "Deterministic Performance",
            description: "We aim for fast page loads and high Lighthouse scores, because speed affects conversion rates.",
            metric: "Fast Loads",
        },
        {
            title: "100% Code Ownership",
            description: "Upon project completion, we transfer the full repository and all design intellectual property to you. No strings.",
            metric: "Full IP Transfer",
        },
        {
            title: "Production Security",
            description: "We build secure systems with input validation, sanitization, strict CSP headers, and secure auth layers by default.",
            metric: "Secure Defaults",
        },
        {
            title: "CI/CD & Edge Deploy",
            description: "Automated pipelines with zero-downtime deployment. Globally cached assets using Vercel Edge networks.",
            metric: "Edge Cached",
        },
        {
            title: "Post-Launch Support",
            description: "We stand by our code. Every project includes a support period after launch.",
            metric: "Support Period",
        },
    ],
    services: [
        {
            slug: "saas-development",
            title: "SaaS Development",
            description: "Scale-ready custom software products, dashboards, authentication, database migrations, billing configurations, and modern web applications.",
        },
        {
            slug: "ai-development",
            title: "AI Development",
            description: "Intelligent agentic integrations, LLM workflows, custom automated pipelines, vector databases, and cognitive web integrations.",
        },
        {
            slug: "custom-software",
            title: "Custom Software",
            description: "Bespoke business automation dashboards, internal management tools, robust backend APIs, and custom CRM systems.",
        },
        {
            slug: "web-development",
            title: "Web Development",
            description: "High-conversion web platforms, headless commerce integrations, cinematic brand presentation portals, and SEO engineering.",
        },
    ],
    solutions: [
        {
            slug: "startups",
            title: "StackWise for Startups",
            description: "Speed-to-market solutions that secure seed funding. Handing over clean, modular code architectures that attract CTOs.",
        },
        {
            slug: "business-automation",
            title: "Business Automation",
            description: "Replacing friction and spreadsheets with automated software portals, internal operational tools, and integrated dashboard metrics.",
        },
        {
            slug: "mvp-development",
            title: "SaaS MVP Development",
            description: "Accelerated prototyping without architectural compromise. Build the core product right from day one.",
        },
    ],
};
