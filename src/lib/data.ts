export type ProjectCategory = "Web Apps" | "E-Commerce" | "Mobile" | "Design & SEO";

export type CaseStudy = {
    problem: string;
    strategy: string;
    blueprint: string[];
    results: { metric: string; value: string; description: string }[];
};

export type Project = {
    id: string;
    title: string;
    category: ProjectCategory;
    summary: string;
    image: string;
    coverImage?: string;
    tech: string[];
    metrics: { label: string; value: string }[];
    featured?: boolean;
    caseStudy?: CaseStudy;
};

export const projects: Project[] = [
    {
        id: "limityourapis",
        title: "LimitYourAPI — API Usage Limits and Quotas",
        category: "Web Apps",
        summary: "A service for metering API usage and enforcing per-customer quotas, with SDKs for JavaScript, Go and Python.",
        image: "/projects/limityourapi.png",
        coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop",
        tech: ["Go", "Redis", "PostgreSQL", "React", "Cloudflare Workers", "Docker"],
        metrics: [{ label: "Backend", value: "Go" }, { label: "Quota Store", value: "Redis" }],
        featured: true,
        caseStudy: {
            problem: "Teams that sell API access need to count usage, stop customers at their plan limits and keep those limits in sync with billing. Building this inside every API is repetitive and easy to get wrong under concurrent requests.",
            strategy: "LimitYourAPI puts quota checks in one Go service. Usage counters live in Redis and are updated with Lua scripts so each check is atomic. Plans and customers are stored in PostgreSQL, and payment webhooks update a customer's limits.",
            blueprint: [
                "Go backend that checks quotas and rate limits with atomic Redis Lua scripts",
                "PostgreSQL schema and migrations for organizations, API keys and plans",
                "Billing sync service that updates customer limits from Stripe and Razorpay events",
                "React dashboard for configuring rules and viewing usage",
                "Cloudflare Workers edge router and client SDKs for JavaScript, Go and Python"
            ],
            results: [
                { metric: "Backend", value: "Go", description: "API server for quota checks, API keys and billing webhooks" },
                { metric: "Counters", value: "Redis", description: "Atomic usage counters updated with Lua scripts" },
                { metric: "Data", value: "Postgres", description: "Customers, plans and keys stored in PostgreSQL" },
                { metric: "SDKs", value: "3", description: "Client libraries for JavaScript, Go and Python" }
            ]
        }
    },
    {
        id: "startupdeck-ai",
        title: "StartupDeckAI — Startup Idea Validation",
        category: "Web Apps",
        summary: "A tool that helps founders check a startup idea: it scores the idea, sizes the market with stated assumptions and finds competitors.",
        image: "/projects/startupdeck.png",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        tech: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "pgvector"],
        metrics: [{ label: "Frontend", value: "React" }, { label: "API", value: "Express" }],
        featured: true,
        caseStudy: {
            problem: "Founders spend a lot of time collecting market data, listing competitors and writing investor material. General chat tools give long text answers without a clear structure or stated assumptions.",
            strategy: "StartupDeckAI runs an idea through a structured validation engine and keeps the results together, so the score, the market sizing and the investor outputs use the same evidence.",
            blueprint: [
                "Validation engine that scores an idea from 0 to 100 across problem, market, competition, willingness to pay and execution risk",
                "TAM, SAM and SOM sizing with the assumptions shown",
                "Retrieval with pgvector in PostgreSQL",
                "Redis for caching and background work",
                "Pitch deck and memo outputs built from the same data"
            ],
            results: [
                { metric: "Score", value: "0-100", description: "One verdict scale across five areas of the idea" },
                { metric: "Market", value: "TAM/SAM/SOM", description: "Market sizing with stated assumptions" },
                { metric: "Search", value: "pgvector", description: "Vector search in PostgreSQL" },
                { metric: "Stack", value: "React + Express", description: "React client with an Express and PostgreSQL backend" }
            ]
        }
    },
    {
        id: "codefusionai",
        title: "CodeFusionAI — Browser Code Editor and Course Catalog",
        category: "Web Apps",
        summary: "A learning web app with a Monaco code editor, Supabase accounts, saved snippets, rule-based code tips and a course catalog with progress tracking.",
        image: "/projects/codefusionai.png",
        coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=2670&auto=format&fit=crop",
        tech: ["React", "TypeScript", "Supabase", "Monaco Editor"],
        metrics: [{ label: "Editor", value: "Monaco" }, { label: "Backend", value: "Supabase" }],
        featured: true,
        caseStudy: {
            problem: "Beginners often need an editor, short explanations and a list of good free lessons in one place, without installing anything.",
            strategy: "CodeFusionAI is a React and Supabase app. It puts a Monaco editor next to rule-based tip panels and links each course lesson to a free video or article. Code runs are simulated for now; there is no server-side execution yet.",
            blueprint: [
                "Monaco editor with a picker for 13 languages and snippets saved to Supabase",
                "Rule-based tip panels that use pattern checks to explain code and point out common mistakes",
                "Supabase Auth with email, magic links, Google and GitHub, plus a session timeout warning",
                "Course catalog with lesson progress and certificates stored in Supabase",
                "Row level security policies on the Supabase tables"
            ],
            results: [
                { metric: "Editor", value: "Monaco", description: "Browser code editor with a 13-language picker" },
                { metric: "Auth", value: "Supabase", description: "Email, magic link, Google and GitHub sign-in" },
                { metric: "Code Tips", value: "Rule-based", description: "Pattern checks written in TypeScript, no AI model calls" },
                { metric: "Courses", value: "Progress", description: "Lesson progress and certificates saved per user" }
            ]
        }
    },
    {
        id: "promptp",
        title: "PromptP — Prompt Enhancer",
        category: "Web Apps",
        summary: "A web app that turns a short prompt into a longer, structured prompt using role-based templates for writers, designers, developers and marketers.",
        image: "/projects/promptp-square.png",
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
        tech: ["React", "TypeScript", "Express", "Clerk"],
        metrics: [{ label: "Engine", value: "Rule-based" }, { label: "Auth", value: "Clerk" }],
        featured: true,
        caseStudy: {
            problem: "Short prompts often give weak results from AI tools. Many people do not know what context, structure and detail to add.",
            strategy: "PromptP adds that structure with templates and keyword checks written in TypeScript. It does not call an AI model, so results are instant and free to run.",
            blueprint: [
                "Rule-based enhancement engine with role-specific templates",
                "Prompt quality checker and a prompt block builder on an Express API",
                "Public demo page with template, tone, role and industry options",
                "Clerk sign-in, role onboarding and a usage dashboard with Recharts",
                "Free-tier daily limit enforced on the server"
            ],
            results: [
                { metric: "Engine", value: "Rule-based", description: "Templates and keyword checks, no AI model calls" },
                { metric: "Roles", value: "4", description: "Writer, designer, developer and marketer templates" },
                { metric: "Auth", value: "Clerk", description: "Sign-in and user onboarding" },
                { metric: "API", value: "Express", description: "Endpoints for enhancement, templates and analytics" }
            ]
        }
    },
    {
        id: "stackwise-platform",
        title: "StackWise — Studio Website",
        category: "Design & SEO",
        summary: "How this studio site is built.",
        image: "/projects/stackwise-platform.png",
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        tech: ["Next.js", "TypeScript", "TailwindCSS v4", "Framer Motion", "GSAP"],
        metrics: [{ label: "Framework", value: "Next.js" }, { label: "Forms", value: "Zod" }],
        featured: true,
        caseStudy: {
            problem: "A studio site needs to load fast, be easy for search engines to read and handle contact requests safely.",
            strategy: "The site uses the Next.js App Router with static pages where possible, security headers set in middleware, and a contact API that validates input with Zod.",
            blueprint: [
                "Next.js App Router pages with generated metadata and a sitemap",
                "Security headers in middleware (CSP, HSTS, frame options)",
                "Contact form input validated with Zod and limited by a simple in-memory rate limiter",
                "Motion design with Framer Motion and GSAP",
                "Custom Oughter display font"
            ],
            results: [
                { metric: "Framework", value: "Next.js", description: "App Router with static pages and generated metadata" },
                { metric: "Headers", value: "CSP + HSTS", description: "Security headers set in middleware" },
                { metric: "Forms", value: "Zod", description: "Validated contact API with a rate limit" },
                { metric: "Motion", value: "GSAP", description: "Animations with GSAP and Framer Motion" }
            ]
        }
    }
];

