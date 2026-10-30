import { faqs } from "@/lib/faqs";
import { marketingPages } from "@/lib/marketing-pages";
import { allWork } from "@/lib/more-work";
import { quoteBudgets, quoteServices, quoteStages, quoteTimelines } from "@/lib/quote";
import { estimateFor } from "@/lib/quote-estimate";
import { siteConfig } from "@/config/site";
import { approxUsd } from "@/lib/pricing";

/**
 * The quote chat's answer engine. It is deliberately closed: every reply is written here from content
 * already published on the site, so it cannot reveal anything that isn't public.
 *
 * Guardrail layers, in the order they run:
 *   1. Input: screen() catches crisis messages (helplines), encoded payloads, attempts to override the
 *      rules (also when obfuscated, written in Hinglish or split across two messages), questions about
 *      how this site or chat was made, requests for secrets, abuse, and issues that need a person.
 *      redactSensitive() strips card, Aadhaar, PAN and password details before anything is kept.
 *   2. Retrieval: answers come only from the intents below; anything unmatched gets a polite
 *      "not able to answer" with an email button.
 *   3. Output: safeReply() re-checks every reply before it is shown and only allows on-site links.
 *   4. Human hand-off: complaints, disputes and urgent problems go straight to Yash by email.
 */

export type AssistantAction = { kind: "email"; label?: string; subject?: string; body?: string } | { kind: "link"; label: string; href: string };

export type AssistantReply = { text: string; actions?: AssistantAction[]; blocked?: boolean; unanswered?: boolean };

const EMAIL = siteConfig.emails.inbound;

