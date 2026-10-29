import {
    AccessIcon, AiBrain01Icon, AiNetworkIcon, Analytics01Icon, ApiIcon, BrowserIcon, Calendar03Icon, ChartIncreaseIcon,
    CheckListIcon, CloudServerIcon, CodeIcon, ConnectIcon, CpuIcon, CreditCardIcon, DashboardSquare01Icon,
    DatabaseIcon, GitBranchIcon, Globe02Icon, LayoutGridIcon, Layers01Icon, LockIcon, PackageIcon, PaintBoardIcon,
    Search01Icon, SecurityCheckIcon, Shield01Icon, SourceCodeIcon, Table01Icon, Target02Icon, TerminalIcon,
    UserGroupIcon, UserMultipleIcon, ViewIcon, WorkflowSquare01Icon, FlashIcon, Key01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@/components/ui/icon";
import type { Faq } from "@/lib/faqs";

export type MarketingPageData = {
    slug: string;
    path: string;
    kind: "Services" | "Solutions";
    serviceType: string;
    seo: { title: string; description: string };
    badge: string;
    navLabel: string;
    /** One line for menus and cards. */
    summary: string;
    titleTop: string;
    titleAccent: string;
    intro: string;
    icon: IconSvgElement;
    facts: { label: string; value: string }[];
    features: { icon: IconSvgElement; title: string; description: string }[];
    idealFor: string[];
    deliverables: string[];
    stack: string[];
    /** Case study slugs from src/lib/case-studies.ts that show this kind of work. */
    work: string[];
    faqs: Faq[];
    cta: { title: string; text: string };
    related: string[];
};

const ownershipFaq: Faq = {
    q: "Do I own the code?",
    a: "Yes, 100%. At handover you get the full repository, design files, documentation and access to every account and service the product runs on. There are no licensing fees or lock-ins.",
};

const quoteFact = { label: "Pricing", value: "Written quote before work starts" };
const ownershipFact = { label: "Ownership", value: "100% code & IP" };

export const marketingPages: Record<string, MarketingPageData> = {
    "saas-development": {
        slug: "saas-development",
        path: "/services/saas-development",
        kind: "Services",
        serviceType: "SaaS development",
        navLabel: "SaaS Development",
        summary: "Subscription products with auth, billing and dashboards.",
        seo: {
            title: "SaaS Development Services",
            description: "Custom SaaS development: multi-tenant architecture, authentication, Stripe and Razorpay subscriptions, dashboards and cloud deployment. Clean, typed code you fully own.",
        },
        badge: "SaaS Engineering",
        titleTop: "SaaS products,",
        titleAccent: "engineered to scale.",
        intro: "We design, build and deploy Software-as-a-Service products — from the first architecture plan to secure APIs, subscriptions and multi-tenant infrastructure. Clean, typed code that is built to grow.",
        icon: DashboardSquare01Icon,
        facts: [{ label: "Typical timeline", value: "8–12 weeks" }, { label: "Starting at", value: "₹1,49,999" }, quoteFact, ownershipFact],
        features: [
            { icon: Layers01Icon, title: "Multi-tenant architecture", description: "Secure data isolation, tenant routing and customizable workspaces, so every customer only ever sees their own data." },
            { icon: Shield01Icon, title: "Authentication & roles", description: "MFA support, session tracking and role-based permissions from day one." },
            { icon: CreditCardIcon, title: "Payments & subscriptions", description: "Stripe or Razorpay for subscriptions, recurring invoices, usage billing and credit balances." },
            { icon: Analytics01Icon, title: "Dashboards & reporting", description: "Real-time widgets, reporting tables, interactive charts and PDF exports." },
            { icon: CloudServerIcon, title: "Cloud infrastructure", description: "Auto-scaling containers on AWS, managed databases, Redis caching and zero-downtime CI/CD." },
            { icon: FlashIcon, title: "Fast by default", description: "Next.js edge caching, careful hydration and lean client bundles keep the app quick as it grows." },
        ],
        idealFor: ["Founders turning an idea or prototype into a paid product", "Teams replacing a fragile first version", "Businesses productizing an internal tool"],
        deliverables: ["Architecture plan & data model", "Auth, roles & team workspaces", "Billing & subscription flows", "Admin and customer dashboards", "CI/CD, staging & production", "Handoff docs & support period"],
        stack: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Redis", "Stripe", "Razorpay", "AWS", "Vercel"],
        work: ["limityourapi", "startupdeck"],
        faqs: [
            { q: "How long does it take to build a SaaS product?", a: "Most SaaS builds take 8–12 weeks from kickoff to launch, depending on scope. A focused MVP can be quicker. You get a detailed timeline after the discovery call, before any commitment." },
            { q: "Can you add subscriptions and payments?", a: "Yes. We integrate Stripe or Razorpay for subscriptions, trials, usage-based pricing, invoices and webhooks, and connect them to plan limits inside your app." },
            ownershipFaq,
        ],
        cta: { title: "Let's build your SaaS product", text: "Need a custom dashboard, secure subscriptions or automated workflows? Tell us about it and we'll map out the architecture." },
        related: ["/solutions/mvp-development", "/services/ai-development", "/solutions/startups"],
    },
    "ai-development": {
        slug: "ai-development",
        path: "/services/ai-development",
        kind: "Services",
        serviceType: "AI development",
        navLabel: "AI Development",
        summary: "LLM features, RAG over your data and AI agents.",
        seo: {
            title: "AI Development Services",
            description: "Custom AI development: LLM integrations, RAG over your documents, agentic workflows and AI automation built into your product with OpenAI, Anthropic or open-source models.",
        },
        badge: "AI Engineering",
        titleTop: "AI features that",
        titleAccent: "do real work.",
        intro: "We build production-ready AI features — not generic wrappers. Custom pipelines, search over your own data and agents that automate real business workflows.",
        icon: AiBrain01Icon,
        facts: [{ label: "Typical timeline", value: "Scoped after discovery" }, { label: "Starting at", value: "Custom quote" }, quoteFact, ownershipFact],
        features: [
            { icon: AiBrain01Icon, title: "LLM integration", description: "Custom prompting layers and integrations with OpenAI, Anthropic and open-source models." },
            { icon: AiNetworkIcon, title: "Agentic workflows", description: "Agents that run multi-step tasks and call your tools and APIs, with guardrails and logging." },
            { icon: DatabaseIcon, title: "Vector search & RAG", description: "Retrieval-augmented generation with pgvector, Pinecone or Milvus, so answers come from your own documents." },
            { icon: WorkflowSquare01Icon, title: "Document pipelines", description: "Classification, semantic search, summaries and extraction over unstructured text and email." },
            { icon: ViewIcon, title: "Computer vision", description: "Custom models with TensorFlow or PyTorch for pose detection, video analytics and document layout." },
            { icon: CpuIcon, title: "Cost & latency tuning", description: "Response caching, model selection and quantized setups to keep AI features fast and affordable." },
        ],
        idealFor: ["Products adding AI search, chat or copilots", "Teams drowning in documents, tickets or email", "Operations that repeat the same judgement calls daily"],
        deliverables: ["Use-case & data review", "Model and provider selection", "RAG pipeline / vector store", "Agent tools & guardrails", "Evaluation set & monitoring", "Cost and latency report"],
        stack: ["OpenAI", "Anthropic", "pgvector", "Pinecone", "Milvus", "Python", "TypeScript", "PyTorch", "TensorFlow"],
        work: ["startupdeck", "limityourapi"],
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
        summary: "Internal tools, CRMs, portals and APIs built around you.",
        seo: {
            title: "Custom Software Development Services",
            description: "Custom software development: internal tools, CRM and ERP platforms, APIs and data integrations designed around how your business actually works.",
        },
        badge: "Custom Software",
        titleTop: "Software shaped around",
        titleAccent: "how you work.",
        intro: "Off-the-shelf software rarely fits how you work. We design and build internal dashboards, management portals and APIs around your business logic — not the other way round.",
        icon: SourceCodeIcon,
        facts: [{ label: "Typical timeline", value: "4–8 weeks" }, { label: "Starting at", value: "₹1,49,999" }, quoteFact, ownershipFact],
        features: [
            { icon: WorkflowSquare01Icon, title: "Business automation", description: "Replace repetitive tasks, paper workflows and manual data entry with event-driven software." },
            { icon: Table01Icon, title: "Custom CRM & ERP", description: "Portals for sales pipelines, clients, resources and inventory, designed for your exact workflow." },
            { icon: ConnectIcon, title: "Data integrations", description: "Connect external APIs, legacy databases and live metrics under one clean schema." },
            { icon: TerminalIcon, title: "APIs & services", description: "Backends in Go or Node.js, built for high concurrency, low latency and predictable behaviour." },
            { icon: LockIcon, title: "Security built in", description: "Encryption, permission checks, XSS/CSRF protection and compliance-ready design." },
            { icon: CodeIcon, title: "Maintainable code", description: "Strictly typed TypeScript, unit tests and modular architecture that stays easy to change." },
        ],
        idealFor: ["Teams running the business on spreadsheets", "Companies outgrowing generic SaaS tools", "Operations stitched together with copy-paste"],
        deliverables: ["Workflow mapping session", "Data model & permissions", "Web app or internal portal", "Integrations with your tools", "Training & documentation", "Support period after launch"],
        stack: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "MongoDB", "Docker", "AWS"],
        work: ["scopeci", "limityourapi"],
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
        summary: "Fast, SEO-ready websites and web platforms in Next.js.",
        seo: {
            title: "Web Development & E-Commerce Services",
            description: "Custom Next.js websites and web platforms: fast, accessible and SEO-ready, with headless CMS and e-commerce options. Built to turn visitors into enquiries.",
        },
        badge: "Web Development",
        titleTop: "Websites that load fast",
        titleAccent: "and convert.",
        intro: "Custom-coded websites that look sharp and load fast. With a headless CMS and careful technical SEO, we help growing brands get found and turn visitors into customers.",
        icon: Globe02Icon,
        facts: [{ label: "Typical timeline", value: "2–3 weeks (e-commerce 4–6)" }, { label: "Starting at", value: "₹49,999" }, quoteFact, ownershipFact],
        features: [
            { icon: BrowserIcon, title: "Next.js websites & stores", description: "Marketing sites and headless e-commerce on Shopify or a custom backend, built for fast page loads." },
            { icon: PaintBoardIcon, title: "Custom UI/UX design", description: "Custom layouts, spacing systems, considered typography and purposeful animation." },
            { icon: Search01Icon, title: "Technical SEO", description: "Server-side rendering, XML sitemaps, semantic headings and structured data built in." },
            { icon: LayoutGridIcon, title: "Headless CMS", description: "Your team edits pages, posts and products without touching code." },
            { icon: AccessIcon, title: "Accessibility (WCAG AA)", description: "Accessible markup, keyboard navigation, screen-reader support and clear contrast." },
            { icon: CloudServerIcon, title: "Edge deployment", description: "Continuous deployment, image optimization and global CDN caching." },
        ],
        idealFor: ["Brands moving off WordPress or page builders", "Companies whose site isn't generating leads", "Launches that need to make a strong first impression"],
        deliverables: ["Sitemap & content plan", "Custom design in Figma", "Next.js build with CMS", "Technical SEO setup", "Analytics & conversion tracking", "Performance & accessibility pass"],
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Headless CMS", "Shopify", "Vercel"],
        work: ["startupdeck", "limityourapi"],
        faqs: [
            { q: "How long does a website take?", a: "A marketing website usually takes 2–3 weeks. E-commerce stores take 4–6 weeks. You'll get an exact timeline once we've agreed the pages and features." },
            { q: "Will my site be SEO-friendly?", a: "Yes. Pages are server-rendered with clean semantic HTML, sitemaps, metadata, structured data and fast load times — the technical foundations search engines look for." },
            { q: "Can my team edit content without a developer?", a: "Yes. We connect a headless CMS so your team can update pages, posts and products themselves, without touching code." },
        ],
        cta: { title: "Upgrade your website", text: "Ready to move from a template to a fast, custom Next.js site? Let's plan it together." },
        related: ["/services/saas-development", "/solutions/startups", "/services/custom-software"],
    },
    startups: {
        slug: "startups",
        path: "/solutions/startups",
        kind: "Solutions",
        serviceType: "Product development for startups",
        navLabel: "For Startups",
        summary: "A technical partner from first prototype to first hires.",
        seo: {
            title: "SaaS & Product Development for Startups",
            description: "Product engineering for startups: ship fast with clean, modular code your future team and investors can trust. You own 100% of the code.",
        },
        badge: "For Startups",
        titleTop: "Your technical partner,",
        titleAccent: "from idea to first hires.",
        intro: "Startups need more than a mock-up. They need stable, modular code that earns customer trust and holds up to technical due diligence. We build products ready for launch — and for your next engineers.",
        icon: ChartIncreaseIcon,
        facts: [{ label: "Typical timeline", value: "4–8 weeks to launch" }, { label: "Starting at", value: "₹49,999" }, quoteFact, ownershipFact],
        features: [
            { icon: CodeIcon, title: "Investor-ready stack", description: "Modular, strictly typed Next.js and TypeScript that future developers can read, inherit and scale." },
            { icon: Calendar03Icon, title: "Speed to market", description: "Coding starts within 48 hours of design approval, focused on the core user loop." },
            { icon: PaintBoardIcon, title: "Pitch-ready prototypes", description: "Clickable Figma designs and live sandbox environments to show investors and early users." },
            { icon: Key01Icon, title: "No lock-in", description: "You own 100% of the repository, assets, database and accounts." },
            { icon: Target02Icon, title: "Iterative scoping", description: "Flexible sprints, so features can shift as user feedback comes in." },
            { icon: UserGroupIcon, title: "Hiring support", description: "Help interviewing your first in-house developers, plus detailed architecture handover." },
        ],
        idealFor: ["Non-technical founders who need a technical partner", "Funded teams that need to ship before hiring", "Founders preparing for technical due diligence"],
        deliverables: ["Product & scope workshop", "Clickable prototype", "Production MVP", "Analytics & feedback loops", "Architecture handover docs", "Help hiring your first engineers"],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Vercel", "AWS", "Figma"],
        work: ["startupdeck", "scopeci"],
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
        summary: "Ship a working first version fast — without a rewrite later.",
        seo: {
            title: "SaaS MVP Development & Rapid Prototyping",
            description: "MVP development without technical debt: ship your SaaS MVP fast on a production-grade stack (Next.js, TypeScript, PostgreSQL) that won't need a rewrite.",
        },
        badge: "MVP Development",
        titleTop: "Launch your MVP",
        titleAccent: "without technical debt.",
        intro: "Shipping fast doesn't mean cutting corners. We build production-ready MVPs on a modern stack (Next.js, TypeScript, PostgreSQL), so your codebase is an asset for your future team, not a rewrite.",
        icon: PackageIcon,
        facts: [{ label: "Typical timeline", value: "4–8 weeks" }, { label: "Starting at", value: "₹1,49,999" }, quoteFact, ownershipFact],
        features: [
            { icon: CheckListIcon, title: "Lean feature scoping", description: "Cut nice-to-haves and focus on the core loop users will pay for." },
            { icon: CodeIcon, title: "No-debt code", description: "Even when moving fast: modular components, clean schemas and type-safe APIs." },
            { icon: DatabaseIcon, title: "Scale-ready database", description: "PostgreSQL or MongoDB schemas designed to grow with real usage after launch." },
            { icon: UserMultipleIcon, title: "Onboarding flows", description: "Email and social sign-in, roles and customer workspaces by default." },
            { icon: GitBranchIcon, title: "CI/CD from day one", description: "Deploy to production early, with a staging preview for every pull request." },
            { icon: CreditCardIcon, title: "Payments ready", description: "Subscriptions or usage pricing with Stripe or Razorpay." },
        ],
        idealFor: ["Validating an idea with real users", "Replacing a no-code prototype that hit its limits", "Preparing a demo for investors or a pilot customer"],
        deliverables: ["Scope & feature priority list", "UX flows & UI design", "Working MVP in production", "Auth, billing & admin", "Analytics to measure traction", "Roadmap for version two"],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "MongoDB", "Stripe", "Razorpay", "Vercel"],
        work: ["scopeci", "startupdeck"],
        faqs: [
            { q: "How fast can you ship an MVP?", a: "Most MVPs launch in about 4–8 weeks, depending on scope. We agree the core features up front so the timeline stays predictable." },
            { q: "What if we need to change features mid-way?", a: "That's normal. Minor additions are absorbed. For bigger changes we send a clear quote and timeline update within 24 hours — no surprises." },
            { q: "Will we need to rebuild it later?", a: "No. The MVP is built on the same production-grade stack you'd use at scale, so version two builds on top of it instead of starting over." },
        ],
        cta: { title: "Turn your idea into a working product", text: "Ready to turn your wireframes or idea into a secure, working web app? Let's build your core." },
        related: ["/solutions/startups", "/services/saas-development", "/services/web-development"],
    },
    "business-automation": {
        slug: "business-automation",
        path: "/solutions/business-automation",
        kind: "Solutions",
        serviceType: "Business process automation",
        navLabel: "Business Automation",
        summary: "Replace spreadsheets and manual steps with software.",
        seo: {
            title: "Business Automation & Workflow Engineering",
            description: "Business process automation: replace spreadsheets and manual work with custom workflows, integrations, dashboards and secure client portals.",
        },
        badge: "Business Automation",
        titleTop: "Take the manual work",
        titleAccent: "out of operations.",
        intro: "Manual admin leaks hours and money. We build integrations, scheduled jobs and secure dashboards that remove the friction — and the spreadsheets — from your operations.",
        icon: WorkflowSquare01Icon,
        facts: [{ label: "Typical timeline", value: "Scoped after discovery" }, { label: "Starting at", value: "Custom quote" }, quoteFact, ownershipFact],
        features: [
            { icon: WorkflowSquare01Icon, title: "Operational workflows", description: "Turn human processes into software rules: notifications, approvals and status syncing." },
            { icon: DatabaseIcon, title: "Data syncs", description: "Connect spreadsheets, local SQL databases and SaaS tools into one real-time data layer." },
            { icon: Analytics01Icon, title: "Live dashboards", description: "Inventory, sales and operations metrics on a single live dashboard." },
            { icon: Calendar03Icon, title: "Scheduled automations", description: "Automatic PDF invoices, weekly Slack summaries, backups and report dispatch." },
            { icon: ApiIcon, title: "No-code bridges", description: "Clean API scripts connecting Webflow, Bubble or Airtable to your core backend." },
            { icon: SecurityCheckIcon, title: "Secure client portals", description: "Give clients, vendors and staff their own views with row-level permissions." },
        ],
        idealFor: ["Teams re-typing data between tools", "Businesses running on shared spreadsheets", "Managers waiting on manual weekly reports"],
        deliverables: ["Process & bottleneck audit", "Automation plan with priorities", "Integrations & scheduled jobs", "Live dashboards", "Role-based portals", "Monitoring & alerts"],
        stack: ["Node.js", "Go", "PostgreSQL", "Slack API", "Airtable", "Webflow", "AWS"],
        work: ["scopeci", "limityourapi"],
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
export const servicePages = marketingPageList.filter((p) => p.kind === "Services");
export const solutionPages = marketingPageList.filter((p) => p.kind === "Solutions");

/** Shared four-step process shown on every marketing page. */
export const marketingProcess = [
    { step: "01", title: "Discovery", text: "We learn your goals, users and constraints, then agree scope, timeline and a written quote." },
    { step: "02", title: "Design", text: "Clickable Figma prototypes so you see exactly what you're getting before code is written." },
    { step: "03", title: "Build", text: "Production-grade code with weekly demos and a staging URL to follow progress." },
    { step: "04", title: "Launch & support", text: "Testing, deployment and a support period after launch. The code and IP are yours." },
];

