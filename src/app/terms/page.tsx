import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Terms of Service",
    description: "The terms for using the StackWise website and quote chat, how quotes become agreements, who owns what, and which law applies.",
    canonical: "/terms",
    ogKicker: "Legal",
});

const email = siteConfig.emails.inbound;

const sections: LegalSection[] = [
    {
        id: "who-we-are",
        title: "Who we are",
        body: (
            <>
                <p>
                    StackWise is a software studio in Mumbai, India, run by Yash Suthar. We design and build SaaS products, AI features, custom
                    software and websites for clients in India and abroad. &quot;We&quot;, &quot;our&quot; and &quot;us&quot; in these terms mean
                    StackWise.
                </p>
            </>
        ),
    },
    {
        id: "what-these-terms-cover",
        title: "What these terms cover",
        body: (
            <>
                <p>
                    These terms apply to this website, the quote chat and any enquiry you send us. By using the site you agree to them. If you do
                    not agree, please do not use the site.
                </p>
                <p>
                    Work we do for a client runs on a separate written agreement or statement of work signed by both sides. That agreement sets
                    the scope, timeline, price, payment terms and ownership for the project. Where it says something different from these terms,
                    the agreement wins.
                </p>
            </>
        ),
    },
    {
        id: "using-the-site",
        title: "Using the site",
        body: (
            <>
                <p>You may use the site to learn about our work and to get in touch. You agree not to:</p>
                <ul>
                    <li>probe, attack or overload the site, the chat or the email service behind it;</li>
                    <li>send spam, false enquiries or content that is unlawful or harmful;</li>
                    <li>copy the site at scale with automated tools, other than search engines indexing it;</li>
                    <li>use the quote chat to send other people&apos;s personal information without their permission.</li>
                </ul>
                <p>We may block access from anyone who misuses the site.</p>
            </>
        ),
    },
    {
        id: "enquiries-and-quotes",
        title: "Enquiries, the chat and quotes",
        body: (
            <>
                <ul>
                    <li>
                        The quote chat is an automated assistant that answers from information published on this site. Its answers are general
                        guidance, not advice for your specific situation.
                    </li>
                    <li>
                        Prices and timelines shown on the site, in the chat or in an early estimate are starting points. They help you plan, and they
                        are not an offer.
                    </li>
                    <li>
                        A quote becomes binding only when both sides sign a written agreement. Until then neither side is committed, and we may
                        decline a project for any reason.
                    </li>
                    <li>
                        Sending an enquiry does not create a confidential relationship. If you need to share sensitive information before we have
                        signed an NDA, ask for one first and we will send it.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "client-projects",
        title: "Client projects",
        body: (
            <>
                <p>Every project we take on follows the same basic rules, written into the project agreement:</p>
                <ul>
                    <li>scope, timeline and price are agreed in writing before work starts;</li>
                    <li>
                        the client owns the code, designs and other work we build for them once it is handed over and paid for, with no licence fees
                        or lock-in;
                    </li>
                    <li>the agreement says how long support lasts after launch and how changes to scope are handled.</li>
                </ul>
                <p>
                    Open-source libraries, hosting platforms and other third-party tools used in a project stay under their own licences and terms.
                </p>
            </>
        ),
    },
    {
        id: "intellectual-property",
        title: "Intellectual property",
        body: (
            <>
                <p>
                    The text, design, graphics, code and other content of this website belong to StackWise or its licensors. You may not copy,
                    republish or build on them without our written permission, other than sharing links to the site.
                </p>
                <p>
                    Products shown in our case studies are our own work or are shown with their owners&apos; permission, and their names belong to
                    their owners. The StackWise name and logo are ours.
                </p>
            </>
        ),
    },
    {
        id: "third-party-links",
        title: "Third-party links and services",
        body: (
            <>
                <p>
                    The site links to other places, such as GitHub, npm, published research and client products. Those sites have their own terms
                    and privacy practices, and we are not responsible for them.
                </p>
            </>
        ),
    },
    {
        id: "information-on-this-site",
        title: "Information on this site",
        body: (
            <>
                <p>
                    We try to keep everything on the site accurate and current, and we update it as our work changes. Even so, the site is provided
                    &quot;as is&quot;: we make no promise that it is complete, error-free or always available, and we may change or remove any part
                    of it at any time.
                </p>
            </>
        ),
    },
    {
        id: "limitation-of-liability",
        title: "Limitation of liability",
        body: (
            <>
                <p>
                    To the fullest extent the law allows, StackWise is not liable for any indirect, incidental, special or consequential loss, or
                    any loss of profit, data or business, arising from your use of, or inability to use, this website, the chat or information
                    on the site. Nothing in these terms limits liability that cannot be limited by law.
                </p>
                <p>Liability for project work is set out in each client&apos;s agreement.</p>
            </>
        ),
    },
    {
        id: "governing-law",
        title: "Governing law and disputes",
        body: (
            <>
                <p>
                    These terms are governed by the laws of India. If we have a disagreement, we will try to resolve it by talking first. Any
                    dispute that cannot be resolved that way is subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        title: "Changes to these terms",
        body: (
            <>
                <p>
                    We may update these terms from time to time. When we do, we change the date at the top of the page, and for a significant
                    change we say so on this page for a while after it takes effect. Using the site after a change means you accept the new terms.
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
                    Questions about these terms go to <a href={`mailto:${email}`}>{email}</a>. See also our{" "}
                    <Link href="/privacy">Privacy Policy</Link>.
                </p>
            </>
        ),
    },
];

export default function TermsOfService() {
    return (
        <LegalPage
            path="/terms"
            title="Terms of Service"
            lede="The rules for using this website and the quote chat, how a quote turns into a project, who owns what, and which law applies if something goes wrong."
            updated="31 October 2026"
            summary={[
                "These terms cover the website and enquiries. Client work runs on a separate signed agreement, which takes precedence.",
                "Prices on the site are starting points. A quote is binding only once we both sign.",
                "Content on this site is ours. What we build for you is yours at handover.",
                "Indian law applies, with disputes handled in Mumbai.",
            ]}
            sections={sections}
        />
    );
}
