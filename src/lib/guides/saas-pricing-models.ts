import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "saas-pricing-models",
    path: "/guides/saas-pricing-models",
    category: "Planning",
    title: "SaaS pricing models explained: which one should you choose?",
    seo: {
        title: "SaaS Pricing Models Explained for Founders",
        description:
            "Flat rate, tiered, per seat, usage-based, freemium and hybrid SaaS pricing compared, plus the billing each needs: proration, metering, trials and mandates.",
    },
    summary: "Six SaaS pricing models compared, the billing work each one creates, and how to choose for a first version.",
    answer: "The main SaaS pricing models are flat rate, tiered, per seat, usage-based, freemium and hybrid. For a first version, most founders do best with one flat plan or two to three tiers, because they are easy to explain and simple to bill. Per-seat and usage-based pricing fit products whose value grows with team size or volume, but they need more billing work.",
    takeaways: [
        "Choose the model that matches how customers get value: per team member, per unit of usage or per feature set.",
        "Every model beyond a single flat plan adds billing work: proration, seat counts, metering, trials and plan changes.",
        "In India, recurring rupee payments run on RBI e-mandates and UPI AutoPay, which shapes renewals and upgrades.",
        "Launch with simple plans, store prices and limits as data, and add seats or usage pricing once you see real usage.",
    ],
    sections: [
        {
            id: "six-saas-pricing-models",
            heading: "The six SaaS pricing models",
            blocks: [
                {
                    type: "list",
                    items: [
                        "**Flat rate.** One price, one feature set, billed monthly or yearly. The easiest to sell and build, but it charges a solo user and a large team the same.",
                        "**Tiered.** Two to four plans, such as Basic, Pro and Business, that differ by features or limits. Widely used, because it lets customers grow into higher plans.",
                        "**Per seat.** A price for each user on the account. Easy to predict for both sides and natural for team tools, but customers may share logins to save money.",
                        "**Usage-based.** Customers pay for what they use: API calls, messages, documents processed or storage. Fair, and it tracks your own costs, but bills vary month to month.",
                        "**Freemium.** A free plan with limits, alongside paid plans. It is a way to acquire customers more than a pricing model, and free users still cost you hosting and support.",
                        "**Hybrid.** A combination, usually a base fee per tier with seats or usage included and a charge for anything above. Common once a product matures.",
                    ],
                },
                {
                    type: "p",
                    text: "A free trial is different from freemium: the trial gives full access for a limited time, then asks for payment. Freemium gives limited access with no end date.",
                },
            ],
        },
        {
            id: "pricing-models-compared",
            heading: "SaaS pricing models compared",
            blocks: [
                {
                    type: "table",
                    caption: "SaaS pricing models compared by fit, billing work and risk",
                    head: ["Model", "Best for", "Billing work to build", "Main risk"],
                    rows: [
                        ["Flat rate", "One clear use case, one type of customer", "Low: one plan, renewals, failed payments", "Leaves money on the table with larger customers"],
                        ["Tiered", "Products with clear basic and advanced needs", "Medium: plan limits, upgrades, downgrades, proration", "Too many tiers confuse buyers"],
                        ["Per seat", "Collaboration and team tools", "Medium: seat counts, invitations, mid-cycle seat changes", "Shared logins and slower team adoption"],
                        ["Usage-based", "APIs, messaging, AI features, infrastructure", "High: metering, usage dashboards, alerts, variable invoices", "Unpredictable bills for customers and revenue for you"],
                        ["Freemium", "Products that spread through free users", "Medium: limits, abuse prevention, upgrade prompts", "Many free users who never pay"],
                        ["Hybrid", "Mature products with mixed customer sizes", "High: everything above, combined", "Hard to explain on a pricing page"],
                    ],
                },
            ],
        },
        {
            id: "billing-you-must-build",
            heading: "How each model changes the billing you must build",
            blocks: [
                {
                    type: "p",
                    text: "Your payment gateway collects money. Your product still has to know what each customer may use and what to charge next. These are the parts that grow with the pricing model.",
                },
                {
                    type: "list",
                    items: [
                        "**Plans and limits.** Every model needs a record of each account's plan and limits, checked wherever a feature or limit applies. Attach it to the organization, not the individual user.",
                        "**Trials.** Decide whether a trial needs a payment method up front, what emails go out before it ends, and what happens to data if the customer does not pay.",
                        "**Upgrades, downgrades and proration.** Proration charges or credits the difference when a plan changes mid-cycle. Upgrades usually apply at once; downgrades usually wait for the period end, and you must decide what happens when usage is above the new limit.",
                        "**Seat changes.** Adding a member mid-month needs a rule: charge a prorated amount now, or settle at the next renewal.",
                        "**Metering.** Usage pricing needs every billable event recorded exactly once, totaled per billing period, shown to the customer, and alerted on before limits or large bills.",
                        "**Failed payments.** Retries, reminder emails, a grace period and a clear rule for when access pauses.",
                    ],
                },
                {
                    type: "callout",
                    title: "Recurring rupee payments in India",
                    text: "Under RBI rules, recurring card payments run on e-mandates: the customer authorizes once, gets a notice before each debit, and charges above a set threshold need fresh authentication. UPI AutoPay works in a similar way inside the customer's UPI app. A mandate is registered with a maximum amount, so variable usage bills must stay under it, and a move to a pricier plan may need a new mandate.",
                },
                {
                    type: "p",
                    text: "Mandate rules and thresholds have changed over time, so confirm the current details with your gateway before you set prices. [Stripe vs Razorpay for SaaS](/guides/stripe-vs-razorpay-for-saas) compares how each handles mandates, UPI AutoPay and subscriptions.",
                },
            ],
        },
        {
            id: "choosing-a-pricing-model",
            heading: "How to choose a pricing model for your first version",
            blocks: [
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "**Find your value metric.** Ask what grows when a customer gets more value: users, projects, messages, documents or revenue processed. Price on that, or on tiers that track it.",
                        "**Start with one flat plan or two to three tiers.** You will learn more from your first paying customers than from a pricing spreadsheet.",
                        "**Prefer a free trial over freemium** unless the product spreads when free users invite others.",
                        "**Use usage pricing when your costs scale with usage.** AI features, messaging and API products often do; see [AI chatbot development cost](/guides/ai-chatbot-development-cost) for how model usage adds up.",
                        "**Store prices and limits as data, not code.** Then you can change prices, add a tier or keep early customers on an old plan without a rebuild.",
                        "**Decide on currencies early.** Selling in rupees and dollars usually means separate prices per currency, and sometimes a second gateway.",
                    ],
                },
            ],
        },
        {
            id: "building-saas-billing",
            heading: "Building SaaS billing with StackWise",
            blocks: [
                {
                    type: "p",
                    text: "StackWise's Product Build starts at ₹98,999 (about US$1,050) and includes sign-up, login and user dashboards, Stripe or Razorpay payments and subscriptions, Next.js and TypeScript, and 3 months of support. Every project gets a written quote before work starts.",
                },
                {
                    type: "p",
                    text: "Put your pricing model in the brief you share at discovery, including trials, seats, usage limits and currencies, so the quote covers the billing you actually need. See [SaaS development](/services/saas-development) for the rest of the build.",
                },
            ],
        },
    ],
    faqs: [
        {
            q: "What is the best pricing model for a SaaS startup?",
            a: "For most first versions, one flat plan or two to three tiers works best. They are easy for customers to understand and simple to bill, so you launch sooner. Move to per-seat, usage-based or hybrid pricing once you know how customers use the product and which metric tracks the value they get.",
        },
        {
            q: "What is the difference between freemium and a free trial?",
            a: "A free trial gives full or near-full access for a limited time, such as 14 days, then asks the customer to pay. Freemium offers a limited plan free with no end date, alongside paid plans. Trials suit products that show value quickly; freemium suits products that spread when free users invite others.",
        },
        {
            q: "How does usage-based billing work in SaaS?",
            a: "Your product records every billable event, such as an API call or a message, totals it per customer for each billing period, and charges for that total, often on top of a base fee. You also need a usage dashboard for customers, alerts before limits and protection against counting the same event twice.",
        },
        {
            q: "What is proration in SaaS billing?",
            a: "Proration adjusts a charge when a customer changes plan or seat count partway through a billing period. On an upgrade, the customer pays the difference for the remaining days, or it is added to the next invoice. Most gateways can calculate it, but your product decides when changes apply and what limits change.",
        },
        {
            q: "How do recurring subscription payments work in India?",
            a: "Recurring payments from Indian customers run on RBI-compliant mandates. The customer authorizes a card e-mandate or UPI AutoPay once, receives a notice before each debit, and can cancel from their bank or UPI app. Charges above a threshold need fresh authentication, so build retries and reminders. Check current rules with your gateway.",
        },
        {
            q: "Can I change my SaaS pricing model later?",
            a: "Yes, if plans and limits are stored as data rather than hard-coded. Many products start with tiers and later add seats or usage charges. Decide whether existing customers keep their old plan or move with notice, and test the change against real subscriptions in your gateway's test mode before you announce it.",
        },
    ],
    keywords: [
        "saas pricing models",
        "saas pricing models explained",
        "types of saas pricing models",
        "saas pricing strategy",
        "saas pricing strategy for startups",
        "best pricing model for saas startup",
        "how to price a saas product",
        "how to choose a saas pricing model",
        "saas pricing for first version",
        "flat rate pricing saas",
        "tiered pricing saas",
        "per seat pricing",
        "per user pricing saas",
        "usage-based pricing",
        "usage-based billing saas",
        "metered billing",
        "freemium model saas",
        "freemium vs free trial",
        "free trial vs freemium saas",
        "hybrid pricing model saas",
        "value metric saas pricing",
        "saas pricing comparison",
        "seat-based vs usage-based pricing",
        "saas billing models",
        "subscription pricing models",
        "subscription billing for saas",
        "saas billing system development",
        "what is proration in billing",
        "proration saas",
        "saas upgrades and downgrades billing",
        "how does usage-based billing work",
        "saas free trial billing",
        "failed payment handling saas",
        "dunning for saas",
        "recurring payments india saas",
        "upi autopay for saas",
        "rbi e-mandate subscriptions",
        "saas pricing in india",
        "saas pricing in rupees and dollars",
        "can i change my saas pricing later",
        "how to price ai features in saas",
    ],
    related: [
        "/services/saas-development",
        "/guides/stripe-vs-razorpay-for-saas",
        "/guides/saas-development-cost-india",
        "/guides/multi-tenant-saas-architecture",
    ],
    published: "2026-10-31",
    updated: "2026-10-31",
};

export default guide;
