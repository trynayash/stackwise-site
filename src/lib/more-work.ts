import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const section = (title: string, body: string) => ({ title, body, hint: "" });

/**
 * Smaller projects shown under "More work". The three featured studies come from the
 * yashsuthar.dev portfolio (src/lib/case-studies.ts); these are StackWise-only.
 */
export const moreWork: CaseStudy[] = [
    {
        slug: "codefusionai",
        name: "CodeFusionAI",
        kind: "Learning platform",
        tagline: "A browser code editor with a course catalog.",
        status: "Live",
        stack: ["React", "TypeScript", "Supabase", "Monaco Editor"],
        preview: "/projects/codefusionai.webp",
        liveUrl: "https://codefusionai.vercel.app",
        repoUrl: "https://github.com/trynayash/CodeFusionAI",
        metaDescription:
            "CodeFusionAI: a learning web app with a Monaco code editor, Supabase accounts, saved snippets, rule-based code tips and a course catalog with progress tracking.",
        overview: section(
            "Overview",
            "CodeFusionAI is a learning web app with a Monaco code editor, Supabase accounts, saved snippets, rule-based code tips and a course catalog with progress tracking."
        ),
        problem: section(
            "Problem",
            "Beginners often need an editor, short explanations and a list of good free lessons in one place, without installing anything."
        ),
        architecture: section(
            "Architecture",
            "CodeFusionAI is a React and Supabase app. It puts a Monaco editor next to rule-based tip panels and links each course lesson to a free video or article. Code runs are simulated for now; there is no server-side execution yet."
        ),
        highlights: [
            "Monaco editor with a picker for 13 languages and snippets saved to Supabase",
            "Rule-based tip panels that use pattern checks to explain code and point out common mistakes",
            "Supabase Auth with email, magic links, Google and GitHub, plus a session timeout warning",
            "Course catalog with lesson progress and certificates stored in Supabase",
            "Row level security policies on the Supabase tables",
        ],
        metrics: [
            { label: "Editor", value: "13 languages", note: "Monaco editor with a language picker" },
            { label: "Sign-in", value: "Supabase", note: "Email, magic link, Google and GitHub" },
            { label: "Code tips", value: "Rule-based", note: "Pattern checks in TypeScript, no AI model calls" },
        ],
        extraLinks: [
            { label: "Live site", href: "https://codefusionai.vercel.app" },
            { label: "GitHub", href: "https://github.com/trynayash/CodeFusionAI" },
        ],
    },
    {
        slug: "promptp",
        name: "PromptP",
        kind: "Productivity tool",
        tagline: "Turns a short prompt into a structured one.",
        status: "Open source",
        stack: ["React", "TypeScript", "Express", "Clerk", "Recharts"],
        preview: "/projects/promptp.webp",
        repoUrl: "https://github.com/trynayash/PromptP",
        metaDescription:
            "PromptP: a web app that turns a short prompt into a longer, structured prompt using role-based templates for writers, designers, developers and marketers.",
        overview: section(
            "Overview",
            "PromptP is a web app that turns a short prompt into a longer, structured prompt using role-based templates for writers, designers, developers and marketers."
        ),
        problem: section(
            "Problem",
            "Short prompts often give weak results from AI tools. Many people do not know what context, structure and detail to add."
        ),
        architecture: section(
            "Architecture",
            "PromptP adds that structure with templates and keyword checks written in TypeScript. It does not call an AI model, so results are instant and free to run."
        ),
        highlights: [
            "Rule-based enhancement engine with role-specific templates",
            "Prompt quality checker and a prompt block builder on an Express API",
            "Public demo page with template, tone, role and industry options",
            "Clerk sign-in, role onboarding and a usage dashboard with Recharts",
            "Free-tier daily limit enforced on the server",
        ],
        metrics: [
            { label: "Engine", value: "Rule-based", note: "Templates and keyword checks, no AI model calls" },
            { label: "Roles", value: "4 templates", note: "Writer, designer, developer and marketer" },
            { label: "API", value: "Express", note: "Enhancement, templates and analytics endpoints" },
        ],
        extraLinks: [{ label: "GitHub", href: "https://github.com/trynayash/PromptP" }],
    },
    {
        slug: "stackwise",
        name: "StackWise",
        kind: "Studio website",
        tagline: "The website you're looking at.",
        status: "Live",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "three.js", "Zod"],
        preview: "/projects/stackwise.webp",
        liveUrl: "https://stackwise-site.vercel.app",
        repoUrl: "https://github.com/trynayash/stackwise-site",
        metaDescription:
            "How the StackWise website is built: Next.js 16 App Router, server-rendered pages, a lazy-loaded 3D hero, scroll-driven motion, structured data and a validated inquiry flow.",
        overview: section(
            "Overview",
            "StackWise's own website: a Next.js App Router site with server-rendered marketing pages, an interactive 3D hero, scroll-driven motion and a two-step project inquiry flow.\n\nIt is built with the same standards as client work, and the full source is public."
        ),
        problem: section(
            "Problem",
            "A studio site has to load fast, read well to search engines and turn visitors into enquiries, while proving the engineering it sells."
        ),
        architecture: section(
            "Architecture",
            "Every page is rendered on the server, so search engines and link previews see real content. Interactive parts (motion, menus, the inquiry form) are small client components inside server-rendered pages.\n\nService, solution, technology and case-study pages are generated from typed content files, and each one emits its own structured data and a generated social-share image."
        ),
        highlights: [
            "Next.js App Router with server-rendered pages, generated metadata, a sitemap and per-page social images",
            "Interactive three.js hero that loads after the page is idle, with a CSS fallback for reduced motion",
            "Scroll-driven motion with Framer Motion: pinned case-study showcase, scroll-lit text and stacking cards",
            "Contact API validated with Zod, with a honeypot and a rate limit",
            "Security headers set in middleware: CSP, HSTS and frame options",
        ],
        tradeoffs: section(
            "Tradeoffs",
            "Motion is there to guide attention, not to decorate, so every effect has a reduced-motion version and the 3D scene never delays first paint."
        ),
        metrics: [
            { label: "Framework", value: "Next.js 16", note: "App Router, server-rendered pages" },
            { label: "Structured data", value: "7 schema types", note: "Organization, Service, FAQ, Breadcrumb and more" },
            { label: "Motion", value: "Reduced-motion aware", note: "Every effect has a calm fallback" },
        ],
        extraLinks: [
            { label: "Live site", href: "https://stackwise-site.vercel.app" },
            { label: "GitHub", href: "https://github.com/trynayash/stackwise-site" },
        ],
    },
];

/** Every project, featured case studies first. */
export const allWork: CaseStudy[] = [...caseStudies, ...moreWork];

export const workBySlug = Object.fromEntries(allWork.map((w) => [w.slug, w])) as Record<string, CaseStudy>;
