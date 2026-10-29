/**
 * Project content copied from the yashsuthar.dev portfolio (src/config/case-studies.ts),
 * so both sites describe the work the same way. Update it there first, then copy it here.
 */

const projectLinks = {
  limityourapi: {
    live: "https://limityourapi.tech",
    // The product repo is private; the public SDK repo is what visitors can open.
    repo: "https://github.com/trynayash/limityourapi-sdk",
    preview: "/projects/limityourapi.webp",
  },
  scopeci: {
    live: "https://scopeci.onrender.com",
    repo: "https://github.com/trynayash/scopecihq",
    preview: "/projects/scopeci.webp",
  },
  startupdeck: {
    live: "https://startupdeck.in",
    preview: "/projects/startupdeck.webp",
  },
} as const;

export type CaseStudyMetric = {
  label: string;
  value: string;
  note: string;
};

export type CaseStudySection = {
  title: string;
  body: string;
  hint: string;
};

/** One step in an architecture lane: a component and what it does there. */
export type DiagramNode = { name: string; detail?: string };

/** A path through the system, read left to right (top to bottom on phones). */
export type DiagramLane = { label: string; nodes: DiagramNode[] };

export type ArchitectureDiagram = { lanes: DiagramLane[]; caption: string };

export type CaseStudy = {
  slug: string;
  name: string;
  /** Short product category shown on cards (StackWise only). */
  kind: string;
  tagline: string;
  status: string;
  stack: string[];
  preview: string;
  liveUrl?: string;
  repoUrl?: string;
  metaDescription: string;
  overview: CaseStudySection;
  problem: CaseStudySection;
  constraints: CaseStudySection;
  architecture: CaseStudySection;
  diagram: ArchitectureDiagram;
  tradeoffs: CaseStudySection;
  metrics: CaseStudyMetric[];
  lessons: CaseStudySection;
  extraLinks: { label: string; href: string }[];
};

const section = (title: string, hint: string, body: string): CaseStudySection => ({
  title,
  hint,
  body,
});

