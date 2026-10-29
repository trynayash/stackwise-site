import {
    Accessibility, Award, BarChart3, Brain, Calendar, Code2, CreditCard, Cpu, Database, Eye, Globe, HardDrive,
    Layers, LayoutGrid, Lock, Paintbrush, Rocket, Search, Server, Settings, Shield, ShieldAlert, ShieldCheck,
    Sparkles, Table, Target, Terminal, Users, Users2, Workflow, Zap, type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/lib/faqs";

export type MarketingPageData = {
    slug: string;
    path: string;
    kind: "Services" | "Solutions";
    serviceType: string;
    seo: { title: string; description: string };
    badge: string;
    navLabel: string;
    titleTop: string;
    titleAccent: string;
    intro: string;
    icon: LucideIcon;
    features: { icon: LucideIcon; title: string; description: string }[];
    idealFor: string[];
    deliverables: string[];
    stack: string[];
    faqs: Faq[];
    cta: { title: string; text: string };
    related: string[];
};

const ownershipFaq: Faq = {
    q: "Do I own the code?",
    a: "Yes, 100%. At handover you get the full repository, design files, documentation and access to every account and service the product runs on. There are no licensing fees or lock-ins.",
};

export const marketingPages: Record<string, MarketingPageData> = {
    "saas-development": {
        slug: "saas-development",
        path: "/services/saas-development",
        kind: "Services",
        serviceType: "SaaS development",
        navLabel: "SaaS Development",
        seo: {
            title: "SaaS Development Services",
            description: "Custom SaaS development: multi-tenant architecture, authentication, Stripe and Razorpay subscriptions, dashboards and cloud deployment. Clean, typed code you fully own.",
        },
        badge: "SaaS Engineering",
        titleTop: "Enterprise-grade",
        titleAccent: "SaaS development.",
        intro: "We design, build and deploy Software-as-a-Service products — from the first architecture plan to secure APIs, subscriptions and multi-tenant infrastructure. Clean, typed code that is built to scale.",
        icon: Layers,
        features: [
            { icon: Layers, title: "Multi-Tenant Architecture", description: "Secure data isolation, tenant routing and customizable workspaces, so every customer only ever sees their own data." },
            { icon: Shield, title: "Secure Authentication & RBAC", description: "MFA support, session tracking and role-based permissions from day one." },
            { icon: CreditCard, title: "Payments & Subscriptions", description: "Stripe or Razorpay for subscriptions, recurring invoices, usage billing and credit balances." },
            { icon: Cpu, title: "Performance Dashboards", description: "Fast real-time widgets, reporting tables, interactive charts and PDF exports." },
            { icon: Server, title: "Cloud Infrastructure (AWS)", description: "Auto-scaling containers, managed databases, Redis caching and zero-downtime CI/CD." },
            { icon: Zap, title: "Fast by Default", description: "Next.js edge caching, careful hydration and lean client bundles keep the app quick as it grows." },
        ],
        idealFor: ["Founders turning an idea or prototype into a paid product", "Teams replacing a fragile first version", "Businesses productizing an internal tool"],
        deliverables: ["Architecture plan & data model", "Auth, roles & team workspaces", "Billing & subscription flows", "Admin and customer dashboards", "CI/CD, staging & production", "Handoff docs & support period"],
        stack: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Redis", "Stripe", "Razorpay", "AWS", "Vercel"],
        faqs: [
            { q: "How long does it take to build a SaaS product?", a: "Most SaaS builds take 8–12 weeks from kickoff to launch, depending on scope. A focused MVP can be quicker. You get a detailed timeline after the discovery call, before any commitment." },
            { q: "Can you add subscriptions and payments?", a: "Yes. We integrate Stripe or Razorpay for subscriptions, trials, usage-based pricing, invoices and webhooks, and connect them to plan limits inside your app." },
            ownershipFaq,
        ],
        cta: { title: "Launch your SaaS product", text: "Need a custom dashboard, secure subscriptions or automated workflows? Tell us about it and we'll map out the architecture." },
        related: ["/solutions/mvp-development", "/services/ai-development", "/solutions/startups"],
    },
    "ai-development": {
        slug: "ai-development",
        path: "/services/ai-development",
        kind: "Services",
        serviceType: "AI development",
        navLabel: "AI Development",
        seo: {
            title: "AI Development Services",
            description: "Custom AI development: LLM integrations, RAG over your documents, agentic workflows and AI automation built into your product with OpenAI, Anthropic or open-source models.",
        },
        badge: "AI Orchestration",
        titleTop: "Custom AI systems &",
        titleAccent: "intelligent workflows.",
        intro: "We build production-ready AI features — not generic wrappers. Custom pipelines, vector search over your own data and agents that automate real business workflows.",
        icon: Brain,
        features: [
            { icon: Brain, title: "LLM Orchestration", description: "Custom prompting layers and integrations with OpenAI, Anthropic and open-source models." },
            { icon: Sparkles, title: "Agentic Workflows", description: "Agents that run multi-step tasks and call your tools and APIs, with guardrails and logging." },
            { icon: Database, title: "Vector Databases & RAG", description: "Retrieval-augmented generation with pgvector, Pinecone or Milvus, so answers come from your own documents." },
            { icon: Zap, title: "Intelligent Pipelines", description: "Classification, semantic search, summaries and extraction over unstructured text and email." },
            { icon: Eye, title: "Computer Vision", description: "Custom models with TensorFlow or PyTorch for pose detection, video analytics and document layout." },
            { icon: Cpu, title: "Cost & Latency Tuning", description: "Response caching, model selection and quantized setups to keep AI features fast and affordable." },
        ],
        idealFor: ["Products adding AI search, chat or copilots", "Teams drowning in documents, tickets or email", "Operations that repeat the same judgement calls daily"],
        deliverables: ["Use-case & data review", "Model and provider selection", "RAG pipeline / vector store", "Agent tools & guardrails", "Evaluation set & monitoring", "Cost and latency report"],
        stack: ["OpenAI", "Anthropic", "pgvector", "Pinecone", "Milvus", "Python", "TypeScript", "PyTorch", "TensorFlow"],
        faqs: [
            { q: "Which AI models do you work with?", a: "OpenAI, Anthropic and open-source models. We choose based on quality, cost, latency and where your data is allowed to go, and we can switch providers later without a rewrite." },
            { q: "Can AI use our private documents securely?", a: "Yes. With retrieval-augmented generation your documents stay in your own database or vector store. Access rules are enforced before anything reaches the model, and we can keep everything inside your cloud." },
            { q: "Can you add AI to our existing product?", a: "Yes. Most AI work plugs into an existing codebase through your current APIs and database. We start by finding the one or two features where AI saves the most time." },
        ],
        cta: { title: "Put AI to work in your product", text: "Want to automate data processing, add semantic search or build an agent? Let's map out an AI integration plan." },
        related: ["/solutions/business-automation", "/services/saas-development", "/services/custom-software"],
    },
    "custom-software": {
        slug: "custom-software",
        path: "/services/custom-software",
        kind: "Services",
        serviceType: "Custom software development",
        navLabel: "Custom Software",
        seo: {
            title: "Custom Software Development Services",
            description: "Custom software development: internal tools, CRM and ERP platforms, APIs and data integrations designed around how your business actually works.",
        },
        badge: "Bespoke Infrastructure",
        titleTop: "Bespoke software",
        titleAccent: "for operational scale.",
        intro: "Off-the-shelf software rarely fits how you work. We design and build internal dashboards, management portals and APIs around your business logic — not the other way round.",
        icon: Settings,
        features: [
            { icon: Settings, title: "Business Automation Systems", description: "Replace repetitive tasks, paper workflows and manual data entry with event-driven software." },
            { icon: Table, title: "Custom CRM & ERP Platforms", description: "Portals for sales pipelines, clients, resources and inventory, designed for your exact workflow." },
            { icon: HardDrive, title: "Data Pipelines & Integrations", description: "Connect external APIs, legacy databases and live metrics under one clean schema." },
            { icon: Terminal, title: "Custom APIs & Microservices", description: "High-concurrency backends in Go or Node.js, built for low latency and predictable behaviour." },
            { icon: Lock, title: "Security Built In", description: "Encryption, permission checks, XSS/CSRF protection and compliance-ready design." },
            { icon: Shield, title: "Maintainable Code", description: "Strictly typed TypeScript, unit tests and modular architecture that stays easy to change." },
        ],
        idealFor: ["Teams running the business on spreadsheets", "Companies outgrowing generic SaaS tools", "Operations stitched together with copy-paste"],
        deliverables: ["Workflow mapping session", "Data model & permissions", "Web app or internal portal", "Integrations with your tools", "Training & documentation", "Support period after launch"],
        stack: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "MongoDB", "Docker", "AWS"],
        faqs: [
            { q: "Why custom software instead of an off-the-shelf tool?", a: "Off-the-shelf tools are great until your process doesn't fit them. Custom software matches how your team already works, removes per-seat fees and connects all your data in one place." },
            { q: "Can it connect to the tools we already use?", a: "Yes. We integrate with your existing tools through their APIs — accounting, CRM, payments, email, spreadsheets — so data flows automatically instead of being re-typed." },
            ownershipFaq,
        ],
        cta: { title: "Build your internal operating platform", text: "Want to automate processes or connect scattered data cleanly? Let's talk and map out a custom software plan." },
        related: ["/solutions/business-automation", "/services/ai-development", "/services/saas-development"],
    },
    "web-development": {
        slug: "web-development",
        path: "/services/web-development",
        kind: "Services",
        serviceType: "Web development",
        navLabel: "Web Development",
        seo: {
            title: "Web Development & E-Commerce Services",
            description: "Custom Next.js websites and web platforms: fast, accessible and SEO-ready, with headless CMS and e-commerce options. Built to turn visitors into enquiries.",
        },
        badge: "High-Performance Web",
        titleTop: "Cinematic web design &",
        titleAccent: "web architecture.",
        intro: "Custom-coded websites that look sharp and load fast. With modern headless CMS backends and careful technical SEO, we help growing brands get found and turn visitors into customers.",
        icon: Globe,
        features: [
            { icon: Globe, title: "Next.js Storefronts", description: "Headless e-commerce on Shopify or a custom backend, built for fast page loads." },
            { icon: Paintbrush, title: "Editorial UI/UX Design", description: "Custom layouts, spacing systems, harmonized palettes and purposeful micro-animations." },
            { icon: Search, title: "On-Page SEO Engineering", description: "Server-side rendering, XML sitemaps, semantic headings and structured data built in." },
            { icon: Sparkles, title: "Fluid Motion (GSAP & Lenis)", description: "Scroll transitions and WebGL visuals tuned to run smoothly on real devices." },
            { icon: Accessibility, title: "WCAG AA Accessibility", description: "Accessible markup, keyboard navigation, screen-reader support and clear contrast." },
            { icon: ShieldCheck, title: "Optimized Edge Deployment", description: "Continuous deployment, image optimization and global CDN caching." },
        ],
        idealFor: ["Brands moving off WordPress or page builders", "Companies whose site isn't generating leads", "Launches that need to make a strong first impression"],
        deliverables: ["Sitemap & content plan", "Custom design in Figma", "Next.js build with CMS", "Technical SEO setup", "Analytics & conversion tracking", "Performance & accessibility pass"],
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Headless CMS", "Shopify", "Vercel"],
        faqs: [
            { q: "How long does a website take?", a: "A marketing website usually takes 2–3 weeks. E-commerce stores take 4–6 weeks. You'll get an exact timeline once we've agreed the pages and features." },
            { q: "Will my site be SEO-friendly?", a: "Yes. Pages are server-rendered with clean semantic HTML, sitemaps, metadata, structured data and fast load times — the technical foundations search engines look for." },
            { q: "Can my team edit content without a developer?", a: "Yes. We connect a headless CMS so your team can update pages, posts and products themselves, without touching code." },
        ],
        cta: { title: "Upgrade your web presence", text: "Ready to move from a template to a fast, custom Next.js site? Let's plan it together." },
        related: ["/services/saas-development", "/solutions/startups", "/services/custom-software"],
    },
    startups: {
        slug: "startups",
        path: "/solutions/startups",
        kind: "Solutions",
        serviceType: "Product development for startups",
        navLabel: "For Startups",
        seo: {
            title: "SaaS & Product Development for Startups",
            description: "Product engineering for startups: ship fast with clean, modular code your future team and investors can trust. You own 100% of the code.",
        },
        badge: "Startup Labs",
        titleTop: "Scale-ready engineering",
        titleAccent: "for fast-growing startups.",
        intro: "Startups need more than a mock-up. They need stable, modular code that earns customer trust and holds up to technical due diligence. We build SaaS products and AI features ready for launch and for your next hires.",
        icon: Rocket,
        features: [
            { icon: Rocket, title: "Investor-Ready Tech Stack", description: "Modular, strictly typed Next.js and TypeScript that future developers can read, inherit and scale." },
            { icon: Zap, title: "Speed to Market", description: "Coding starts within 48 hours of design approval, focused on the core user loop." },
            { icon: Users, title: "Pitch-Ready Prototypes", description: "Clickable Figma designs and live sandbox environments to show investors and early users." },
            { icon: ShieldAlert, title: "No Lock-In", description: "You own 100% of the repository, assets, database and accounts." },
            { icon: Target, title: "Iterative Scoping", description: "Flexible sprints, so features can shift as user feedback comes in." },
            { icon: Award, title: "Advisory Engineering", description: "Help interviewing your first in-house developers, plus detailed architecture handover." },
        ],
        idealFor: ["Non-technical founders who need a technical partner", "Funded teams that need to ship before hiring", "Founders preparing for technical due diligence"],
        deliverables: ["Product & scope workshop", "Clickable prototype", "Production MVP", "Analytics & feedback loops", "Architecture handover docs", "Help hiring your first engineers"],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Vercel", "AWS", "Figma"],
        faqs: [
            { q: "We're early stage — what does it cost?", a: "Starter builds begin at ₹49,999 and product builds at ₹1,49,999. We scope tightly around the features that prove your idea, so you don't pay for anything you don't need yet." },
            { q: "Can our future team take over the code?", a: "That's the point. The code is strictly typed, documented and handed over with architecture notes. We can also help interview your first engineers." },
            { q: "Do you sign NDAs?", a: "Yes. We sign an NDA before any discovery call where sensitive information is shared." },
        ],
        cta: { title: "Build your product core right", text: "Have a prototype or product doc ready? Let's map out your development plan and set up a solid backend." },
        related: ["/solutions/mvp-development", "/services/saas-development", "/services/ai-development"],
    },
    "mvp-development": {
        slug: "mvp-development",
        path: "/solutions/mvp-development",
        kind: "Solutions",
        serviceType: "MVP development",
        navLabel: "MVP Development",
        seo: {
            title: "SaaS MVP Development & Rapid Prototyping",
            description: "MVP development without technical debt: ship your SaaS MVP fast on a production-grade stack (Next.js, TypeScript, PostgreSQL) that won't need a rewrite.",
        },
        badge: "Accelerated Build",
        titleTop: "SaaS MVP development",
        titleAccent: "without technical debt.",
        intro: "Shipping fast doesn't mean cutting corners. We build production-ready MVPs on a modern stack (Next.js, TypeScript, PostgreSQL), so your codebase is an asset for your future team, not a rewrite.",
        icon: Target,
        features: [
            { icon: LayoutGrid, title: "Lean Feature Scoping", description: "Cut vanity features and focus on the core loop users will pay for." },
            { icon: Code2, title: "No-Debt Coding", description: "Even when moving fast: modular components, clean schemas and type-safe APIs." },
            { icon: Database, title: "Scale-Ready Database", description: "PostgreSQL or MongoDB schemas designed to grow with real usage after launch." },
            { icon: Users2, title: "User Onboarding Flows", description: "Email and social sign-in, roles and customer workspaces by default." },
            { icon: Rocket, title: "CI/CD From Day One", description: "Deploy to production early, with a staging preview for every pull request." },
            { icon: Shield, title: "Payments Ready", description: "Subscriptions or usage pricing with Stripe or Razorpay." },
        ],
        idealFor: ["Validating an idea with real users", "Replacing a no-code prototype that hit its limits", "Preparing a demo for investors or a pilot customer"],
        deliverables: ["Scope & feature priority list", "UX flows & UI design", "Working MVP in production", "Auth, billing & admin", "Analytics to measure traction", "Roadmap for version two"],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "MongoDB", "Stripe", "Razorpay", "Vercel"],
        faqs: [
            { q: "How fast can you ship an MVP?", a: "Most MVPs launch in about 4–8 weeks, depending on scope. We agree the core features up front so the timeline stays predictable." },
            { q: "What if we need to change features mid-way?", a: "That's normal. Minor additions are absorbed. For bigger changes we send a clear quote and timeline update within 24 hours — no surprises." },
            { q: "Will we need to rebuild it later?", a: "No. The MVP is built on the same production-grade stack you'd use at scale, so version two builds on top of it instead of starting over." },
        ],
        cta: { title: "Validate your idea with solid engineering", text: "Ready to turn your wireframes or idea into a secure, working web app? Let's build your core." },
        related: ["/solutions/startups", "/services/saas-development", "/services/web-development"],
    },
    "business-automation": {
        slug: "business-automation",
        path: "/solutions/business-automation",
        kind: "Solutions",
        serviceType: "Business process automation",
        navLabel: "Business Automation",
        seo: {
            title: "Business Automation & Workflow Engineering",
            description: "Business process automation: replace spreadsheets and manual work with custom workflows, integrations, dashboards and secure client portals.",
        },
        badge: "Operational Flow",
        titleTop: "Automated systems",
        titleAccent: "for operational speed.",
        intro: "Manual admin leaks hours and money. We build API scripts, data connectors and secure dashboards that remove the friction — and the spreadsheets — from your operations.",
        icon: Workflow,
        features: [
            { icon: Workflow, title: "Operational Workflows", description: "Turn human processes into software rules: notifications, approvals and status syncing." },
            { icon: Database, title: "Legacy Data Syncs", description: "Connect spreadsheets, local SQL databases and SaaS tools into one real-time data layer." },
            { icon: BarChart3, title: "Central Dashboards", description: "Inventory, sales and operations metrics on a single live dashboard." },
            { icon: Calendar, title: "Scheduled Automations", description: "Automatic PDF invoices, weekly Slack summaries, backups and report dispatch." },
            { icon: Cpu, title: "No-Code Bridges", description: "Clean API scripts connecting Webflow, Bubble or Airtable to your core backend." },
            { icon: Shield, title: "Secure Client Portals", description: "Give clients, vendors and staff their own views with row-level permissions." },
        ],
        idealFor: ["Teams re-typing data between tools", "Businesses running on shared spreadsheets", "Managers waiting on manual weekly reports"],
        deliverables: ["Process & bottleneck audit", "Automation plan with priorities", "Integrations & scheduled jobs", "Live dashboards", "Role-based portals", "Monitoring & alerts"],
        stack: ["Node.js", "Go", "PostgreSQL", "Slack API", "Airtable", "Webflow", "AWS"],
        faqs: [
            { q: "What kind of processes can you automate?", a: "Anything repetitive and rule-based: data entry between tools, approvals, invoices, reports, reminders and syncing records. Show us the spreadsheet and we'll show you what can go." },
            { q: "Do we have to replace the tools we use now?", a: "Usually not. We connect your existing tools through their APIs and automate the work between them. We only suggest replacing something when it's clearly holding you back." },
            { q: "How do we get started?", a: "Book a free consultation and walk us through one painful workflow. We'll come back with what can be automated, the rough effort and a quote." },
        ],
        cta: { title: "Remove manual work from your operations", text: "Describe your bottlenecks or share your current spreadsheets. We'll map out an automation plan." },
        related: ["/services/custom-software", "/services/ai-development", "/services/saas-development"],
    },
};

export const marketingPageList = Object.values(marketingPages);

/** Shared four-step process shown on every marketing page. */
export const marketingProcess = [
    { step: "01", title: "Discovery", text: "We learn your goals, users and constraints, then agree scope, timeline and a written quote." },
    { step: "02", title: "Design", text: "Clickable Figma prototypes so you see exactly what you're getting before code is written." },
    { step: "03", title: "Build", text: "Production-grade code with regular updates and a staging URL to follow progress." },
    { step: "04", title: "Launch & support", text: "Testing, deployment and a support period after launch. The code and IP are yours." },
];
