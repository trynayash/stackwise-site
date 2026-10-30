import { MarketingHub } from "@/components/marketing/marketing-hub";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Software Development by Industry",
    description: "Software, SaaS and app development for fintech, healthcare, edtech, e-commerce, real estate and logistics, built around each industry's rules and workflows.",
    canonical: "/industries",
    ogKicker: "Industries",
});

export default function IndustriesPage() {
    return (
        <MarketingHub
            kind="Industries"
            title="Software built for"
            accent="how your industry works."
            intro="Every industry has its own rules, data and workflows. Start from yours to see what we build, what we design for and what it costs."
        />
    );
}
