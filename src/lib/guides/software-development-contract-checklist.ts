import type { Guide } from "@/lib/guides/types";

const guide: Guide = {
    slug: "software-development-contract-checklist",
    path: "/guides/software-development-contract-checklist",
    category: "Hiring",
    title: "Software development contract checklist: what to put in writing",
    seo: {
        title: "Software Development Contract Checklist",
        description:
            "What to put in a software development contract: scope, milestones, acceptance, change requests, code ownership, NDA, warranty, handover and disputes.",
    },
    summary: "The clauses to check before you hire a developer or agency, and what good wording covers in each.",
    answer: "A software development contract should put in writing the scope and exclusions, milestones with acceptance criteria, how change requests are priced, assignment of all code and IP to you, ownership of design files and accounts, confidentiality, a bug-fix warranty and support terms, termination and handover steps, and governing law with a dispute process. Have a lawyer review it before you sign.",
    takeaways: [
        "Paying for code does not make you its owner; the contract needs a written IP assignment.",
        "Define acceptance criteria for each milestone so \"done\" is testable, not a matter of opinion.",
        "Agree how changes are raised, priced and approved before the first one comes up.",
        "Keep the domain, hosting, repository and payment accounts in your name from day one.",
        "This is a checklist, not legal advice: have a lawyer review the contract.",
    ],
    sections: [
        {
            id: "what-the-contract-includes",
            heading: "What a software development contract includes",
            blocks: [
                {
                    type: "p",
                    text: "Most software deals use two or three documents: a **master services agreement (MSA)** with the legal terms, a **statement of work (SOW)** for each project, and an **NDA**. Small projects often combine them in one agreement, which is fine if every clause below is covered. If they are separate, check which document wins when they conflict.",
                },
                {
                    type: "p",
                    text: "A contract only protects you if you picked the right vendor. [How to choose a SaaS development company](/guides/how-to-choose-a-saas-development-company) covers that step.",
                },
                {
                    type: "callout",
                    title: "This is not legal advice",
                    text: "This checklist describes what to look for. It is not legal advice, and laws differ by country. Have a lawyer review your contract before you sign, especially the IP, liability, termination and dispute clauses.",
                },
            ],
        },
        {
            id: "contract-checklist",
            heading: "The clause-by-clause checklist",
            blocks: [
                {
                    type: "p",
                    text: "Use this table to review a draft or to brief your lawyer.",
                },
                {
                    type: "table",
                    caption: "Software development contract clauses and what to look for",
                    head: ["Clause", "What to look for"],
                    rows: [
                        ["Scope and deliverables", "Features, user roles, platforms and integrations, plus the designs and documentation you receive"],
                        ["Exclusions", "What is not included, such as content writing, data migration, third-party fees or app store fees"],
                        ["Milestones and payments", "Payments tied to delivered and accepted milestones, not to dates alone"],
                        ["Acceptance criteria", "A testing window after each milestone, how defects are reported, and what counts as accepted"],
                        ["Change requests", "Changes raised in writing, estimated for cost and time, and approved before work starts"],
                        ["IP assignment", "All code, designs and documentation assigned to you, worldwide, and when that takes effect"],
                        ["Pre-existing and open-source code", "A permanent license to any reusable vendor code, and a list of open-source licenses used"],
                        ["Accounts and hosting", "Domain, hosting, repository, app store and payment gateway accounts registered in your name"],
                        ["Confidentiality and NDA", "What counts as confidential, how long the duty lasts, and return or deletion of your data at the end"],
                        ["Data protection", "How personal data is secured, in line with laws that apply to you, such as India's DPDP Act, 2023"],
                        ["Warranty and bug fixes", "A defined period after launch when defects in the agreed scope are fixed at no cost"],
                        ["Support and maintenance", "What follows the warranty: scope, response times and monthly cost"],
                        ["Termination", "Notice period, payment for work done, and your right to everything built so far"],
                        ["Handover", "Source code, credentials, documentation and data exports delivered, with time for questions"],
                        ["Liability and indemnity", "A cap on liability, and who covers third-party claims such as IP infringement"],
                        ["Governing law and disputes", "Which law applies, which courts or arbitration seat, and an escalation step before either"],
                    ],
                },
            ],
        },
        {
            id: "scope-acceptance-and-change-requests",
            heading: "Scope, acceptance criteria and change requests",
            blocks: [
                {
                    type: "p",
                    text: "Most disputes start here, because \"done\" was never defined. Write acceptance criteria as checks anyone can run. \"Users can reset their password by email, and the link expires after one hour\" is testable. \"A user-friendly login\" is not.",
                },
                {
                    type: "p",
                    text: "Look for a clear line between a defect (it does not work as agreed) and a change (you now want something different). Some contracts treat a milestone as accepted if you do not respond within the testing window, so put those dates in your calendar.",
                },
                {
                    type: "p",
                    text: "For comparison, at StackWise minor additions under 10% of scope are absorbed, and larger changes get a quote and timeline adjustment within 24 hours.",
                },
            ],
        },
        {
            id: "ip-ownership-and-confidentiality",
            heading: "IP, code ownership, accounts and NDA",
            blocks: [
                {
                    type: "p",
                    text: "In many countries, including India, a contractor who writes code for you can own its copyright until it is assigned to you in writing. Paying the invoice is not the same as owning the work. Check when the assignment takes effect: on signing, on each payment or on final payment.",
                },
                {
                    type: "p",
                    text: "Under Indian copyright law, an assignment that does not state its duration or territory is treated by default as lasting five years and covering only India, so look for worldwide wording for the full term of copyright. Vendors often keep their own reusable tools, which is reasonable if you get a permanent, royalty-free license to use them. Ask for a list of open-source licenses, since some, such as the GPL, attach conditions when you distribute the software.",
                },
                {
                    type: "p",
                    text: "Accounts matter as much as code: the vendor should be a user on your domain, hosting, repository and payment gateway, not the owner. Sign the NDA before you share anything sensitive, and check that it covers your data, not just your idea.",
                },
                {
                    type: "p",
                    text: "StackWise signs NDAs on request before sensitive information is shared, and hands over the full repository, design files, documentation and access to every account, with no licensing fees or lock-in.",
                },
            ],
        },
        {
            id: "warranty-support-termination-handover",
            heading: "Warranty, support, termination and handover",
            blocks: [
                {
                    type: "list",
                    items: [
                        "**Warranty.** Set response times by severity: a broken checkout needs a faster fix than a typo. New features and problems caused by someone else's changes sit outside it.",
                        "**Support.** After the warranty, a retainer needs its own scope, response times and price; see what [maintenance and support](/services/maintenance-support) can cover. StackWise includes one to three months of support, depending on the plan, then an optional monthly retainer.",
                        "**Termination.** Look for a notice period, payment for work completed to that date, and delivery of everything built so far, including unfinished code.",
                        "**Handover.** Name the deliverables: repository, credentials, documentation, database exports and a short window for questions, so another team could pick up the work.",
                    ],
                },
            ],
        },
        {
            id: "governing-law-and-disputes",
            heading: "Governing law and dispute resolution",
            blocks: [
                {
                    type: "p",
                    text: "The contract should name the law that applies and where disputes are heard: specific courts or an arbitration seat. Many contracts add an escalation ladder first, such as a meeting between senior people, then mediation. If you and the vendor are in different countries, ask your lawyer whether a judgment or award could be enforced where the vendor is based.",
                },
                {
                    type: "p",
                    text: "In India, agreements are generally subject to state stamp duty, and electronic signatures are recognized under the Information Technology Act, 2000. Your lawyer can confirm the stamping and signing steps for your agreement. Hiring from abroad? See [outsourcing software development to India](/guides/outsourcing-software-development-to-india).",
                },
            ],
        },
    ],
    faqs: [
        {
            q: "What should be included in a software development contract?",
            a: "At minimum: scope and exclusions, milestones and payments, acceptance criteria, change requests, IP assignment, ownership of design files and accounts, confidentiality, a bug-fix warranty, support, termination and handover, liability limits, and governing law with a dispute process. Have a lawyer review the final draft.",
        },
        {
            q: "Who owns the source code if I pay a developer to build software?",
            a: "Not automatically you. In India and many other countries, a contractor who writes code can own its copyright until it is assigned in writing. Make sure the contract assigns all code, designs and documentation to you, worldwide and for the full term of copyright, and that the repository and every account are in your name.",
        },
        {
            q: "What is the difference between an MSA and an SOW?",
            a: "A master services agreement (MSA) sets the legal terms for the whole relationship: IP, confidentiality, liability, payment terms and disputes. A statement of work (SOW) describes one project under it: features, deliverables, timeline, price and acceptance criteria. With an MSA in place, each new project needs only a new SOW.",
        },
        {
            q: "What is a warranty period in a software development contract?",
            a: "A set period after launch when the developer fixes defects in the agreed scope at no extra cost. Check how long it lasts, how a defect is defined, how fast urgent issues get a response, and what is excluded, such as new features or problems caused by changes someone else made.",
        },
        {
            q: "Do I need an NDA before talking to a software development company?",
            a: "If you will share anything sensitive, such as an unreleased product idea, customer data, financials or source code, yes. Sign it before that information changes hands. Check what counts as confidential, how long the duty lasts, and that your data is returned or deleted when the work ends. Hesitation to sign one is a warning sign.",
        },
    ],
    keywords: [
        "software development contract checklist",
        "software development contract",
        "software development agreement",
        "software development agreement checklist",
        "what to include in a software development contract",
        "what to put in writing before hiring a developer",
        "software development contract clauses",
        "software development contract india",
        "web development contract checklist",
        "website development agreement",
        "app development contract checklist",
        "contract with software development agency",
        "freelance developer contract",
        "statement of work software development",
        "master services agreement software development",
        "msa vs sow",
        "acceptance criteria in software contract",
        "milestone payments software development",
        "change request clause software contract",
        "change request process software development",
        "ip assignment clause software development",
        "intellectual property in software development contract",
        "who owns the code freelancer or client",
        "who owns source code developer or client",
        "source code ownership clause",
        "copyright assignment software india",
        "open source license clause",
        "nda before hiring a developer",
        "confidentiality clause software development",
        "software warranty period",
        "bug fix warranty clause",
        "post-launch support clause",
        "software maintenance agreement",
        "termination clause software development contract",
        "handover clause software project",
        "hosting account ownership",
        "domain ownership web developer",
        "governing law clause software contract",
        "dispute resolution clause software contract",
        "arbitration clause software development",
        "limitation of liability software contract",
        "stamp duty on software development agreement",
        "is an e-signed contract valid in india",
        "data protection clause dpdp act",
    ],
    related: [
        "/guides/how-to-choose-a-saas-development-company",
        "/guides/hiring-a-software-company-in-mumbai",
        "/services/maintenance-support",
        "/guides/outsourcing-software-development-to-india",
    ],
    published: "2026-10-31",
    updated: "2026-10-31",
};

export default guide;
