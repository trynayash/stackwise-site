import { LegalPage } from "@/components/marketing/legal-page";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Terms of Service",
    description: "The terms that apply when you use the StackWise website and services.",
    canonical: "/terms",
    ogKicker: "Legal",
});

export default function TermsOfService() {
    return (
        <LegalPage title="Terms of Service" updated="February 15, 2026">
            <p>
                Welcome to StackWise. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our services.
            </p>

            <h2>1. Services</h2>
            <p>
                StackWise provides digital engineering, design, and development services. The specific deliverables and scope of work will be defined
                in a separate agreement or Statement of Work (SOW) signed by both parties.
            </p>

            <h2>2. Intellectual property</h2>
            <p>
                All content on this website, including text, graphics, logos, and code, is the property of StackWise or its licensors and is protected
                by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2>3. Limitation of liability</h2>
            <p>
                To the fullest extent permitted by law, StackWise shall not be liable for any indirect, incidental, special, or consequential damages
                arising out of or in connection with the use of our services or inability to use the website.
            </p>

            <h2>4. Changes to terms</h2>
            <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by updating the
                &quot;Last updated&quot; date at the top of this page. Your continued use of the services confirms your acceptance of these changes.
            </p>

            <h2>5. Governing law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

            <h2>6. Contact</h2>
            <p>
                For any legal inquiries, please contact us at <a href={`mailto:${siteConfig.emails.primary}`}>{siteConfig.emails.primary}</a>.
            </p>
        </LegalPage>
    );
}
