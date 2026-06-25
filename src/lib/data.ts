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
        title: "LimitYourAPI — API Revenue & Usage Infrastructure",
        category: "Web Apps",
        summary: "The usage infrastructure layer for modern APIs. Meter usage, enforce customer quotas, sync billing, and protect AI costs with one SDK.",
        image: "/projects/limityourapi.png",
        coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop",
        tech: ["Go", "Redis", "PostgreSQL", "Docker", "Kafka", "Kubernetes", "AWS"],
        metrics: [{ label: "Hop Latency", value: "<10ms" }, { label: "Uptime", value: "99.999%" }],
        featured: true,
        caseStudy: {
            problem: "Building usage-based billing and API quota controls in-house is deceptively complex. Custom Redis scripts suffer from race conditions, database rollups hammer PostgreSQL, and syncing subscription events from Stripe in the request path adds hundreds of milliseconds of latency.",
            strategy: "LimitYourAPI is purpose-built API Revenue Infrastructure. It acts as an ultra-fast evaluation layer that checks entitlements, tracks consumption in real-time Redis structures, batches analytics asynchronously to PostgreSQL, and connects seamlessly to payment gates.",
            blueprint: [
                "Architected atomic Redis Lua evaluation scripts to verify customer quotas and traffic controls without lock contention",
                "Constructed high-performance SDK layers with out-of-the-box fail-open fallbacks and automatic exponential backoffs",
                "Designed synchronous webhook integration handlers to update customer entitlements instantly upon payment gate events",
                "Built asynchronous memory-buffered analytics batch loggers to decimate database write latency spikes",
                "Implemented multi-tenant tenant-isolation boundaries across customer lookups and rate limits"
            ],
            results: [
                { metric: "Decision Latency", value: "<10ms", description: "Median decision latency across standard API client entitlement requests" },
                { metric: "Verification", value: "Sub-1ms", description: "Time to verify user AI token counts or computational cost budget states" },
                { metric: "Database Writes", value: "Batch", description: "Decoupled logs from SQL writes to protect API route response speed" },
                { metric: "Quotas Sync", value: "Real-Time", description: "Entitlements profile sync automatically triggered on Stripe or Razorpay hook events" }
            ]
        }
    },
    {
        id: "startupdeck-ai",
        title: "StartupDeckAI — VC-Grade Startup Validation Platform",
        category: "Web Apps",
        summary: "The gold standard for AI-driven startup validation. Empowering founders with clinical-grade market intelligence and investor-ready financial modeling.",
        image: "/projects/startupdeck.png",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        tech: ["Node.js", "PostgreSQL", "Redis", "Next.js", "GraphQL", "gRPC"],
        metrics: [{ label: "Analysis Speed", value: "3.5s" }, { label: "Cache Nodes", value: "1.2M" }],
        featured: true,
        caseStudy: {
            problem: "Founders and analysts waste weeks compiling market data, mapping competitors, and modeling cash flows. Generic AI validation tools offer shallow text essays, lacking VC-grade financial frames, and TAM/SAM/SOM market metrics.",
            strategy: "We built StartupDeckAI as an institutional-grade validation engine. We engineered a composable pipeline that evaluates ventures across 50+ parameters, runs 5-year cash flow projections, maps competitor matrices via vector search, and decouples heavy enrichment tasks to Redis-backed queues.",
            blueprint: [
                "Engineered a composable scoring pipeline running 50+ signal checks across market, financial, and founder vectors",
                "Designed 5-year cash flow models and automated TAM/SAM/SOM sizing engines using dynamic financial projections",
                "Built real-time competitor discovery vectors using pgvector semantic database indexing",
                "Orchestrated background enrichment processes via Redis queue workers to isolate latency from the request path",
                "Developed 1-click investor pitch deck exports and PDF report generation systems"
            ],
            results: [
                { metric: "Report Gen Time", value: "3.5s", description: "Average duration to parse a PRD and generate a competitor matrix" },
                { metric: "Vector Indices", value: "1.2M", description: "Indexed company records scanned during semantic competitor lookups" },
                { metric: "Client Conversion", value: "4.8%", description: "Visitor conversion rate from sandbox validation inputs to paid pro tiers" },
                { metric: "LLM Costs", value: "-40%", description: "Saved API cost overhead by implementing semantic lookup caching in Redis" }
            ]
        }
    },
    {
        id: "codefusionai",
        title: "CodeFusionAI — Multi-User Collaborative Coding Environment",
        category: "Web Apps",
        summary: "Collaborative coding environment with OT synchronization, isolated execution containers, and realtime presence systems.",
        image: "/projects/codefusionai.png",
        coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=2670&auto=format&fit=crop",
        tech: ["Go", "Docker", "WebSockets", "React"],
        metrics: [{ label: "Sync Latency", value: "<15ms" }, { label: "Build Speed", value: "1.4s" }],
        featured: true,
        caseStudy: {
            problem: "Collaborative coding environments require low-latency synchronization and secure user-submitted code compilation. Heavy conflict resolution layers degrade performance, and executing untrusted code poses high sandbox breakout security risks.",
            strategy: "We developed CodeFusionAI. We implemented a lightweight operational transformation (OT) layer prioritizing strict correctness over feature surface. Sandboxed execution workspaces were configured inside isolated Docker containers using strict cgroup resource constraints.",
            blueprint: [
                "Designed a lightweight, high-performance operational transformation (OT) sync engine focusing on strict correctness",
                "Constructed per-session sandboxed execution environments inside Docker containers using strict cgroup limits",
                "Separated user presence, cursor locations, and document edit traffic over dedicated WebSocket communication channels",
                "Built a responsive multi-tab code editor frontend in React supporting file-tree manipulation",
                "Configured Go-based file watcher sync processes between user browsers and sandboxed virtual workspace containers"
            ],
            results: [
                { metric: "Sync Latency", value: "<15ms", description: "Average text cursor and edit synchronization latency over WebSocket connections" },
                { metric: "Build Speed", value: "1.4s", description: "Safe isolated environment spin-up and project compilation execution time" },
                { metric: "Client Uptime", value: "99.98%", description: "Sustained multi-user session connectivity during production scaling" },
                { metric: "Code Gen Accuracy", value: "96.2%", description: "Successful compilations of AI-generated edits inside sandbox test blocks" }
            ]
        }
    },
    {
        id: "promptp",
        title: "PromptP — Real-Time Event-Driven Platform",
        category: "Web Apps",
        summary: "Event-driven realtime platform using Redis Streams, WebSockets, and reconnect-safe synchronization systems.",
        image: "/projects/promptp-square.png",
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
        tech: ["Node.js", "WebSockets", "Redis Streams", "React"],
        metrics: [{ label: "Stream Speed", value: "<2ms" }, { label: "Sync SLA", value: "99.9%" }],
        featured: true,
        caseStudy: {
            problem: "Real-time synchronization systems often drop state updates during client network reconnects or crash when slow clients stall standard fanout channels, leading to mismatched application views and data loss.",
            strategy: "We engineered PromptP. We configured a single source of truth via an append-only event log built on Redis Streams, deriving views dynamically on read. We implemented socket-level backpressure handling to isolate slow clients and designed a reconnect protocol with cursor-resume capabilities.",
            blueprint: [
                "Architected a single source of truth utilizing append-only event logs in Redis Streams, deriving views on read",
                "Configured WebSocket socket-layer backpressure logic to prevent slow clients from stalling fanout systems",
                "Implemented custom client reconnect protocols with cursor resume to guarantee no lost events across drops",
                "Built an interactive real-time dashboard using React and TailwindCSS showing system event streams",
                "Optimized memory footprints on WebSocket worker nodes to support thousands of concurrent active connections"
            ],
            results: [
                { metric: "Stream Speed", value: "<2ms", description: "Average event propagation delay from stream ingress to WebSocket client" },
                { metric: "Sync SLA", value: "99.9%", description: "Data delivery consistency maintained across simulated client network drop sequences" },
                { metric: "Latency", value: "<15ms", description: "Average document update broadcast delay over WebSocket connections" },
                { metric: "Cost Reduced", value: "-35%", description: "Token optimization via caching and prompt pruning rules" }
            ]
        }
    },
    {
        id: "stackwise-platform",
        title: "StackWise — Editorial Web Infrastructure",
        category: "Design & SEO",
        summary: "The custom architectural optimization details behind the StackWise V2 studio site itself.",
        image: "/projects/stackwise-platform.png",
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        tech: ["Next.js", "TypeScript", "TailwindCSS v4", "Framer Motion", "GSAP"],
        metrics: [{ label: "Lighthouse", value: "100/100" }, { label: "Security Grade", value: "A+" }],
        featured: true,
        caseStudy: {
            problem: "Most digital agency websites are built on generic content management systems, heavy page builders, or client-heavy React apps. This blocks search crawler indexing, exhibits low contrast accessibility violations, and relies on unoptimized assets that delay LCP indicators.",
            strategy: "We rebuilt StackWise. We migrated layout routes to Next.js Server Components, rendering all markup pre-compiled in static HTML. We resolved complex custom CSS typography type errors under React 19, purged 8MB of unreferenced images, and secured API contact points with Zod schemas.",
            blueprint: [
                "Migrated root and slug route layouts from Client wrappers to Next.js Server Components",
                "Created static HTML metadata interfaces and structured sitemap generators",
                "Implemented secure response headers middleware (Strict CSP, HSTS, frame options)",
                "Sanitized contact form inputs using Zod objects and in-memory rate limits",
                "Restored focus indicator visibility and enhanced contrast styles to comply with WCAG AA guidelines"
            ],
            results: [
                { metric: "Lighthouse Score", value: "100/100", description: "Performance, Accessibility, Best Practices, and SEO scores on Google PageSpeed Insights" },
                { metric: "Type Safety", value: "Pass", description: "Successfully compiled and built codebase with zero TypeScript warnings" },
                { metric: "Observatory Score", value: "A+", description: "Security headers grade on Mozilla Observatory analyzer" },
                { metric: "DOM Load Speed", value: "0.4s", description: "Initial paint speed on local and Vercel edge networks" }
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
    description: "Container execution sandboxes",
    icon: "https://cdn.simpleicons.org/docker/2496ED"
  },
  {
    name: "Kubernetes",
    description: "Cloud-native scheduling",
    icon: "https://cdn.simpleicons.org/kubernetes/326CE5"
  },
  {
    name: "Python",
    description: "Machine learning & scripting",
    icon: "https://cdn.simpleicons.org/python/3776AB"
  },
  {
    name: "Kafka",
    description: "Distributed event streaming",
    icon: "https://cdn.simpleicons.org/apachekafka/231F20"
  },
  {
    name: "GraphQL",
    description: "Declarative client API querying",
    icon: "https://cdn.simpleicons.org/graphql/E10098"
  },
  {
    name: "gRPC",
    description: "Ultra-fast RPC communication",
    icon: "https://cdn.simpleicons.org/grpc/244C5A"
  },
  {
    name: "OpenTelemetry",
    description: "Observability & tracing hooks",
    icon: "https://cdn.simpleicons.org/opentelemetry/000000"
  },
  {
    name: "Nginx",
    description: "Reverse proxy load balancing",
    icon: "https://cdn.simpleicons.org/nginx/009639"
  },
  {
    name: "Linux",
    description: "Enterprise operating systems",
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

