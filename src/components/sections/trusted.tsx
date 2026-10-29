import React from "react";

const logos = [
    { src: "/logos/tech/nextdotjs.svg", name: "Next.js" },
    { src: "/logos/tech/react.svg", name: "React" },
    { src: "/logos/tech/typescript.svg", name: "TypeScript" },
    { src: "/logos/tech/nodedotjs.svg", name: "Node.js" },
    { src: "/logos/tech/postgresql.svg", name: "PostgreSQL" },
    { src: "/logos/tech/mongodb.svg", name: "MongoDB" },
    { src: "/logos/tech/aws.svg", name: "AWS" },
    { src: "/logos/tech/stripe.svg", name: "Stripe" },
    { src: "/logos/tech/tailwindcss.svg", name: "Tailwind CSS" },
    { src: "/logos/tech/figma.svg", name: "Figma" },
];

export function Trusted() {
    return (
        <section className="relative py-16 md:py-20" aria-label="Technologies we build with">
            <div className="container mx-auto px-5 sm:px-6">
                <p className="mb-8 text-center text-sm text-white/55">Built on modern, proven technology</p>
                <div
                    className="relative overflow-hidden"
                    style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
                >
                    <ul className="marquee items-center" style={{ ["--marquee-duration" as string]: "45s" } as React.CSSProperties}>
                        {[...logos, ...logos].map((logo, i) => (
                            <li key={`${logo.name}-${i}`} className="flex flex-shrink-0 items-center gap-3 px-8 md:px-12" aria-hidden={i >= logos.length}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logo.src} alt="" className="h-6 w-6 object-contain opacity-60" loading="lazy" draggable={false} />
                                <span className="whitespace-nowrap text-base font-medium text-white/55">{logo.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
