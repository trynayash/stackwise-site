import { LegalPage } from "@/components/marketing/legal-page";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Privacy Policy",
    description: "How StackWise collects, uses and protects the information you share with us.",
    canonical: "/privacy",
    ogKicker: "Legal",
});

export default function PrivacyPolicy() {
    return (
        <LegalPage title="Privacy Policy" updated="October 29, 2026">
            <p>
                At StackWise (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting the personal data we hold
                about you. This policy explains how we collect, use, and share your information when you visit our website or use our services.
            </p>

            <h2>1. Information we collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
                <li>Fill out a contact form or request a quote.</li>
                <li>Interact with our services or customer support.</li>
            </ul>
            <p>This information usually includes your name, email address, phone number, and any other details you choose to provide.</p>

            <h2>2. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, operate, and maintain our website and services.</li>
                <li>Respond to your inquiries and communicate with you about your project.</li>
                <li>Improve our website functionality and user experience.</li>
            </ul>

            <h2>3. Data security</h2>
            <p>
                We implement appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse.
                However, please note that no method of transmission over the Internet is 100% secure.
            </p>

            <h2>4. Contact us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href={`mailto:${siteConfig.emails.inbound}`}>{siteConfig.emails.inbound}</a>.
            </p>
        </LegalPage>
    );
}
