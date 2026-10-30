import React from "react";
import Image from "next/image";

const stack = [
    ["Next.js", "nextdotjs"],
    ["React", "react"],
    ["TypeScript", "typescript"],
    ["Node.js", "nodedotjs"],
    ["Go", "go"],
    ["PostgreSQL", "postgresql"],
    ["Redis", "redis"],
    ["Tailwind CSS", "tailwindcss"],
    ["Stripe", "stripe"],
    ["AWS", "aws"],
    ["Docker", "docker"],
    ["Vercel", "vercel"],
    ["Python", "python"],
    ["Figma", "figma"],
] as const;

function Item({ name, file, copy = false }: { name: string; file: string; copy?: boolean }) {
    return (
        <li aria-hidden={copy || undefined} className="flex flex-shrink-0 items-center gap-3 px-6 text-white/60 transition-colors hover:text-white md:px-9">
            <Image src={`/logos/tech/${file}.svg`} alt="" width={28} height={28} className="h-7 w-7 opacity-70" />
            <span className="text-lg font-semibold tracking-tight md:text-xl">{name}</span>
        </li>
    );
}

/** Endless strip of the tools we build with. CSS-only; pauses on hover and stops for reduced motion. */
export function StackLoop() {
    return (
        <section aria-label="Technologies we use" className="relative py-12 md:py-16">
            <p className="container mx-auto mb-8 px-5 text-center text-[15px] text-white/55 sm:px-6">
                Built with tools your next engineer will already know
            </p>
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
                <ul className="marquee items-center" style={{ ["--marquee-duration" as string]: "50s" } as React.CSSProperties}>
                    {stack.map(([name, file]) => (
                        <Item key={name} name={name} file={file} />
                    ))}
                    {/* Second copy for a seamless loop; hidden from screen readers. */}
                    {stack.map(([name, file]) => (
                        <Item key={`${name}-copy`} name={name} file={file} copy />
                    ))}
                </ul>
            </div>
        </section>
    );
}
