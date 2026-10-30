import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "multi-tenant-saas-architecture",
    path: "/guides/multi-tenant-saas-architecture",
    category: "Engineering",
    title: "What Is Multi-Tenant SaaS Architecture?",
    seo: {
        title: "Multi-Tenant SaaS Architecture Explained",
        description:
            "Multi-tenant SaaS architecture explained: shared database with row-level security, schema or database per tenant, isolation, roles, billing and limits.",
    },
    summary: "Tenancy models compared, with PostgreSQL row-level security, isolation, billing, rate limits and migrations.",
    answer:
        "Multi-tenant SaaS architecture means one application serves many customer organizations, called tenants, while keeping each tenant's data separate. The three common models are a shared database with a tenant_id column and row-level security, a schema per tenant, and a database per tenant. Most new SaaS products start with the shared model and move large or regulated tenants to dedicated databases later.",
    takeaways: [
        "A shared database with tenant_id and PostgreSQL row-level security is the sensible default for most new SaaS products.",
        "Schema-per-tenant and database-per-tenant buy stronger isolation at the cost of harder migrations and higher running costs.",
        "Isolation must hold everywhere: queries, caches, file storage, background jobs and search indexes.",
        "Plan per-tenant billing and rate limits from the start; both are painful to retrofit.",
    ],
    sections: [
        {
            id: "what-is-a-tenant",
            heading: "What a tenant is",
            blocks: [
                {
                    type: "p",
                    text: "A tenant is the customer account that owns data in your product, usually a company or team rather than one person. When a company signs up for your project-management app and invites twenty colleagues, the company is the tenant and the twenty people are users inside it.",
                },
                {
                    type: "p",
                    text: "In a multi-tenant system, every tenant runs on the same code and infrastructure. The alternative, single-tenancy, gives each customer a separate deployment: simple to reason about, but expensive to run and slow to update. That is why most SaaS products are multi-tenant, at least at the application layer.",
                },
            ],
        },
        {
            id: "tenancy-models",
            heading: "The three tenancy models compared",
            blocks: [
                {
                    type: "list",
                    items: [
                        "**Shared database, shared schema.** Every tenant-owned table has a tenant_id column, every query filters by it, and PostgreSQL row-level security (RLS) enforces the filter inside the database.",
                        "**Schema per tenant.** One database with a separate schema per tenant, each holding the same tables. The app sets search_path for each request.",
                        "**Database per tenant.** Each tenant gets its own database, sometimes its own server or region. The app looks up the tenant's connection details per request.",
                    ],
                },
                {
                    type: "table",
                    caption: "Multi-tenant database models in PostgreSQL",
                    head: ["Factor", "Shared DB + tenant_id + RLS", "Schema per tenant", "Database per tenant"],
                    rows: [
                        ["Isolation", "Logical, enforced by RLS policies", "Separate tables; relies on search_path and grants", "Strongest, separate database and credentials"],
                        ["Cost per tenant", "Lowest", "Low to medium", "Highest"],
                        ["Migrations", "Run once for everyone", "Run once per schema", "Run once per database, needs orchestration"],
                        ["Cross-tenant reporting", "Plain SQL", "Queries across schemas or a warehouse", "Needs a warehouse or ETL"],
                        ["Noisy-neighbor risk", "Highest", "High, same server", "Lower; lowest on separate servers"],
                        ["Scale of tenant count", "Very large", "Gets hard to manage as schemas multiply", "Best with fewer, larger tenants"],
                        ["Best for", "Most B2B and B2C SaaS", "Moderate tenant counts with per-tenant customization", "Enterprise, regulated or data-residency tenants"],
                    ],
                },
            ],
        },
        {
            id: "tenant-isolation",
            heading: "Tenant isolation with PostgreSQL row-level security",
            blocks: [
                {
                    type: "p",
                    text: "In the shared model, one missing tenant filter can leak data between customers. Row-level security moves that check into the database, so a bug in one query cannot return another tenant's rows.",
                },
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "Add tenant_id to every tenant-owned table and make it the leading column of the indexes those queries use.",
                        "Enable RLS on each table and create a policy such as USING (tenant_id = current_setting('app.tenant_id')::uuid).",
                        "Set the tenant at the start of each transaction with SET LOCAL or set_config(..., true), so the value cannot leak to the next request on a pooled connection.",
                        "Connect the app as a role that does not own the tables. Superusers and roles with BYPASSRLS always skip policies, and table owners skip them unless you also run ALTER TABLE ... FORCE ROW LEVEL SECURITY.",
                        "Write tests that act as tenant A and try to read, update and delete tenant B's records.",
                    ],
                },
                {
                    type: "p",
                    text: "Isolation is wider than the database. Prefix cache keys and file-storage paths with the tenant ID, carry it in every background job, and filter search and vector indexes by tenant. An AI search feature that queries documents without a tenant filter will leak data.",
                },
            ],
        },
        {
            id: "auth-roles-and-billing",
            heading: "Authentication, roles and billing per tenant",
            blocks: [
                {
                    type: "p",
                    text: "Users sign in as people; authorization happens per tenant. A memberships table (user_id, tenant_id, role) lets one person belong to several organizations with a different role in each, such as owner, admin, member or viewer. Resolve the active tenant from the subdomain, URL or a tenant switcher, then check membership on every request. Never trust a tenant ID from the client on its own.",
                },
                {
                    type: "p",
                    text: "Enterprise customers often ask for single sign-on (SAML or OIDC), configured per tenant. Leave room for it even if you build it later.",
                },
                {
                    type: "p",
                    text: "Billing attaches to the tenant, not the user. Store the payment provider's customer and subscription IDs on the tenant record, map plans to limits such as seats, projects or API calls, and update them from webhooks rather than the checkout redirect. The [Stripe vs Razorpay guide](/guides/stripe-vs-razorpay-for-saas) covers how that works with each provider.",
                },
            ],
        },
        {
            id: "noisy-neighbors-and-rate-limiting",
            heading: "Noisy neighbors and rate limiting",
            blocks: [
                {
                    type: "p",
                    text: "On shared infrastructure, one tenant running a huge import or hammering your API can slow everyone else down. The defenses come in layers.",
                },
                {
                    type: "list",
                    items: [
                        "**Per-tenant rate limits** on the API, keyed by tenant and plan, returning 429 responses with a Retry-After header.",
                        "**Queues for heavy work** such as imports, exports and AI jobs, with per-tenant concurrency caps so one tenant cannot occupy every worker.",
                        "**Query guardrails:** statement_timeout, enforced pagination and indexes that start with tenant_id.",
                        "**Per-tenant monitoring,** so you can see who uses what and move a heavy tenant to dedicated resources.",
                    ],
                },
                {
                    type: "p",
                    text: "StackWise built [LimitYourAPI](/work/limityourapi), a developer SaaS for API rate limiting on Go and Redis Lua scripts, so per-tenant limits are a problem it has worked on directly.",
                },
            ],
        },
        {
            id: "migrations",
            heading: "Migrations across tenants",
            blocks: [
                {
                    type: "p",
                    text: "Schema changes are where the models differ most day to day. In a shared database you run one migration. With a schema or database per tenant you run the same migration hundreds of times, and some will fail partway, so you need tooling that records each tenant's version and can retry.",
                },
                {
                    type: "list",
                    items: [
                        "Use expand-and-contract changes: add the new column, backfill, switch the code, then drop the old column in a later release.",
                        "Build indexes on large tables with CREATE INDEX CONCURRENTLY so writes are not blocked. It cannot run inside a transaction block.",
                        "Backfill in batches instead of one huge UPDATE.",
                        "Run migrations in CI against realistic data before they reach production.",
                    ],
                },
            ],
        },
        {
            id: "which-model-to-choose",
            heading: "Which model should you choose?",
            blocks: [
                {
                    type: "p",
                    text: "Start with a shared database, tenant_id on every tenant table and row-level security, unless you already know you need something else. It is the cheapest to run, the simplest to migrate and, tested properly, strong enough isolation for most B2B products.",
                },
                {
                    type: "p",
                    text: "Give some tenants their own database when contracts demand it: data in a specific region, separate encryption keys or separate backups. A hybrid is common, with most tenants in the shared database and a few enterprise tenants on dedicated databases behind the same app. Schema-per-tenant suits a moderate number of tenants that each need custom tables.",
                },
                {
                    type: "p",
                    text: "StackWise designs tenancy as part of its [SaaS development](/services/saas-development) work, starting with the shared model and a documented path to dedicated tenants.",
                },
            ],
        },
    ],
    faqs: [
        {
            q: "What is the difference between single-tenant and multi-tenant SaaS?",
            a: "In single-tenant SaaS, each customer gets a separate copy of the application and database. In multi-tenant SaaS, all customers share one application, and their data is separated by tenant ID, schema or database. Multi-tenant is cheaper to run and easier to update; single-tenant gives maximum isolation and is usually reserved for enterprise or regulated customers.",
        },
        {
            q: "Is PostgreSQL row-level security enough to isolate tenants?",
            a: "It is a strong layer when set up correctly: policies on every tenant table, an application role that neither owns the tables nor has BYPASSRLS, and the tenant set per transaction. It does not protect caches, file storage, search indexes or background jobs, so enforce isolation there too and test it with cross-tenant access tests.",
        },
        {
            q: "Should I use schema-per-tenant in PostgreSQL?",
            a: "Only with a real reason, such as per-tenant custom tables, and a moderate number of tenants. Every schema adds catalog entries, every migration runs once per schema, and backups and connection handling get more complex as you grow. Most products are better served by a shared schema with tenant_id and row-level security.",
        },
        {
            q: "How do you bill tenants in a multi-tenant SaaS?",
            a: "Attach the subscription to the tenant, not to individual users. Store the payment provider's customer and subscription IDs on the tenant record, count seats or usage per tenant, and update plan limits from the provider's webhooks. That way an organization can change owners or add members without breaking its billing.",
        },
        {
            q: "When should a tenant get its own database?",
            a: "Move a tenant to a dedicated database when its contract requires data residency in a specific region, separate encryption keys or separate backups, or when its workload is heavy enough to affect other tenants. If your data layer resolves connections per tenant from the start, that move becomes a configuration change rather than a rewrite.",
        },
    ],
    keywords: [
        "multi-tenant saas architecture",
        "multi tenant architecture",
        "what is multi-tenant architecture",
        "what is a tenant in saas",
        "multi-tenant saas",
        "multi tenant database design",
        "multi-tenant database architecture",
        "how to design a multi-tenant database",
        "how to build a multi-tenant saas",
        "saas tenancy models",
        "multi-tenancy models",
        "single tenant vs multi tenant",
        "single-tenant vs multi-tenant saas",
        "shared database vs database per tenant",
        "schema per tenant postgresql",
        "schema per tenant vs shared schema",
        "database per tenant",
        "hybrid tenancy model",
        "saas tenant isolation",
        "tenant isolation postgresql",
        "data isolation in saas",
        "postgresql row level security multi tenant",
        "postgres rls multi tenancy",
        "row level security saas",
        "postgres rls with connection pooling",
        "tenant_id column design",
        "multi tenant authentication",
        "multi tenant roles and permissions",
        "saas organization and user model",
        "multi tenant subdomain routing",
        "per tenant billing saas",
        "noisy neighbor problem saas",
        "per tenant rate limiting",
        "multi tenant migrations",
        "postgres migrations across schemas",
        "multi tenant vector search isolation",
        "multi tenant saas postgresql",
        "multi tenant saas best practices",
    ],
    related: [
        "/services/saas-development",
        "/guides/stripe-vs-razorpay-for-saas",
        "/guides/how-long-to-build-a-saas",
        "/work/limityourapi",
    ],
    published: "2026-10-30",
    updated: "2026-10-30",
};

export default guide;
