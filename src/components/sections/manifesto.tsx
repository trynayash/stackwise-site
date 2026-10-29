import React from "react";
import { ScrollLitText } from "@/components/ui/scroll-effects";
import { Eyebrow, Reveal } from "@/components/ui/motion-primitives";

/** Short positioning statement whose words light up as it scrolls through the viewport. */
export function Manifesto() {
    return (
        <section className="relative py-20 md:py-32" aria-label="How we work">
            <div className="container mx-auto px-5 sm:px-6">
                <Reveal y={12}>
                    <Eyebrow>How we work</Eyebrow>
                </Reveal>
                <ScrollLitText
                    className="mt-8 max-w-5xl text-[1.75rem] font-medium leading-[1.25] tracking-[-0.025em] text-white sm:text-4xl md:text-5xl md:leading-[1.15]"
                    text="Every project is designed and engineered by the person you talk to, shipped in clear weekly steps, and handed over as clean, typed code you fully own — so your product keeps moving long after launch."
                />
            </div>
        </section>
    );
}
