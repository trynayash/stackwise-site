import React from "react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";

const facts = [
    { label: "Role", value: "Founder & lead engineer" },
    { label: "Main stack", value: "Next.js · TypeScript · Go" },
    { label: "Every project", value: "Full code & IP handover" },
];

export function Founder() {
    return (
        <section id="founder" className="relative py-20 md:py-28" aria-label="About the founder">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader index="08" eyebrow="About" title="Meet the engineer" muted="behind StackWise." />

                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5">
                        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/founder-portrait.webp"
                                alt="Yash Suthar, founder of StackWise"
                                className="aspect-[4/5] w-full object-cover"
                                width={640}
                                height={640}
                                loading="lazy"
                            />
                            <figcaption className="flex items-center justify-between border-t border-line p-5">
                                <div>
                                    <p className="text-lg font-semibold text-white">Yash Suthar</p>
                                    <p className="text-sm text-white/50">Founder, StackWise</p>
                                </div>
                                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                            </figcaption>
                        </figure>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <blockquote className="text-2xl font-medium leading-snug tracking-tight text-white md:text-[2rem] md:leading-[1.3] text-balance">
                            &ldquo;Every line of code should serve a clear business outcome — faster systems, happier users and less manual work.&rdquo;
                        </blockquote>

                        <div className="mt-8 space-y-4 text-base leading-relaxed text-white/60">
                            <p>
                                I started StackWise to build fast, well-made web products. I work on each project myself, from the architecture plan to the
                                final performance check.
                            </p>
                            <p>My main stack is Next.js, TypeScript and Tailwind. I write custom code instead of using WordPress templates.</p>
                        </div>

                        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                            {facts.map((f) => (
                                <div key={f.label} className="bg-canvas p-5">
                                    <dt className="text-xs uppercase tracking-[0.16em] text-white/40">{f.label}</dt>
                                    <dd className="mt-2 text-[15px] font-medium text-white">{f.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-8">
                            <ButtonLink href={`mailto:${siteConfig.emails.inbound}`} variant="secondary">
                                <Icon icon={Mail01Icon} size={18} />
                                Email Yash directly
                            </ButtonLink>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
