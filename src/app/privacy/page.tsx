import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Privacy Policy",
    description: "What StackWise collects when you visit the site or use the quote chat, how it is used, who sees it, and how to ask for it to be corrected or deleted.",
    canonical: "/privacy",
    ogKicker: "Legal",
});

const email = siteConfig.emails.inbound;

const sections: LegalSection[] = [
    {
        id: "what-we-collect",
        title: "What we collect",
        body: (
            <>
                <p>We only collect personal information you choose to give us, which happens when you:</p>
                <ul>
                    <li>send project details through the quote chat or by email;</li>
                    <li>talk to us about a project on a call, on Slack, Discord or WhatsApp, or by email.</li>
                </ul>
                <p>
                    That is usually your name, email address, an optional phone or WhatsApp number, and what you tell us about the project: what you
                    want to build, your timeline and a rough budget.
                </p>
                <p>
                    Our hosting provider also keeps short-lived technical logs of requests to the site (such as the IP address and page requested) to
                    run and protect the service. We do not use these to identify you.
                </p>
            </>
        ),
    },
    {
        id: "quote-chat",
        title: "The quote chat",
        body: (
            <>
                <ul>
                    <li>
                        The chat is an automated assistant. It answers from information already published on this site, and Yash replies to every
                        quote personally.
                    </li>
                    <li>
                        The conversation runs in your browser and is held only in memory while the page is open. Nothing is sent to us until you
                        press <strong>Send to Yash</strong>; your answers then travel over an encrypted connection and reach our inbox by email.
                        If you choose to send by email instead, the message goes from your own email app.
                    </li>
                    <li>
                        Before anything is shown or sent, the chat removes text that looks like a card number, an Aadhaar or PAN number, a bank
                        account number, a password or a one-time code. Please do not share those with us at all.
                    </li>
                    <li>We keep no chat transcripts on any server, and we do not use your messages to train any software.</li>
                </ul>
            </>
        ),
    },
    {
        id: "how-we-use-it",
        title: "How we use it",
        body: (
            <>
                <ul>
                    <li>To reply to your enquiry, prepare a quote and communicate with you about your project.</li>
                    <li>To run, secure and improve this website.</li>
                    <li>To meet legal obligations, such as keeping records of work we are paid for.</li>
                </ul>
                <p>We do not sell or rent personal information, and we do not share it with anyone for their marketing.</p>
            </>
        ),
    },
    {
        id: "who-sees-it",
        title: "Who sees it",
        body: (
            <>
                <p>Yash reads your enquiry. A small number of service providers handle data on our behalf so the site can work:</p>
                <ul>
                    <li>
                        <strong>Vercel</strong> hosts the website and serves it from locations near you. Request logs pass through its systems.
                    </li>
                    <li>
                        <strong>Resend</strong> delivers enquiry notifications from the site to our inbox.
                    </li>
                    <li>
                        <strong>Google</strong> hosts that inbox (Gmail) and, only if analytics is switched on, provides Google Analytics (see{" "}
                        <Link href="#analytics-and-cookies">Analytics and cookies</Link>).
                    </li>
                </ul>
                <p>
                    Each provider processes data under its own terms and security commitments. We may also share information if the law requires
                    it, or to protect the rights and safety of StackWise or others.
                </p>
            </>
        ),
    },
    {
        id: "analytics-and-cookies",
        title: "Analytics and cookies",
        body: (
            <>
                <p>
                    The site sets no cookies of its own and uses no advertising trackers. The quote chat stores nothing on your device after you
                    close the page.
                </p>
                <p>
                    If analytics is enabled, Google Analytics sets its own cookies to count visits and show us how the site is used, including
                    anonymous events from the chat such as a quote being sent or a question the assistant could not answer. These events never
                    include what you typed. You can block analytics cookies in your browser without affecting the site.
                </p>
            </>
        ),
    },
    {
        id: "how-long-we-keep-it",
        title: "How long we keep it",
        body: (
            <>
                <p>
                    Enquiry emails stay in our inbox for as long as we need them to reply to you and to manage any work we do together, then for
                    as long as the law requires us to keep business records. You can ask us to delete an enquiry at any time, and we will unless
                    we have a legal reason to keep it.
                </p>
            </>
        ),
    },
    {
        id: "your-rights",
        title: "Your rights",
        body: (
            <>
                <p>
                    We handle personal data in line with India&apos;s Digital Personal Data Protection Act, 2023. Whatever country you are in, you
                    can:
                </p>
                <ul>
                    <li>ask what personal information we hold about you;</li>
                    <li>ask us to correct it;</li>
                    <li>ask us to delete it;</li>
                    <li>withdraw consent for us to contact you.</li>
                </ul>
                <p>
                    Email <a href={`mailto:${email}`}>{email}</a> from the address you used with us. We respond within a reasonable time, and
                    we may ask you to confirm who you are first.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "Security",
        body: (
            <>
                <p>
                    The site is served only over HTTPS with strict security headers, and enquiries are sent over encrypted connections. We take
                    reasonable technical and organisational measures to protect your data. No method of sending information over the internet is
                    completely secure, so we also ask you not to share sensitive details such as passwords or payment information with us.
                </p>
            </>
        ),
    },
    {
        id: "where-data-is-processed",
        title: "Where data is processed",
        body: (
            <>
                <p>
                    StackWise is based in Mumbai, India. Our providers may process data on servers outside India, including in the United States.
                    Data travels encrypted, and each provider commits to protecting it under its own terms.
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "Children",
        body: (
            <>
                <p>
                    This website is for businesses and is not directed at anyone under 18. We do not knowingly collect information from children.
                    If you believe a child has sent us personal information, email us and we will delete it.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        title: "Changes to this policy",
        body: (
            <>
                <p>
                    When we change this policy we update the date at the top of the page. For a significant change we also say so on this page
                    for a while after it takes effect.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "Contact",
        body: (
            <>
                <p>
                    Questions about privacy go to <a href={`mailto:${email}`}>{email}</a>. See also our <Link href="/terms">Terms of Service</Link>.
                </p>
            </>
        ),
    },
];

export default function PrivacyPolicy() {
    return (
        <LegalPage
            path="/privacy"
            title="Privacy Policy"
            lede="What we collect when you visit this site or use the quote chat, what we do with it, who else sees it, and how to ask for it to be corrected or removed."
            updated="31 October 2026"
            summary={[
                "We only collect what you send us: your name, email, an optional phone number and your project details.",
                "The quote chat runs in your browser. Nothing leaves it until you choose to send.",
                "We use your details to reply and prepare a quote. We never sell them.",
                "Email us to see, correct or delete anything we hold about you.",
            ]}
            sections={sections}
        />
    );
}
