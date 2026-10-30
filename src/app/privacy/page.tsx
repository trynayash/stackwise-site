import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Privacy Policy",
    description: "How StackWise collects, uses and protects the information you share with us, including through the quote chat.",
    canonical: "/privacy",
    ogKicker: "Legal",
});

export default function PrivacyPolicy() {
    const email = siteConfig.emails.inbound;
    return (
        <LegalPage title="Privacy Policy" updated="October 30, 2026">
            <p>
                At StackWise (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting the personal data we hold
                about you. This policy explains what we collect when you visit our website, use the quote chat or contact us, and how we use it.
            </p>

            <h2>1. Information we collect</h2>
            <p>We only collect personal information that you choose to give us when you:</p>
            <ul>
                <li>Send us your project details through the quote chat or a contact form.</li>
                <li>Email us, or talk to us about a project.</li>
            </ul>
            <p>
                This is usually your name, email address, an optional phone or WhatsApp number, and what you tell us about your project, such as what
                you want to build, your timeline and a rough budget.
            </p>

            <h2>2. The quote chat</h2>
            <ul>
                <li>
                    The chat is an automated assistant. It answers questions using information already published on this website, and Yash replies to
                    every quote personally.
                </li>
                <li>
                    Your conversation stays in your browser. Nothing is sent to us until you press <strong>Send to Yash</strong>; your answers are then
                    sent over an encrypted connection and delivered to our inbox by email. If you choose to send by email instead, it goes from your
                    own email app.
                </li>
                <li>
                    The chat removes anything that looks like a card number, Aadhaar or PAN number, bank account number, password or OTP before it is
                    shown or sent. Please don&apos;t share those details with us.
                </li>
                <li>We don&apos;t keep chat transcripts on a server, and we don&apos;t use your messages to train any software.</li>
            </ul>

            <h2>3. How we use your information</h2>
            <ul>
                <li>To reply to your enquiry, prepare a quote and communicate with you about your project.</li>
                <li>To operate, secure and improve this website.</li>
            </ul>
            <p>We don&apos;t sell or rent your personal information, and we don&apos;t share it with third parties for their marketing.</p>

            <h2>4. Analytics</h2>
            <p>
                If analytics is enabled, we use Google Analytics to understand how the website is used. This can include anonymous events from the
                quote chat, such as a quote being sent or a question the assistant couldn&apos;t answer. These events never include what you type.
            </p>

            <h2>5. How long we keep it</h2>
            <p>
                We keep enquiry emails for as long as we need them to reply to you and to manage any work we do together. You can ask us to delete
                them at any time.
            </p>

            <h2>6. Your rights</h2>
            <p>
                You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. Email{" "}
                <a href={`mailto:${email}`}>{email}</a> and we&apos;ll respond within a reasonable time.
            </p>

            <h2>7. Data security</h2>
            <p>
                This website is served only over HTTPS with strict security headers, and enquiries are sent over encrypted connections. We take
                reasonable technical and organisational measures to protect your data, but no method of transmission over the internet is 100%
                secure.
            </p>

            <h2>8. Contact us</h2>
            <p>
                If you have any questions about this policy, email us at <a href={`mailto:${email}`}>{email}</a>. See also our{" "}
                <Link href="/terms">Terms of Service</Link>.
            </p>
        </LegalPage>
    );
}
