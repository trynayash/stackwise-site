"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky contents list that highlights the section currently being read. */
export function CaseStudyToc({ items }: { items: { id: string; title: string }[] }) {
    const [active, setActive] = useState(items[0]?.id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [items]);

    return (
        <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/55">On this page</p>
            <ol className="space-y-1 border-l border-line">
                {items.map((item, i) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={cn(
                                "-ml-px flex items-center gap-3 border-l py-1.5 pl-4 text-sm transition-colors",
                                active === item.id ? "border-accent text-white" : "border-transparent text-white/55 hover:text-white/80"
                            )}
                        >
                            <span className="font-mono text-xs text-white/50">{String(i + 1).padStart(2, "0")}</span>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