export const caseStudies: CaseStudy[] = [
  {
    slug: "limityourapi",
    name: "LimitYourAPI",
    kind: "Developer SaaS",
    tagline: "API rate limiting SaaS, built end to end.",
    status: "Live",
    stack: ["Go", "React", "Redis", "PostgreSQL", "Docker", "Terraform", "GitHub Actions"],
    preview: projectLinks.limityourapi.preview,
    liveUrl: projectLinks.limityourapi.live,
    repoUrl: projectLinks.limityourapi.repo,
    metaDescription:
      "LimitYourAPI: an API rate limiting SaaS built end to end with Go, Redis Lua scripts, PostgreSQL and React, with SDKs for Node.js, Go and Python, CI in GitHub Actions and a Terraform setup for AWS.",
    overview: section(
      "Overview",
      "One paragraph: what it is, who it's for, your role.",
      "LimitYourAPI is an API rate limiting and usage metering SaaS. Developers add it to their API with an SDK or a REST call, then manage keys, limits and usage in a dashboard.\n\nI built it end to end: the Go API and Redis Lua limiters, the React dashboard, SDKs for Node.js, Go and Python, a Cloudflare Workers edge limiter, the CI pipeline, and a Terraform setup for AWS that is not deployed yet (the API runs on Render)."
    ),
    problem: section(
      "Problem",
      "What broke or what pain existed before you built this?",
      "Most API rate limiting implementations either become inconsistent under concurrency or depend heavily on infrastructure-specific edge products.\n\nA lot of existing tooling lacks application-level context, flexible quota control, or developer-friendly integration flows.\n\nThe goal was a product with predictable behavior under load, low operational overhead, and a clean SDK and dashboard experience."
    ),
    constraints: section(
      "Constraints",
      "Latency budget, consistency model, cost, team size, timeline.",
      "The main engineering constraint was keeping every limit exact under concurrent load without adding a coordination layer.\n\nUsage logging could not slow the request path, so request logs are batched in memory and written to PostgreSQL in the background.\n\nAs a one-person product, it also had to be cheap to run and safe to change often, which is why every push runs the full CI."
    ),
    architecture: section(
      "Architecture",
      "Components, data flow, Redis/Lua/workers — plain language.",
      "The API is written in Go (Gin). Each limiting strategy (token bucket, sliding window, quota and AI spend) is one Lua script that Redis runs atomically, so concurrent requests cannot overshoot a limit.\n\nPostgreSQL stores accounts, API keys and usage history. Request logs are batched and flushed in the background, and a Prometheus-format metrics endpoint reports the service's health.\n\nThe dashboard is React with Vite, React Router and Chart.js. Auth uses JWTs with TOTP two-factor. Stripe and Razorpay billing code exists, but paid plan upgrades are not wired up yet.\n\nSDKs for Node.js (published on npm), Go and Python wrap the API and fail open by default; the Node.js and Python SDKs also retry. A Cloudflare Workers limiter runs checks at the edge.\n\nGitHub Actions runs on every pull request and every push to main: the Go build, vet and tests with the race detector, the frontend build, a syntax check of the edge workers, Terraform validation and an SDK package check. The API runs on Render as a Docker image and the dashboard on Vercel. The repository also holds a Terraform setup for AWS (ECS Fargate, RDS, ElastiCache and autoscaling) and a manual deploy workflow for it that signs in to AWS with OIDC instead of stored keys. Neither has been run yet."
    ),
    diagram: {
      lanes: [
        {
          label: "Request path",
          nodes: [
            { name: "Your API", detail: "Node.js, Go or Python SDK, or a REST call" },
            { name: "Go API", detail: "Stateless; scales out" },
            { name: "Redis", detail: "One Lua script per strategy, run atomically" },
          ],
        },
        {
          label: "Usage, off the hot path",
          nodes: [
            { name: "Request logs", detail: "Batched in memory" },
            { name: "PostgreSQL", detail: "Usage and quota history" },
            { name: "Dashboard", detail: "React and Chart.js" },
          ],
        },
        {
          label: "Delivery",
          nodes: [
            { name: "GitHub Actions", detail: "Go tests, frontend build, Terraform validate" },
            { name: "Render and Vercel", detail: "API as a Docker image; dashboard" },
            { name: "Terraform for AWS", detail: "ECS, RDS, ElastiCache; written, not deployed yet" },
          ],
        },
      ],
      caption: "Every allow or deny is one atomic Lua script in Redis; usage is logged in batches, off the request path.",
    },
    tradeoffs: section(
      "Tradeoffs",
      "What you chose not to do and why.",
      "The system puts exact, application-level quotas ahead of network-level protection.\n\nStateless API instances made scaling simple but put all coordination on Redis, which is why every limit is a single atomic script.\n\nWhen Redis cannot answer, each rule either fails open or fails closed. Failing open is the default, because refusing every request while the limiter is down is usually worse than letting traffic through for a while."
    ),
    metrics: [
      { label: "Limit strategies", value: "4 Lua scripts", note: "Token bucket, sliding window, quota, AI token cost" },
      { label: "CI checks", value: "5 jobs", note: "Go, frontend, edge, Terraform, SDK" },
      { label: "SDKs", value: "Node.js, Go, Python", note: "Plus a Cloudflare Workers limiter" },
    ],
    lessons: section(
      "What I'd do differently",
      "Honest retrospective — one or two bullets in prose.",
      "Shipping a whole product alone taught me as much about the parts around the core as the core itself: the dashboard, SDK ergonomics, billing edge cases, and a deploy pipeline I can trust.\n\nIt also reinforced how much developer trust depends on documentation quality and stable behavior under failure conditions."
    ),
    extraLinks: [
      { label: "Live site", href: projectLinks.limityourapi.live },
      { label: "Docs", href: "https://limityourapi.tech/docs" },
      { label: "GitHub", href: projectLinks.limityourapi.repo },
    ],
  },
  {
    slug: "scopeci",
    name: "ScopeCI",
    kind: "GitHub App for agencies",
    tagline: "Checking agency pull requests against the signed scope.",
    status: "Waitlist",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "GitHub Actions"],
    preview: projectLinks.scopeci.preview,
    liveUrl: projectLinks.scopeci.live,
    repoUrl: projectLinks.scopeci.repo,
    metaDescription:
      "ScopeCI is a GitHub App for software agencies, in development, that checks each pull request against the client contract's approved scope. The public site is a waitlist.",
    overview: section(
      "Overview",
      "What it is and who it's for.",
      "ScopeCI is a tool I am building for software agencies that do fixed-price client work. It is meant to check each pull request against what the client signed, so unapproved work is caught before it ships.\n\nI am building it end to end as a founder and engineer. It is in development: the evaluator and the GitHub and Linear integrations are built and tested but not yet running on real repositories, and the public site is a waitlist."
    ),
    problem: section(
      "Problem",
      "What pain existed before.",
      "Agencies sell scope in contracts and deliver it in repositories. The two drift apart quickly, leading to scope creep, unbilled work, and disputes over what was actually promised.\n\nCI/CD tells you whether code builds; nothing tells you whether it matches the agreement."
    ),
    constraints: section(
      "Constraints",
      "Scope and complexity limits.",
      "The product has to fit into existing agency workflows rather than replace them, so it plugs into GitHub and Linear instead of asking teams to change tools.\n\nThe domain model must stay small enough to be trusted by both engineers and account managers."
    ),
    architecture: section(
      "Architecture",
      "Components and data flow.",
      "A TypeScript API (Express, with PostgreSQL through Drizzle) models contracts, clauses, scope baselines, change orders and deliverables, and links them to Linear issues and GitHub pull requests.\n\nA GitHub App receives pull request events, collects the diff, finds the linked issue, and compares the change with the approved scope. It reports the result as a check run and a pull request comment. It is designed to start by only observing: the check is neutral and never blocks a merge.\n\nThe repository is a pnpm workspace with the API, the waitlist site, a typed API client generated from an OpenAPI spec, and the scope engine with its test fixtures."
    ),
    diagram: {
      lanes: [
        {
          label: "What was sold",
          nodes: [
            { name: "Client contract", detail: "Clauses, scope baseline, deliverables" },
            { name: "ScopeCI API", detail: "TypeScript and Express" },
            { name: "PostgreSQL", detail: "Approved scope" },
          ],
        },
        {
          label: "What gets built",
          nodes: [
            { name: "Linear", detail: "The issue behind the change" },
            { name: "GitHub pull request", detail: "Event sent to the ScopeCI GitHub App" },
            { name: "Scope check", detail: "Diff compared with the approved scope" },
            { name: "Check run and comment", detail: "Flags out-of-scope work; designed not to block" },
          ],
        },
      ],
      caption: "Pull request events drive the check, so scope is reviewed where the code changes.",
    },
    tradeoffs: section(
      "Tradeoffs",
      "What was left out.",
      "I prioritized the contract-to-code loop over general project management features.\n\nBroad PM tooling, time tracking, and invoicing breadth were intentionally deferred to keep the core model coherent."
    ),
    metrics: [
      { label: "Core loop", value: "Contract → Code", note: "Scope tied to delivery" },
      { label: "Driven by", value: "PR events", note: "From a GitHub App" },
      { label: "Built for", value: "Agencies", note: "Multi-client delivery" },
    ],
    lessons: section(
      "What I'd do differently",
      "Retrospective.",
      "Commercial tooling is mostly a domain-modeling problem. Getting contracts, scope changes, and deliverables to relate cleanly matters more than any individual integration."
    ),
    extraLinks: [
      { label: "Waitlist", href: projectLinks.scopeci.live },
      { label: "GitHub", href: projectLinks.scopeci.repo },
    ],
  },
  {
    slug: "startupdeck",
    name: "StartupDeckAI",
    kind: "AI SaaS",
    tagline: "AI startup analysis and pitch decks, built full stack.",
    status: "Live",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "GraphQL", "PostgreSQL", "Redis", "BullMQ"],
    preview: projectLinks.startupdeck.preview,
    liveUrl: projectLinks.startupdeck.live,
    metaDescription:
      "StartupDeckAI: a full-stack AI SaaS. React and TypeScript front end, an Express API on PostgreSQL, a deterministic scoring engine, and 3,400+ automated tests in CI.",
    overview: section(
      "Overview",
      "What the product does and your ownership.",
      "StartupDeckAI is an AI platform that turns a startup idea into market analysis, competitor intelligence, a scored GO / PIVOT / KILL verdict, and a pitch deck.\n\nI built it end to end: the React front end, the API and data model, the analysis engine, the background jobs, payments, and the CI/CD pipeline."
    ),
    problem: section(
      "Problem",
      "Why existing workflows fall short.",
      "Founders juggle spreadsheets, research tabs, and slide templates, and the pitch ends up disconnected from the analysis.\n\nGeneric chatbot output is hard to trust and harder to turn into something investors will read."
    ),
    constraints: section(
      "Constraints",
      "Latency, schema evolution, cost.",
      "AI generation is slow and costs money on every call. An analysis gets a 90-second budget and streams its progress to the browser as it runs, with heartbeats so the proxy in front of the API does not cut the connection.\n\nThe data model had to absorb new signals and a changing product shape without backfills."
    ),
    architecture: section(
      "Architecture",
      "Pipeline, workers, data model.",
      "The front end is React and TypeScript on Vite, with TanStack Query for server state, Zustand for client state, Tailwind CSS and Radix UI for the interface, Recharts for charts, and Three.js and Framer Motion for the interactive layer.\n\nAn Express API serves REST and server-sent events on PostgreSQL through Drizzle ORM, plus a read-only GraphQL endpoint for the internal admin page. Sign-in uses Passport (email and Google OAuth) with sessions in Redis, and payments run on Razorpay.\n\nThe analysis engine runs four LLM stages in parallel and a synthesis stage, then scores eight dimensions with a deterministic formula; every figure carries a source label set in code. The analysis and the pitch deck stream to the browser over server-sent events, and the deck exports to PDF. BullMQ on Redis runs email delivery and scheduled market news and funding jobs.\n\nGitHub Actions runs lint, type checks, 3,400+ unit tests with coverage, an npm audit and Playwright end-to-end tests on every push. When it passes on main, a deploy workflow triggers the API deploy on Render; Vercel builds the front end from main."
    ),
    diagram: {
      lanes: [
        {
          label: "Request path",
          nodes: [
            { name: "Web app", detail: "React, TanStack Query, Tailwind" },
            { name: "API", detail: "Express, REST and SSE" },
            { name: "PostgreSQL", detail: "Drizzle ORM" },
          ],
        },
        {
          label: "Analysis",
          nodes: [
            { name: "Analysis engine", detail: "Four LLM stages in parallel, then synthesis" },
            { name: "Score", detail: "Eight dimensions, GO / PIVOT / KILL" },
            { name: "Pitch deck", detail: "Slides built from the analysis, streamed" },
          ],
        },
        {
          label: "Delivery",
          nodes: [
            { name: "GitHub Actions", detail: "Lint, types, 3,400+ tests, Playwright E2E" },
            { name: "Render", detail: "API deploy triggered when CI passes" },
            { name: "Vercel", detail: "Front end built from main" },
          ],
        },
      ],
      caption: "Slow AI work streams its progress as it runs, and the API deploy follows a passing CI run.",
    },
    tradeoffs: section(
      "Tradeoffs",
      "Opinionated flow vs flexibility.",
      "The platform prioritizes a structured idea-to-deck workflow over open-ended conversation.\n\nRich 3D visuals cost performance budget, so they are kept progressive and responsive."
    ),
    metrics: [
      { label: "Scoring", value: "8 dimensions", note: "Deterministic formula, GO / PIVOT / KILL" },
      { label: "Automated tests", value: "3,400+", note: "Vitest, plus Playwright E2E, in CI" },
      { label: "Core flow", value: "Idea → Deck", note: "Analysis feeds the slides" },
    ],
    lessons: section(
      "What I'd do differently",
      "What surprised you in production.",
      "Additive schema design paid off: pivoting the product from validation to pitch decks did not require a painful migration.\n\nIt also reinforced how SaaS complexity grows once auth, payments, background jobs, and SEO enter the picture, and why a strict CI gate pays for itself."
    ),
    extraLinks: [
      { label: "Live site", href: projectLinks.startupdeck.live },
      { label: "Docs", href: "https://www.startupdeck.in/docs" },
    ],
  },
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c])
) as Record<string, CaseStudy>;

export const caseStudySlugs = caseStudies.map((c) => c.slug);

/** Hostname shown in screenshot frames, e.g. "limityourapi.tech". */
export function displayDomain(study: CaseStudy) {
  return study.liveUrl ? new URL(study.liveUrl).hostname.replace(/^www\./, "") : `${study.slug}.dev`;
}
