import { Hero } from "@/components/sections/hero";
import { Trusted } from "@/components/sections/trusted";
import { ServiceBento } from "@/components/sections/service-bento";
import { Services } from "@/components/sections/services";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Portfolio } from "@/components/sections/portfolio";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { Founder } from "@/components/sections/founder";
import { TechStack } from "@/components/sections/tech-stack";
import { CtaBand } from "@/components/sections/cta-band";
import { Contact } from "@/components/sections/contact";
import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";

// Sections render on the server so the full page is in the HTML for search engines and link previews.
// The intro loader in LayoutShell only overlays it on a first visit.
export default function Home() {
    return (
        <div className="flex flex-col gap-0 pb-20">
            <JsonLd data={faqSchema(faqs)} />
            <Hero />
            <Trusted />
            <ServiceBento />
            <Portfolio />
            <Services />
            <ProcessTimeline />
            <Comparison />
            <Pricing />
            <Testimonials />
            <Founder />
            <TechStack />
            <FAQ />
            <CtaBand />
            <Contact />
        </div>
    );
}