const INVISIBLE = /[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/g;

export function normalise(input: string): string {
    return input
        .replace(INVISIBLE, "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[‘’]/g, "'")
        .replace(/[^a-z0-9₹$'?.\s/+-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/* ───────────────────────── Guardrails ───────────────────────── */

const SITE = String.raw`(this|the|your|ur|ye)\s+(web\s?site|site|page|chat\s?bot|chat|bot|assistant|widget|landing page|portfolio)`;
const VENDOR = String.raw`(chat\s?gpt|gpt[\s-]?\d*|openai|claude|anthropic|gemini|bard|copilot|cursor|v0|lovable|bolt|replit|midjourney|llama|mistral|deepseek|perplexity|grok)`;

const blocked: RegExp[] = [
    // Attempts to override the assistant's rules.
    /\b(bypass|jail\s?break|override|disregard|circumvent)\b/,
    /\b(ignore|forget)\b.{0,30}\b(rules?|instructions?|guard\s?rails?|restrictions?|everything|previous|prior|above|prompts?|filters?|polic(y|ies))\b/,
    /\b(system|hidden|initial|developer|secret)\s+(prompt|message|instructions?|rules?)\b/,
    /\bprompts?\b/,
    /\b(developer|god|dan|admin|debug|sudo|unrestricted)\s+mode\b/,
    /\b(pretend|roleplay|role[\s-]play|you are now|act as|simulate being)\b/,
    /\b(do anything now|from now on you|you must now|new rules?:|override mode)\b/,
    /\b(repeat|print|output|display|reveal|translate|list|dump|summari[sz]e|spell out)\b.{0,30}\b(above|before this|previous (text|message|instructions)|your (rules|instructions|guidelines|programming|configuration|setup))\b/,
    /\b(your|the) (system |hidden |secret |internal |original )?(instructions|guidelines|programming|configuration|training data|knowledge base|source code)\b/,
    // Secrets and internals.
    /\b(api\s?keys?|secrets?|passwords?|passcodes?|tokens?|credentials?|private\s+keys?|ssh keys?|\.env|env(ironment)?\s*(vars?|variables?|file))\b.{0,30}\b(your|the site|stackwise|admin|server|vercel|github|gmail|email account)\b/,
    /\b(your|the|stackwise'?s?|admin|give me|tell me|share|show me|send me|what is|what'?s)\b.{0,30}\b(api\s?keys?|secrets?|passwords?|passcodes?|tokens?|credentials?|private\s+keys?|ssh keys?|\.env|env(ironment)?\s*(vars?|variables?|file))\b/,
    // Hinglish: "who made this website", "which AI did you use", "ignore everything".
    /\b(ye|yeh|is|iss)\s+(website|site|page|chat\s?bot|bot)\b.{0,40}\b(kisne|kis ne|kaun|kaise|kis)\b/,
    /\b(kisne|kis ne)\b.{0,25}\b(banay\w*|banai\w*|banaay\w*|banaai\w*|develop\w*|design\w*)\b/,
    /\b(kaun\s?sa|kaunsa|konsa|kon sa|kaun se|konse)\b.{0,25}\b(ai|a\.i\.|tool|tools|model|software)\b/,
    /\b(sab ?kuch|saare? rules?|rules?)\b.{0,15}\b(ignore|bhool|bhul)\w*/,
    /\b(reveal|leak|expose|dump|show me|tell me|share|give me|send me)\b.{0,40}\b(internal|private|confidential|hidden|backend|database|source code|config(uration)?|server|logs?|admin)\b/,
    /\b(database|server|admin panel|backend|hosting|deploy(ment)?|repo(sitory)?|source code|analytics|logs?)\b.{0,30}\b(of|for|behind|on)\s+(this|the|your)\s+(site|website|chat|bot)\b/,
    // Personal details about the founder.
    /\b(yash|founder|owner|your|you)\b.{0,30}\b(age|how old|salary|income|earn(ings)?|net worth|married|wife|husband|girlfriend|boyfriend|family|home|address|lives?|religion|caste|aadhaar|pan card|bank|personal (number|phone|details))\b/,
    /\b(age|how old|salary|income|net worth|religion|caste|home address)\b.{0,30}\b(yash|founder|owner)\b/,
    // How this site or this chat was made.
    new RegExp(String.raw`\b(who|which|what)\b.{0,40}\b(built|build|made|make|created|create|designed|design|developed|develop|coded|code|wrote|write|generated|generate|powers?|powered|runs?|behind)\b.{0,30}\b${SITE}\b`),
    new RegExp(String.raw`\b${SITE}\b.{0,40}\b(built|made|created|designed|developed|coded|generated|powered|hosted|running|made with|built with|built using)\b`),
    new RegExp(String.raw`\b(tools?|tech(nology|nologies)?|stack|framework|model|llm|ai|platform|cms|template|theme|hosting|host|software|language)\b.{0,40}\b(behind|for|of|in|used|use|on|power(s|ing)?)\b.{0,20}\b${SITE}\b`),
    /\b(what|which)\b.{0,25}\b(ai|a\.i\.|llms?|models?|ai tools?)\b.{0,40}\b(use|used|using|uses)\b/,
    new RegExp(String.raw`\b(what|which)\b.{0,30}\b(hosting|host|server|tech|stack|framework|cms|platform|tools?|language|database|ai|model)\b.{0,30}\b${SITE}\b`),
    new RegExp(String.raw`\b${SITE}\b.{0,30}\b(use|uses|using|run on|runs on|hosted on|built on)\b`),
    /\b(do|did|does)\s+(you|yash|stackwise|they|he)\s+(use|uses|used)\s+(ai|a\.i\.|llms?|ai tools?)\b/,
    new RegExp(String.raw`\b(are|is)\s+(you|this|it)\b.{0,20}\b${VENDOR}\b`),
    new RegExp(String.raw`\b${VENDOR}\b.{0,30}\b(made|built|wrote|generated|designed|created|powers?|powered)\b`),
];

/** Mentions of AI vendors are fine when the visitor wants one in their own product. */
function isIntegrationQuestion(t: string): boolean {
    return new RegExp(String.raw`\b${VENDOR}\b`).test(t) && /\b(my|our|integrat\w*|connect\w*|add|plug\w*|into|api for|use in)\b/.test(t);
}

/* Obfuscation: leetspeak, look-alike letters and spaced-out words ("b y p 4 s s") are folded back
   before the high-risk keywords are checked again, so disguising a request doesn't get it through. */
const LOOKALIKES: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", $: "s", "!": "i", "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "і": "i", "ѕ": "s" };
const SQUASHED_RISK = /(bypass|jailbreak|ignoreprevious|ignoreall|ignoreyour|ignoreeverything|systemprompt|developermode|doanythingnow|apikey|chatgpt|claude|anthropic|openai|gemini|copilot|deepseek|whobuiltthis|whomadethis|kisnebanay)/;

function looksObfuscated(raw: string): boolean {
    INVISIBLE.lastIndex = 0;
    return INVISIBLE.test(raw) || /([a-z][\s.\-_*|]){3,}[a-z]\b/i.test(raw) || /[a-z][0-9@$!][a-z]/i.test(raw) || /[а-яіѕ]/i.test(raw);
}

function squash(raw: string): string {
    return raw
        .replace(INVISIBLE, "")
        .toLowerCase()
        .split("")
        .map((c) => LOOKALIKES[c] ?? c)
        .join("")
        .replace(/[^a-z]/g, "");
}

export function isBlocked(text: string): boolean {
    const t = normalise(text);
    if (isIntegrationQuestion(t) && !/\b(bypass|ignore|prompt|secret|password|api\s?key)\b/.test(t)) return false;
    if (new RegExp(String.raw`\b${VENDOR}\b`).test(t)) return true;
    if (blocked.some((re) => re.test(t))) return true;
    return looksObfuscated(text) && SQUASHED_RISK.test(squash(text));
}

const CRISIS = /\b(suicid\w*|kill (myself|me)|end (my|this) life|ending my life|want to die|wanna die|self[\s-]?harm|hurt myself|no reason to live|marna chaht[ai]|khudkushi|aatmahatya)\b/;
const ENCODED = /(?:^|\s)[A-Za-z0-9+/]{32,}={0,2}(?:\s|$)|\b[0-9a-f]{40,}\b|\\u[0-9a-f]{4}|&#x?[0-9a-f]+;/i;
const ABUSE = /\b(fuck\w*|shit\w*|bitch\w*|bastard|asshole|dickhead|cunt|motherfucker|slut|whore|retard\w*|bhenchod|behenchod|madarchod|chutiy\w*|gandu|bhosd\w*|randi|lavd\w*|lodu|harami)\b/;
const NEEDS_A_PERSON = /\b(complain\w*|refund|dispute|lawsuit|sue you|legal (action|notice)|lawyer|court|consumer forum|scam\w*|fraud\w*|cheat(ed|ing)|unprofessional|not delivered|missed (the |our )?deadline|(site|website|app|server|production) (is |went )?down|outage|hacked|data (leak|breach)|security breach)\b/;

export type Screening = { ok: true } | { ok: false; kind: "crisis" | "encoded" | "blocked" | "abuse" | "handoff"; reply: AssistantReply; mask?: boolean };

/**
 * Input guardrail: decides whether a message may reach the knowledge base at all.
 * `previous` is the visitor's last message, so a request split across two messages is still caught.
 */
export function screen(text: string, previous?: string): Screening {
    const t = normalise(text);
    if (CRISIS.test(t)) {
        return {
            ok: false,
            kind: "crisis",
            reply: {
                text: "I'm really sorry you're going through this. Please talk to someone right now. In India you can call Tele-MANAS on 14416 (free, 24/7), or emergency services on 112. If you're elsewhere, please contact your local emergency number.",
            },
        };
    }
    if (ENCODED.test(text)) {
        return { ok: false, kind: "encoded", reply: { text: "I can't read encoded text. Ask your question in plain words, or email us.", actions: [{ kind: "email", label: "Email us" }], blocked: true } };
    }
    // A previous message that was refused on its own has been dealt with; only innocent-looking halves are joined.
    if (isBlocked(text) || (previous && !isBlocked(previous) && isBlocked(`${previous} ${text}`))) return { ok: false, kind: "blocked", reply: refusal };
    if (ABUSE.test(t)) {
        return {
            ok: false,
            kind: "abuse",
            mask: true,
            reply: { text: "Let's keep it friendly. I'm happy to help with anything about StackWise, or you can email us.", actions: [{ kind: "email", label: "Email us" }] },
        };
    }
    if (NEEDS_A_PERSON.test(t)) {
        return {
            ok: false,
            kind: "handoff",
            reply: {
                text: "That's one for a person, not a chat assistant. Please email Yash directly and he'll get back to you personally.",
                actions: [{ kind: "email", label: "Email Yash", subject: "Needs a reply from Yash", body: text.trim() }],
            },
        };
    }
    return { ok: true };
}

/** Hides abusive words in the visible transcript. */
export function maskAbuse(text: string): string {
    return text.replace(new RegExp(ABUSE.source, "gi"), (w) => `${w[0]}${"*".repeat(Math.max(w.length - 1, 2))}`);
}

function luhn(digits: string): boolean {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let d = Number(digits[digits.length - 1 - i]);
        if (i % 2 === 1) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        sum += d;
    }
    return sum % 10 === 0;
}

/**
 * Removes card numbers, Aadhaar and PAN numbers, bank account numbers and passwords or OTPs
 * from anything the visitor types, before it is shown, kept or sent.
 */
export function redactSensitive(text: string): { text: string; removed: boolean } {
    let removed = false;
    const mark = () => {
        removed = true;
        return "[removed]";
    };
    const out = text
        .replace(/\b(?:\d[ -]?){12,18}\d\b/g, (m) => {
            const digits = m.replace(/\D/g, "");
            return (digits.length >= 13 && luhn(digits)) || /^\d{4}[ -]?\d{4}[ -]?\d{4}$/.test(m.trim()) ? mark() : m;
        })
        .replace(/\b\d{4}[ -]\d{4}[ -]\d{4}\b/g, () => mark())
        .replace(/\b[a-z]{5}\d{4}[a-z]\b/gi, (m) => (/^[A-Z]{5}\d{4}[A-Z]$/i.test(m) ? mark() : m))
        .replace(/\b(password|passwd|pwd|passcode|otp|pin|cvv|upi pin)\b(\s*(is|:|=|-)\s*)\S+/gi, (_m, k, sep) => `${k}${sep}${mark()}`)
        .replace(/\b(account (no|number)|a\/c( no)?|acc no)\b([^\d]{0,6})\d{6,18}\b/gi, (_m, k, _a, _b, sep) => `${k}${sep}${mark()}`);
    return { text: out, removed };
}

const UNSAFE_OUTPUT = /\b(claude|anthropic|openai|chat\s?gpt|gemini|copilot|system prompt|api key|password|secret key|\.env)\b/i;

/** Output guardrail: a reply that mentions anything off-limits is replaced, and only on-site links are allowed. */
export function safeReply(reply: AssistantReply): AssistantReply {
    const texts = [reply.text, ...(reply.actions ?? []).map((a) => a.label ?? "")];
    if (texts.some((t) => UNSAFE_OUTPUT.test(t))) return refusal;
    const actions = reply.actions?.filter((a) => a.kind === "email" || (a.href.startsWith("/") && !a.href.startsWith("//")));
    return { ...reply, actions };
}

export const refusal: AssistantReply = {
    text: "I'm not able to answer that. If you'd like more information, email us and we'll get back to you.",
    actions: [{ kind: "email", label: "Email us" }],
    blocked: true,
};

function unknown(question: string): AssistantReply {
    return {
        text: "I'm not able to answer that here. I can help with questions about StackWise's services, pricing and process. For anything else, email us and we'll get back to you.",
        actions: [{ kind: "email", label: "Email your question", subject: "Question from the website", body: question }],
        unanswered: true,
    };
}

/* ───────────────────────── Understanding answers ───────────────────────── */

const serviceSignals: [RegExp, string][] = [
    [/\b(mvp|prototype|startup|start-up|first version)\b/, "mvp-development"],
    [/\b(saas|subscription|multi[\s-]?tenant|software as a service)\b/, "saas-development"],
    [/\b(ai|a\.i\.|chat\s?bot|chat\s?gpt|llms?|gpt|rag|agents?|machine learning|ml model|openai|claude|gemini)\b/, "ai-development"],
    [/\b(mobile|ios|android|app store|play store|react native|iphone)\b/, "mobile-app-development"],
    [/\b(crm|erp|internal tools?|dashboard|portal|custom software|admin panel|inventory|automation|automate|workflow)\b/, "custom-software"],
    [/\b(web\s?site|web site|landing page|homepage|blog|e-?commerce|online store|shop|web development|web dev)\b/, "web-development"],
    [/\b(ui|ux|ui\/ux|figma|redesign|user interface)\b/, "ui-ux-design"],
    [/\b(devops|ci\/cd|cloud|aws|kubernetes|docker|infrastructure)\b/, "cloud-devops"],
    [/\b(legacy|moderni[sz]\w*|migrat\w*|rewrite|refactor\w*|upgrade)\b/, "software-modernization"],
    [/\b(maintenance|retainer|bug fix\w*)\b/, "maintenance-support"],
];

export function detectServicePage(text: string): string | undefined {
    const t = normalise(text);
    return serviceSignals.find(([re]) => re.test(t))?.[1];
}

const slugToQuoteLabel: Record<string, string> = Object.fromEntries(quoteServices.filter((s) => s.slug).map((s) => [s.slug!, s.label]));

const stageSignals: [RegExp, string][] = [
    [/\b(old|legacy|rebuild|redo|rewrite|replace|outdated)\b/, quoteStages[3]],
    [/\b(live|existing|launched|running|already|improve|fix)\b/, quoteStages[2]],
    [/\b(designs?|figma|mock\s?ups?|wireframes?|prototype)\b/, quoteStages[1]],
    [/\b(idea|concept|scratch|nothing|planning|start)\b/, quoteStages[0]],
];

const timelineSignals: [RegExp, string][] = [
    [/\b(flexible|no rush|whenever|not sure|any ?time|don'?t know|no idea)\b/, quoteTimelines[3]],
    [/\b(3\+|[3-9]\s*(\+|plus)?\s*months?|six months|next year|quarter|later|end of (the )?year)\b/, quoteTimelines[2]],
    [/\b(1|2|one|two|1-3|1 to 3|next)\s*months?\b|\bin a month\b/, quoteTimelines[1]],
    [/\b(asap|urgent|soon|immediately|now|this week|this month|weeks?|quick(ly)?|fast)\b/, quoteTimelines[0]],
];

/** Reads an amount like "80k", "1.5 lakh", "₹2,00,000" or "3L" as rupees. */
function rupeesIn(t: string): number | null {
    const m = t.replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*(k|thousand|l|lakh|lakhs|lac|lacs|cr|crore|crores)?\b/);
    if (!m) return null;
    const n = Number(m[1]);
    const unit = m[2] ?? "";
    if (unit.startsWith("k") || unit === "thousand") return n * 1e3;
    if (unit.startsWith("l")) return n * 1e5;
    if (unit.startsWith("c")) return n * 1e7;
    return n >= 1000 ? n : null;
}

function budgetFrom(text: string): string | undefined {
    const t = normalise(text);
    if (/\b(not sure|no idea|don'?t know|flexible|open)\b/.test(t)) return "Not sure yet";
    if (/[$€£]|\b(usd|dollars?|eur|euros?|gbp|pounds?)\b/.test(text.toLowerCase())) return text.trim().slice(0, 40);
    const amount = rupeesIn(t);
    if (amount === null) return undefined;
    if (amount < 50000) return quoteBudgets[0].label;
    return quoteBudgets.find((b) => amount <= b.max)?.label ?? quoteBudgets[4].label;
}

/** Maps free text typed at a multiple-choice question to one of its options. */
export function matchOption(step: "service" | "stage" | "timeline" | "budget", text: string): string | undefined {
    const t = normalise(text);
    const options = { service: quoteServices.map((s) => s.label), stage: quoteStages, timeline: quoteTimelines, budget: quoteBudgets.map((b) => b.label) }[step];
    const exact = options.find((o) => normalise(o) === t);
    if (exact) return exact;
    if (step === "service") {
        const slug = detectServicePage(t);
        return slug ? slugToQuoteLabel[slug] : undefined;
    }
    if (step === "stage") return stageSignals.find(([re]) => re.test(t))?.[1];
    if (step === "timeline") return timelineSignals.find(([re]) => re.test(t))?.[1];
    return budgetFrom(text);
}

export function isQuestion(text: string): boolean {
    const t = normalise(text);
    return (
        t.includes("?") ||
        /^(what|whats|what's|how|why|when|where|who|whom|which|can|could|do|does|did|is|are|will|would|should|may|tell me|explain|any|have you|i want to know|i'd like to know)\b/.test(t)
    );
}

/* ───────────────────────── Knowledge ───────────────────────── */

const faq = (start: string) => faqs.find((f) => f.q.startsWith(start))!.a.replace(/\s+—\s+/g, ", ");

function servicePrice(slug: string): string | null {
    const label = slugToQuoteLabel[slug];
    const est = label ? estimateFor(label) : null;
    if (est) return est.price === "Custom quote" ? "are priced with a custom quote after a short call" : `start ${est.price.toLowerCase()}`;
    const page = marketingPages[slug];
    const price = page?.facts.find((f) => f.label === "Starting at")?.value;
    if (!price) return null;
    return price === "Custom quote" ? "are priced with a custom quote after a short call" : `start from ${price}`;
}

function serviceTimeline(slug: string): string | null {
    const t = marketingPages[slug]?.facts.find((f) => f.label === "Typical timeline")?.value;
    return t && !/scoped/i.test(t) ? t : null;
}

const pageLink = (slug: string): AssistantAction => ({ kind: "link", label: `About ${marketingPages[slug].navLabel}`, href: marketingPages[slug].path });

const plainIntro = (slug: string) => marketingPages[slug].intro.replace(/\s+—\s+/g, ", ").replace(/\s+–\s+/g, ", ");

/** `weight` breaks ties: specific topics beat the generic "what do you offer" answer, small talk loses to everything. */
type Intent = { patterns: RegExp[]; answer: (t: string) => AssistantReply; weight?: number };

const intents: Intent[] = [
    {
        patterns: [/^(hi+|hello|hey+|hiya|yo|namaste|hola|good (morning|afternoon|evening))( there| team| yash| stackwise)?[ .!]*$/],
        answer: () => ({ text: "Hi! Ask me anything about StackWise, or answer the quick questions to get a quote." }),
        weight: -0.5,
    },
    {
        patterns: [/^(thanks|thank you|thank u|thx|ty|cheers|great|awesome|cool|ok|okay|nice|perfect)( so much| a lot)?[ .!]*$/],
        answer: () => ({ text: "Happy to help. Anything else you'd like to know?" }),
        weight: -0.5,
    },
    {
        patterns: [/\b(who|what) are you\b/, /\bare you (a |an )?(bot|robot|human|real|person|ai|machine)\b/, /\b(am i )?(talking|chatting) (to|with)\b/],
        answer: () => ({
            text: "I'm the StackWise assistant. I answer questions about our services, pricing and process, and pass your project details to Yash, who replies personally within 24–48 hours.",
        }),
    },
    {
        patterns: [/\b(job|jobs|hiring|career|careers|intern|internship|vacanc(y|ies)|join (your|the) team)\b/],
        answer: () => ({
            text: "This chat is for project enquiries. For anything else, email us.",
            actions: [{ kind: "email", label: "Email us", subject: "Hello from the website" }],
        }),
    },
    {
        weight: 0.5,
        patterns: [/\b(payment terms|advance|upfront|up front|deposit|milestones?|instal+ments?|pay(ment)? (schedule|plan)|refunds?|invoice terms)\b/],
        answer: () => ({
            text: "Payment terms are set out in your written quote, before any work starts. Email us if you'd like to know more now.",
            actions: [{ kind: "email", label: "Email us", subject: "Question about payment terms" }],
        }),
    },
    {
        patterns: [/\b(price|prices|pricing|cost|costs|costing|charge|charges|rate|rates|fee|fees|budget|how much|expensive|cheap|afford\w*|quote|quotation|estimate|package|packages|plans?)\b/],
        answer: (t) => {
            const slug = detectServicePage(t);
            const price = slug && servicePrice(slug);
            if (slug && price) {
                const tl = serviceTimeline(slug);
                return {
                    text: `${marketingPages[slug].navLabel} projects ${price}${tl ? ` and usually take ${tl}` : ""}. You'll get a written quote for your exact project before any work starts.`,
                    actions: [pageLink(slug)],
                };
            }
            const [starter, product, scale] = siteConfig.pricing;
            return {
                text: `${starter.title} starts from ${starter.price.replace("+", "")} (${approxUsd(starter.price)}) for websites and landing pages. ${product.title} starts from ${product.price.replace("+", "")} (${approxUsd(product.price)}) for SaaS products, dashboards and web apps. ${scale.title} is a custom quote for AI systems and larger platforms. Every project gets a written quote before work starts.`,
                actions: [{ kind: "link", label: "See pricing", href: "/pricing" }],
            };
        },
    },
    {
        patterns: [/\b(how long|timeline|time\s?frame|duration|turnaround|deadline|how (fast|quick)|how soon|when can (you|it|we)|delivery time|urgent(ly)?|asap)\b/],
        answer: (t) => {
            const slug = detectServicePage(t);
            const tl = slug && serviceTimeline(slug);
            if (slug && tl) return { text: `${marketingPages[slug].navLabel} projects usually take ${tl}. You get a detailed timeline with your quote.` };
            return { text: faq("What's the typical project timeline") };
        },
    },
    {
        weight: 0.5,
        patterns: [/\b(own the|owns? the|who owns|ownership|ip rights|intellectual property|source code|copyright|licen[cs]e|licen[cs]ing|code rights)\b/],
        answer: () => ({ text: faq("Who owns the code") }),
    },
    {
        weight: 0.5,
        patterns: [/\b(nda|ndas|non[\s-]?disclosure|confidentiality agreements?|sign (an|a) (agreement|contract)|keep my idea|protect my idea)\b/],
        answer: () => ({ text: faq("Do you sign NDAs") }),
    },
    {
        weight: 0.5,
        patterns: [/\b(revisions?|don'?t like|do not like|not happy|changes to the design|redesign from scratch)\b/],
        answer: () => ({ text: faq("What if I don't like the design") }),
    },
    {
        weight: 0.5,
        patterns: [/\b(scope|mid[\s-]?way|add (more )?features?|extra features?|hidden (fees|costs|charges)|change (my|the) (mind|requirements))\b/],
        answer: () => ({ text: faq("What if the project scope changes") }),
    },
    {
        patterns: [/\b(support|maintenance|maintain|after launch|post[\s-]?launch|disappear|bugs?|retainer|long[\s-]?term)\b/],
        answer: () => ({
            text: "Yes. Every project includes 1–3 months of support after launch, depending on your plan. After that you can move to a monthly maintenance retainer, and you get handover docs so your own team can take over if you prefer.",
            actions: [pageLink("maintenance-support")],
        }),
    },
    {
        patterns: [/\b(communicat\w*|meetings?|weekly call|slack|discord|progress|updates on|stay in touch|staging)\b/],
        answer: () => ({ text: faq("How do you communicate") }),
    },
    {
        patterns: [/\b(free|consultation|consult|discovery call|no commitment|first call)\b/],
        answer: () => ({ text: "Yes, the first consultation is free and there's no commitment. After it you get a written quote and a timeline." }),
    },
    {
        patterns: [/\b(process|how (do you|does it|does this) work|steps|methodology|approach|get started|(how|where) (do|can|should) (i|we) start|next steps?|onboarding)\b/],
        answer: () => ({
            text: "It's four steps. We plan the scope and timeline, design clickable screens in Figma, build with a live staging link you can follow, then test, launch and hand everything over. You get a weekly call throughout.",
            actions: [{ kind: "link", label: "See the process", href: "/#process" }],
        }),
    },
    {
        patterns: [/\b(portfolio|case stud(y|ies)|examples?|previous work|past work|your work|projects|samples?|references?|what have you (built|made|done)|built before|show me)\b/],
        answer: () => ({
            text: `Some of what we've built: ${allWork
                .filter((w) => w.slug !== "stackwise")
                .map((w) => `${w.name} (${w.kind})`)
                .join(", ")}. Each one has a write-up of the problem and how it was built.`,
            actions: [{ kind: "link", label: "See our work", href: "/work" }],
        }),
    },
    {
        weight: 0.6,
        patterns: [/\b(white[\s-]?label(ed|led)?|agencies|for (my|our) (agency|clients)|(digital|marketing|design|branding|creative) agency|reseller|resell|outsourc\w* (for|from) (my|our) agency|partner agency)\b/],
        answer: () => ({
            text: faq("Do you work with agencies"),
            actions: [{ kind: "link", label: "White-label for agencies", href: "/solutions/agencies" }],
        }),
    },
    {
        patterns: [/\b(founder|who (runs|owns|leads|is behind|started|founded|made|built|created) stackwise|team|team size|how many (people|developers|engineers|employees)|yash|who will (work|build|code)|freelancer|agency|in[\s-]?house)\b/],
        answer: () => ({
            text: `StackWise is run by ${siteConfig.author}, founder and lead engineer, based in ${siteConfig.location.city}. You work directly with him, from the first call to launch.`,
            actions: [{ kind: "link", label: "About StackWise", href: "/#founder" }],
        }),
    },
    {
        patterns: [
            /\bwhere (are|is) (you|u|stackwise|your (office|team|studio|company))\b/,
            /\b(based|located|location|office|which city|which country)\b/,
            /\b(work|clients?)\b.{0,20}\b(abroad|international|overseas|outside india|other countries|usa|us|uk|europe|dubai|canada|australia)\b/,
            /\b(time\s?zones?|remote(ly)?)\b/,
        ],
        answer: () => ({
            text: `StackWise is based in ${siteConfig.location.city}, ${siteConfig.location.country}. We work remotely with clients in India and abroad, and schedule calls at a time that suits both time zones.`,
            actions: [{ kind: "link", label: "Where we work", href: "/locations" }],
        }),
    },
    {
        weight: 0.4,
        patterns: [/\b(contact|e-?mail|mail|phone|call you|whatsapp|reach|talk to|speak to|number|get in touch)\b/],
        answer: () => ({
            text: `Email us at ${EMAIL}, or finish the quick questions here and Yash will reply within 24–48 hours. You can add a WhatsApp number in the chat if you'd prefer a reply there.`,
            actions: [{ kind: "email", label: "Email us" }],
        }),
    },
    {
        weight: 0.5,
        patterns: [/\b(stripe|razorpay|payment gateway|payments? integration|subscriptions?|billing|checkout)\b/],
        answer: () => ({
            text: "Yes. We integrate Stripe or Razorpay for one-off payments, subscriptions, invoices and usage billing, and connect them to plan limits inside your app.",
            actions: [pageLink("saas-development")],
        }),
    },
    {
        weight: 0.5,
        patterns: [/\b(e-?commerce|online store|shopify|woocommerce|wordpress|wix|webflow|squarespace|cms|templates?)\b/],
        answer: () => ({
            text: "We build custom websites and online stores in Next.js, usually with a headless CMS, rather than WordPress or template sites. Websites start from ₹34,999; online stores usually take 4–6 weeks.",
            actions: [pageLink("web-development")],
        }),
    },
    {
        weight: 0.5,
        patterns: [/\b(seo|google|ranking|rank|search engines?|page speed|core web vitals|lighthouse)\b/],
        answer: () => ({
            text: "Every website we build includes SEO and speed tuning: server-rendered pages, clean metadata, structured data and fast loading on phones.",
            actions: [pageLink("web-development")],
        }),
    },
    {
        weight: 0.25,
        patterns: [
            /\b(tech(nology|nologies)?|stack|languages?|frameworks?|tools)\b.{0,30}\b(you|your|stackwise|use|using)\b/,
            /\b(you|your|stackwise)\b.{0,30}\b(tech(nology|nologies)?|stack|languages?|frameworks?)\b/,
            /\b(do|can|will) you\b.{0,30}\b(use|work with|know|code in|build (with|in)|support|do)\b.{0,30}\b(next\.?js|react|node(\.?js)?|golang|go|typescript|python|postgres(ql)?|redis|aws|vercel|docker|flutter|java|php|laravel|django|angular|vue|mongodb|firebase|supabase)\b/,
        ],
        answer: () => ({
            text: "For client projects we mostly use Next.js, React and TypeScript on the front end, Node.js and Go for APIs, PostgreSQL and Redis for data, and AWS or Vercel for hosting. We pick what fits your product.",
            actions: [{ kind: "link", label: "Technologies", href: "/technologies" }],
        }),
    },
    {
        weight: 0.3,
        patterns: [/\b(services?|what (do|can) you (do|offer|build|make)|offer(ings)?|capabilit(y|ies)|can you (build|make|do|help|develop|create|integrate|add|implement|set up)|do you (build|make|do|develop|create|offer|integrate|add|implement))\b/],
        answer: (t) => {
            const slug = detectServicePage(t);
            if (slug) {
                const price = servicePrice(slug);
                return { text: `Yes. ${plainIntro(slug)}${price ? ` These projects ${price}.` : ""}`, actions: [pageLink(slug)] };
            }
            return {
                text: "We build SaaS products, AI features, custom software, websites, MVPs and mobile apps. We also do UI/UX design, cloud and DevOps, modernisation of older systems, and maintenance after launch.",
                actions: [{ kind: "link", label: "All services", href: "/services" }],
            };
        },
    },
];

/** A topic the visitor named without a question word, e.g. "mobile apps?" or "ai agents". */
function serviceOnly(t: string): AssistantReply | null {
    const slug = detectServicePage(t);
    if (!slug) return null;
    const price = servicePrice(slug);
    return { text: `Yes, we do that. ${plainIntro(slug)}${price ? ` These projects ${price}.` : ""}`, actions: [pageLink(slug)] };
}

/** Answers a visitor's question, or refuses. Never returns anything not written in this file or published on the site. */
export function answer(question: string): AssistantReply {
    return safeReply(findAnswer(question));
}

function findAnswer(question: string): AssistantReply {
    if (isBlocked(question)) return refusal;
    const t = normalise(question);
    let best: { intent: Intent; score: number } | null = null;
    for (const intent of intents) {
        const hits = intent.patterns.filter((re) => re.test(t)).length;
        const score = hits + (intent.weight ?? 0);
        if (hits > 0 && (!best || score > best.score)) best = { intent, score };
    }
    if (best) return best.intent.answer(t);
    return serviceOnly(t) ?? unknown(question.trim());
}

/** Whether the text is something the knowledge base can answer (used to tell questions from answers). */
export function canAnswer(question: string): boolean {
    if (isBlocked(question)) return true;
    const t = normalise(question);
    return intents.some((i) => i.patterns.some((re) => re.test(t)));
}
