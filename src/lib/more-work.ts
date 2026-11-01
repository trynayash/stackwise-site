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
        liveUrl: "https://stackwise.yashsuthar.dev",
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
            { label: "Live site", href: "https://stackwise.yashsuthar.dev" },
            { label: "GitHub", href: "https://github.com/trynayash/stackwise-site" },
        ],
    },
];

/** Every project, featured case studies first. */
/**
 * OM ENTERPRISE, a building-materials shop in Naswadi, Gujarat: a real client project, so it leads the work
 * list and the home hero. Facts below come from the shop's live site and the project repository.
 */
export const omEnterprise: CaseStudy = {
    slug: "omenterprise",
    name: "OM ENTERPRISE",
    kind: "Client project",
    tagline: "Catalogue, counter billing and GST invoices for a building-materials shop.",
    status: "Live",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle", "Neon", "Vercel", "Tailwind CSS", "PDFKit", "Tesseract.js", "Vitest", "Playwright"],
    preview: "/projects/omenterprise.webp",
    liveUrl: "https://omenterprise-n.vercel.app",
    repoUrl: "https://github.com/trynayash/om-enterprise",
    metaDescription:
        "OM ENTERPRISE case study: one system for a building-materials shop in Naswadi, Gujarat. A public catalogue of 357 products with an enquiry list, a counter POS with server-side pricing and UPI QR payments, GST-correct A4 bills, an owner's phone app for approvals, and a PostgreSQL database that protects its own history.",
    overview: section(
        "Overview",
        "OM ENTERPRISE sells paints, water tanks, bathware, CPVC, PVC, UPVC and SWR pipes and fittings, and plumbing accessories from a counter on Bodeli Road in Naswadi, Chhota Udaipur district, Gujarat.\n\nStackWise built the shop one connected system: a public website where customers browse 357 products across 8 categories and 9 brands and send an enquiry list as an order request; a point of sale where counter staff complete a sale with prices calculated on the server; an admin dashboard for products, pricing, approvals, payments, bills, customers, staff and reports; and a phone app for the owner to approve discounts and see the day's money from anywhere. All of it reads one price list in one PostgreSQL database."
    ),
    problem: section(
        "Problem",
        "A building-materials counter carries hundreds of items in many sizes and pressure classes, and the prices live in supplier price lists: PDFs, Excel sheets and scanned pages, some with Hindi or Gujarati headings. Customers phoned to ask what was in stock and what it cost, and every answer depended on who picked up.\n\nBilling had its own rules. The shop issues GST documents, so each sale needs the right document type, a gapless number per financial year, and a layout the accountant and customers already trust. Staff needed room to give a discount within a limit, with anything larger approved by the owner even when he was out of the shop."
    ),
    constraints: section(
        "Constraints",
        "No online payment on the public site: customers send a list, the shop confirms availability and price, and payment happens at the counter. The bill PDF had to match the shop's existing A4 bill exactly, down to the layout the owner was used to.\n\nThe system had to run on hosting that costs little or nothing (Vercel and Neon), need no paid service to work, and print names in Hindi and Gujarati. Real bills stay blocked until the owner confirms the GST registration type, because the document rules follow from it."
    ),
    architecture: section(
        "Architecture",
        "Three apps in one Next.js 16 codebase: the public site, the counter POS and the dashboard, plus the owner's phone app. Every one of the 98 API routes passes through the same wrapper: origin check, session, permission, then validation, so authorization is enforced on the server and never by hiding a button.\n\nPricing is one engine, written with exact decimal arithmetic, used by the POS, quotations, website order requests, bills, credit notes and reports. The browser never sends a price; every cart change is re-priced on the server from the active price version.\n\nPostgreSQL (Drizzle, 39 tables, hosted on Neon) protects financial history itself: triggers keep audit logs append-only, freeze a finalized sale, allow issued documents to be cancelled but never edited, and keep document numbers moving forward. Each issued bill stores a complete snapshot, and the A4 PDF renders from that snapshot, so a reprint years later is identical.\n\nThe catalogue importer accepts Excel, CSV, PDF, Word, ODS, HTML and photos; scanned price lists go through OCR in English, Hindi and Gujarati, then into a review queue before anything is published. Payments cover an exact-amount UPI QR with manual UTR verification, cash, card, bank transfer, cheque and split payments, with a Razorpay webhook path built against the published API. Bills go out by email, WhatsApp or a share link."
    ),
    diagram: {
        lanes: [
            {
                label: "At the counter",
                nodes: [
                    { name: "POS sale", detail: "Search by name, SKU or barcode; exact variant and unit" },
                    { name: "Pricing engine", detail: "Server-side, exact decimals, discount limits" },
                    { name: "UPI QR or cash", detail: "Exact amount; UTR verified; split payments" },
                    { name: "A4 bill", detail: "GST document type, gapless number, snapshot PDF" },
                ],
            },
            {
                label: "On the website",
                nodes: [
                    { name: "Catalogue", detail: "357 products, sizes and variants, same price list" },
                    { name: "Enquiry list", detail: "Pick sizes and quantities while browsing" },
                    { name: "Order request", detail: "Name and mobile number; WhatsApp for questions" },
                    { name: "Dashboard", detail: "Shop confirms availability and price" },
                ],
            },
            {
                label: "Behind it",
                nodes: [
                    { name: "Next.js API", detail: "98 routes, one wrapper: origin, session, permission, validation" },
                    { name: "PostgreSQL on Neon", detail: "39 tables; triggers keep history append-only" },
                    { name: "Owner's phone app", detail: "Approvals, today's money, find any bill" },
                ],
            },
        ],
        caption: "One price list and one database behind the website, the counter and the owner's phone. The browser never sets a price.",
    },
    highlights: [
        "Public catalogue with search, filters, variants and an enquiry list that becomes an order request, with WhatsApp one tap away",
        "Counter POS with product, SKU and barcode search, server-calculated carts, personal discount limits and remote approvals",
        "One pricing engine with immutable price versions, effective dates, quantity tiers and an MRP guard",
        "GST documents chosen by registration type: tax invoice, bill of supply, cash memo and credit note, numbered without gaps per financial year",
        "A4 bill PDFs that copy the shop's own layout, with Roboto for the rupee sign and Noto fonts for Hindi and Gujarati names",
        "Payments by exact-amount UPI QR with UTR verification, cash, card, bank transfer, cheque and split payments; Razorpay built in behind a signed, idempotent webhook",
        "Catalogue import from Excel, CSV, PDF, Word, ODS, HTML and photos, with OCR for scanned price lists and a review step before publishing",
        "Owner's phone app for approvals, the day's takings by cash and UPI, and finding any bill by number",
        "Staff accounts with role templates, per-user overrides, counter PINs, an append-only audit log and database row-level security",
        "Inventory ledger, suppliers and purchase receipts built into the schema and switched off until the shop counts its stock",
    ],
    tradeoffs: section(
        "Tradeoffs",
        "No online payments on the website, on purpose. For a counter that deals in pipe lengths and tank sizes, confirming availability and price before money changes hands avoids refunds and arguments, and it matches how the shop already works.\n\nRe-pricing every cart change on the server costs a round trip, but it removes a whole class of bugs where the browser and the bill disagree.\n\nThe database enforces rules the application also enforces. That is deliberate duplication: if a future change to the app gets something wrong, the history of bills and payments still cannot be edited or deleted.\n\nTwo parts are honest about their limits. The Razorpay path was built and tested against simulated signed webhooks, not a live account, and the GST document rules follow published CBIC guidance that the shop's accountant has to confirm before real bills are issued."
    ),
    metrics: [
        { label: "Catalogue", value: "357 products", note: "8 categories and 9 brands, every size listed" },
        { label: "API", value: "98 routes", note: "One wrapper: origin, session, permission, validation" },
        { label: "Tests", value: "157 passing", note: "51 unit, 72 on real PostgreSQL, 34 in the browser" },
    ],
    lessons: section(
        "What I'd do differently",
        "Start with the import. Getting 357 products in from seven file formats and scanned pages took more care than any screen, and until the catalogue was real nothing else could be judged.\n\nThe bill mattered more to the owner than any dashboard. Matching the existing A4 layout exactly was the moment the system felt like his, and it should have come earlier.\n\nThe owner's phone app came last and should have come first. Approving a discount from wherever he is was the feature he used on day one."
    ),
    extraLinks: [
        { label: "Live site", href: "https://omenterprise-n.vercel.app" },
        { label: "GitHub", href: "https://github.com/trynayash/om-enterprise" },
    ],
};

/** Every project, client work first, then the featured studies and the smaller ones. */
export const allWork: CaseStudy[] = [omEnterprise, ...caseStudies, ...moreWork];

export const workBySlug = Object.fromEntries(allWork.map((w) => [w.slug, w])) as Record<string, CaseStudy>;
