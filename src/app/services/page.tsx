import { MarketingHub } from "@/components/marketing/marketing-hub";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Software Development Services",
    description: "SaaS development, AI development, custom software and web development by StackWise. Production-grade code, clear communication and full code ownership.",
    canonical: "/services",
    ogKicker: "Services",
});

export default function ServicesPage() {
    return (
        <MarketingHub
            kind="Services"
            title="Software development"
            accent="services."
            intro="From SaaS and AI to mobile, design and DevOps — one standard throughout: production-grade code, clear communication and a product you fully own when we're done."
        />
    );
}