export const technologies = [
  {
    name: "Go",
    description: "High-concurrency systems",
    icon: "https://cdn.simpleicons.org/go/00ADD8"
  },
  {
    name: "Redis",
    description: "In-memory caches & queues",
    icon: "https://cdn.simpleicons.org/redis/DC382D"
  },
  {
    name: "Docker",
    description: "Containers for local services",
    icon: "https://cdn.simpleicons.org/docker/2496ED"
  },
  {
    name: "Python",
    description: "Machine learning & scripting",
    icon: "https://cdn.simpleicons.org/python/3776AB"
  },
  {
    name: "GraphQL",
    description: "Declarative client API querying",
    icon: "https://cdn.simpleicons.org/graphql/E10098"
  },
  {
    name: "Nginx",
    description: "Reverse proxy load balancing",
    icon: "https://cdn.simpleicons.org/nginx/009639"
  },
  {
    name: "Linux",
    description: "Servers and development",
    icon: "https://cdn.simpleicons.org/linux/FCC624"
  },
  {
    name: "WebSockets",
    description: "Real-time state synchronization",
    icon: "https://cdn.simpleicons.org/socketdotio/010101"
  },
  {
    name: "Stripe",
    description: "Usage metrics billing gateways",
    icon: "https://cdn.simpleicons.org/stripe/635BFF"
  },
  {
    name: "Figma",
    description: "UI design & wireframing systems",
    icon: "https://cdn.simpleicons.org/figma/F24E1E"
  },
  {
    name: "Vercel",
    description: "Serverless & static hosting edge",
    icon: "https://cdn.simpleicons.org/vercel/000000"
  },
  {
    name: "MongoDB",
    description: "Flexible document database",
    icon: "https://cdn.simpleicons.org/mongodb/47A248"
  },
  {
    name: "Git",
    description: "Distributed version control",
    icon: "https://cdn.simpleicons.org/git/F05032"
  }
];

