import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";

// Sections render on the server so the full page is in the HTML for search engines and link previews.
export default function Home() {
    return (
        <div className="flex flex-col">
            <JsonLd data={faqSchema(faqs)} />
            <Hero />
            <Marquee />
            <Portfolio />
            <Services />
            <ProcessTimeline />
            <Pricing />
            <About />
            <FAQ />
            <Contact />
        </div>
    );
}
