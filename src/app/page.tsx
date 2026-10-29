import { Hero } from "@/components/sections/hero";
import { Trusted } from "@/components/sections/trusted";
import { Manifesto } from "@/components/sections/manifesto";
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
export default function Home() {
    return (
        <div className="flex flex-col">
            <JsonLd data={faqSchema(faqs)} />
            <Hero />
            <Trusted />
            <Manifesto />
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
