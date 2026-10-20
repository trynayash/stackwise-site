export const siteConfig = {
    name: "StackWise",
    tagline: "Engineering Digital Growth",
    description: "Premium software engineering studio designing and building production-grade SaaS, custom software systems, and AI-powered products.",
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
    navItems: [
        { title: "Home", href: "#hero", index: "01" },
        { title: "Services", href: "#services", index: "02" },
        { title: "Work", href: "#portfolio", index: "03" },
        { title: "Pricing", href: "#pricing", index: "04" },
        { title: "About", href: "#why-stackwise", index: "05" },
        { title: "Contact", href: "#contact", index: "06" },
    ],
    pricing: [
        {
            title: "Starter Build",
            price: "₹49,999+",
            description: "Perfect for premium business presence, marketing websites, and landing systems.",
            features: [
                "Production-Grade Next.js Site",
                "Editorial Custom Typography",
                "Mobile Responsive & Fluid Motion",
                "100/100 Lighthouse SEO & Performance",
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
                "Security Hardening & Penetration Testing Ready",
                "SLA-Backed Long-Term Support",
            ],
            highlight: false,
            gradient: "from-white/10 to-white/5",
        },
    ],
    engineeringPrinciples: [
        {
            title: "Zero-Debt Codebase",
            description: "We write clean, strictly-typed TypeScript and Go code. No shortcuts, no legacy hacks, full scaling readiness.",
            metric: "Clean Code",
        },
        {
            title: "Deterministic Performance",
            description: "We optimize for sub-second page loads and 100/100 Lighthouse scores. Speed directly impacts conversion rates.",
            metric: "<1s Load",
        },
        {
            title: "100% Code Ownership",
            description: "Upon project completion, we transfer the full repository and all design intellectual property to you. No strings.",
            metric: "Full IP Transfer",
        },
        {
            title: "Production Security",
            description: "We build secure systems with input validation, sanitization, strict CSP headers, and secure auth layers by default.",
            metric: "Bank-Grade",
        },
        {
            title: "CI/CD & Edge Deploy",
            description: "Automated pipelines with zero-downtime deployment. Globally cached assets using Vercel Edge networks.",
            metric: "Edge Cached",
        },
        {
            title: "SLA Post-Launch Support",
            description: "We stand by our code. Every product deployment includes dedicated support SLAs to monitor uptime and health.",
            metric: "24/7 Monitoring",
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
