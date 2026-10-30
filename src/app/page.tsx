import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { StackLoop } from "@/components/sections/stack-loop";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { GuidesTeaser } from "@/components/sections/guides-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";
import { homeServices } from "@/lib/home-data";

// Sections render on the server so the full page is in the HTML for search engines and link previews.
export default function Home() {
    return (
        <div className="flex flex-col">
            <JsonLd data={faqSchema(faqs)} />
            <Hero />
            <Marquee />
            <Portfolio />
            <Testimonials />
            <Services {...homeServices()} />
            <StackLoop />
            <ProcessTimeline />
            <Pricing />
            <About />
            <FAQ />
            <GuidesTeaser />
            <Contact />
        </div>
    );
}
