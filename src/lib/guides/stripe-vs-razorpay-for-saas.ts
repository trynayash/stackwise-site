import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "stripe-vs-razorpay-for-saas",
    path: "/guides/stripe-vs-razorpay-for-saas",
    category: "Engineering",
    title: "Stripe vs Razorpay for SaaS Subscriptions in India",
    seo: {
        title: "Stripe vs Razorpay for SaaS Subscriptions",
        description:
            "Stripe vs Razorpay for SaaS in India: recurring payments under RBI e-mandate rules, UPI AutoPay, international cards, invoicing, webhooks and DX.",
    },
    summary: "Recurring payments under RBI rules, UPI AutoPay, global cards, invoicing and webhooks compared.",
    answer:
        "Choose Razorpay if most of your customers pay in rupees: it supports UPI AutoPay, card e-mandates and bank mandates, which matter for recurring payments in India. Choose Stripe if most customers are abroad: its subscription billing, global card coverage and developer tooling are mature and well documented. Some SaaS products use both, routing each customer by billing country.",
    takeaways: [
        "Recurring card payments in India need an RBI-compliant e-mandate, with pre-debit notifications and extra authentication above a threshold.",
        "UPI AutoPay lets Indian customers approve a subscription mandate once in their UPI app.",
        "Stripe is usually the stronger fit for international customers and complex billing; Razorpay for Indian payment methods.",
        "Whichever you pick, drive subscription state from signed webhooks, not from the checkout redirect.",
    ],
    sections: [
        {
            id: "at-a-glance",
            heading: "Stripe vs Razorpay at a glance",
            blocks: [
                {
                    type: "table",
                    caption: "Stripe vs Razorpay for a SaaS product selling from India",
                    head: ["Area", "Stripe", "Razorpay"],
                    rows: [
                        ["Strongest market", "International customers, many currencies", "Indian customers paying in rupees"],
                        ["Indian payment methods", "Indian cards; check current support for other local methods", "Cards, UPI, net banking, wallets and more"],
                        ["Recurring payments in India", "E-mandates for Indian cards", "Card e-mandates, UPI AutoPay and bank mandates (eNACH)"],
                        ["Subscription billing", "Mature: trials, proration, usage-based pricing, customer portal, retries", "Plans, subscriptions, add-ons and payment links; simpler billing logic"],
                        ["Tax and invoicing", "Invoicing, plus a tax product covering many countries", "Invoicing with GST details for Indian businesses"],
                        ["Developer experience", "Extensive docs, typed SDKs, a CLI for local webhook testing", "Good docs, SDKs for major server languages, test mode"],
                        ["Onboarding for Indian businesses", "Has at times been limited or invite-only; check current status", "Built for Indian businesses; KYC needed to go live"],
                        ["Fees", "Check the current pricing page", "Check the current pricing page"],
                    ],
                },
            ],
        },
        {
            id: "recurring-payments-in-india",
            heading: "How recurring payments work in India",
            blocks: [
                {
                    type: "p",
                    text: "The Reserve Bank of India (RBI) sets specific rules for recurring payments to protect customers from unauthorized charges. They apply to any subscription product that collects money from Indian customers, whichever gateway you use.",
                },
                {
                    type: "list",
                    items: [
                        "**Card e-mandates.** The customer registers a mandate on the first payment with additional authentication, such as an OTP. The card issuer sends a pre-debit notification before each charge, and the customer can view or cancel the mandate. Charges above an RBI-set threshold need fresh authentication each time.",
                        "**Issuer support varies.** Not every Indian card supports e-mandates, so some customers will fail at sign-up. Offer another method.",
                        "**UPI AutoPay.** The customer approves a recurring mandate in their UPI app with their UPI PIN. Later debits run automatically after a pre-debit notification, and the customer can pause or revoke the mandate in the app. Debits above a set limit need the PIN again.",
                        "**Bank mandates (eNACH).** Authorized through net banking or a debit card, suited to larger or B2B amounts. Registration takes longer than cards or UPI.",
                        "**No stored card numbers.** Under RBI rules, merchants cannot store full card details. Saved cards work through tokens managed by the gateway and card networks.",
                    ],
                },
                {
                    type: "p",
                    text: "Expect some renewals to fail that would succeed elsewhere. Build retries, reminder emails and an easy way to update the payment method. Thresholds and rules have changed over time, so confirm the current details with your gateway before launch.",
                },
            ],
        },
        {
            id: "international-payments",
            heading: "International customers and currencies",
            blocks: [
                {
                    type: "p",
                    text: "If you sell to customers in the US, UK, Europe, Australia or the Middle East, Stripe is usually the easier fit. It handles many currencies, international cards and wallets, 3D Secure where required, and the self-serve billing international buyers expect, such as plan changes and downloadable invoices.",
                },
                {
                    type: "p",
                    text: "Razorpay can accept international cards once that is enabled on your account, but its strengths are Indian payment methods. Either way, an Indian business receiving money from abroad has foreign exchange documentation to handle; ask your gateway and your accountant what they need.",
                },
                {
                    type: "p",
                    text: "Some products use both: Razorpay for customers paying in rupees, Stripe for everyone else, selected by billing country at checkout. That doubles the integration and testing work, so do it only when both customer groups matter to revenue.",
                },
            ],
        },
        {
            id: "tax-and-invoicing",
            heading: "Tax and invoicing",
            blocks: [
                {
                    type: "p",
                    text: "Both platforms generate invoices and receipts. Stripe offers invoicing and a tax product that calculates sales tax, VAT and GST in many countries; check that it covers your obligations. Razorpay's invoicing supports GST details for Indian businesses. Neither replaces an accountant: confirm that invoice formats, tax registration numbers and place-of-supply rules match what you owe, and keep your own record of every invoice in your database.",
                },
            ],
        },
        {
            id: "developer-experience-and-webhooks",
            heading: "Developer experience and webhooks",
            blocks: [
                {
                    type: "p",
                    text: "Stripe's documentation, typed SDKs and CLI are mature. The CLI forwards test events to your local machine, which speeds up subscription work. Razorpay has solid documentation, SDKs for the major server languages and a test mode with test cards and UPI flows.",
                },
                {
                    type: "p",
                    text: "With either provider, webhooks are the source of truth for subscription state. A browser redirect after checkout can be closed or faked; a webhook is signed by the provider.",
                },
                {
                    type: "list",
                    items: [
                        "**Verify signatures.** Stripe signs events in the Stripe-Signature header, Razorpay in X-Razorpay-Signature. Verify against the raw request body with your webhook secret before parsing.",
                        "**Make handlers idempotent.** Both providers retry failed deliveries, so store processed event IDs and skip repeats.",
                        "**Expect any order.** Events can arrive out of order; fetch the current subscription from the API when in doubt.",
                        "**Respond quickly.** Return a 2xx status fast and do slow work in a background queue.",
                        "**Map events to access.** Stripe's invoice.paid and customer.subscription.updated, or Razorpay's subscription.charged and subscription.halted, should update the plan and limits in your database.",
                    ],
                },
            ],
        },
        {
            id: "how-stackwise-integrates",
            heading: "How StackWise integrates either",
            blocks: [
                {
                    type: "p",
                    text: "Every StackWise Product Build includes Stripe or Razorpay payments and subscriptions; starting prices are on the [pricing page](/pricing). The integration has the same shape with either provider:",
                },
                {
                    type: "list",
                    ordered: true,
                    items: [
                        "Hosted checkout or the provider's payment fields, so card data never touches your servers and PCI DSS scope stays small.",
                        "Customer and subscription IDs stored on the account or tenant record, never card details.",
                        "Signed, idempotent webhook handlers that update plans, seats and limits.",
                        "A billing page for upgrades, downgrades, cancellations and payment-method updates.",
                        "Test-mode runs of renewals, failed payments and cancellations before launch.",
                    ],
                },
                {
                    type: "p",
                    text: "If your product has organizations or teams, billing should attach to the tenant; the [multi-tenant SaaS architecture guide](/guides/multi-tenant-saas-architecture) explains why. See [SaaS development](/services/saas-development) for the rest of the build.",
                },
            ],
        },
    ],
    faqs: [
        {
            q: "Can I use Stripe for recurring payments in India?",
            a: "Yes, for Indian cards Stripe supports recurring payments through RBI-compliant e-mandates, with customer authentication at setup and pre-debit notifications. If you need UPI AutoPay or bank mandates, check Stripe's current support, since India-focused gateways such as Razorpay offer them. Stripe's onboarding for Indian businesses has also changed over time, so confirm availability first.",
        },
        {
            q: "Does Razorpay support UPI AutoPay for subscriptions?",
            a: "Yes. Razorpay supports UPI AutoPay for recurring payments alongside card e-mandates and bank mandates. The customer approves the mandate once in their UPI app with their PIN, gets a notification before each debit and can pause or cancel it from the app. Debits above a set limit need the PIN again.",
        },
        {
            q: "Which is cheaper for SaaS, Stripe or Razorpay?",
            a: "It depends on your payment mix: domestic or international cards, UPI, currency conversion and add-on products such as billing or tax. Fees change, so compare both current pricing pages using your expected volumes. Include the cost of failed renewals and your own integration time, not just the headline rate.",
        },
        {
            q: "Why do subscription renewals fail in India?",
            a: "Recurring payments in India need a valid mandate. Some cards do not support e-mandates, customers can cancel mandates from their bank or UPI app, and charges above a threshold need fresh authentication. Reduce failures by offering UPI AutoPay, sending reminders before renewal, retrying failed charges and making it easy to update the payment method.",
        },
        {
            q: "Can I use both Stripe and Razorpay in one SaaS product?",
            a: "Yes. A common setup routes customers by billing country: Razorpay for customers paying in rupees, Stripe for international customers. Keep one internal subscription model in your database and write an adapter for each provider, so plans, limits and invoices behave the same whichever gateway took the payment.",
        },
    ],
    keywords: [
        "stripe vs razorpay",
        "razorpay vs stripe",
        "stripe vs razorpay for saas",
        "stripe or razorpay for india",
        "razorpay or stripe for startups",
        "best payment gateway for saas in india",
        "payment gateway for subscriptions india",
        "recurring payment gateway india",
        "recurring payments india",
        "subscription billing india",
        "saas billing india",
        "razorpay subscriptions",
        "stripe subscriptions india",
        "stripe billing india",
        "stripe india recurring payments",
        "can i use stripe in india",
        "is stripe available in india",
        "rbi e-mandate rules",
        "rbi e-mandate recurring payments",
        "e-mandate for card payments",
        "pre-debit notification",
        "rbi card tokenization",
        "upi autopay",
        "upi autopay for subscriptions",
        "razorpay upi autopay",
        "enach mandate",
        "why do subscription payments fail in india",
        "stripe international payments india",
        "razorpay international payments",
        "how to accept international payments for saas in india",
        "gst invoicing for saas india",
        "stripe webhooks",
        "razorpay webhooks",
        "stripe webhook signature verification",
        "razorpay webhook signature verification",
        "stripe vs razorpay fees",
        "stripe vs razorpay developer experience",
        "integrate razorpay subscriptions nextjs",
        "integrate stripe subscriptions nextjs",
        "payment integration for saas",
    ],
    related: [
        "/services/saas-development",
        "/guides/multi-tenant-saas-architecture",
        "/industries/fintech",
        "/pricing",
    ],
    published: "2026-10-30",
    updated: "2026-10-30",
};

export default guide;
