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
            <p className="mb-3 text-sm font-semibold text-white">On this page</p>
            {/* Phones: one swipeable row of chips, so the list doesn't take a whole screen before the content. */}
            <ol className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0">
                {items.map((item) => (
                    <li key={item.id} className="flex-shrink-0">
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={cn(
                                "flex min-h-11 items-center whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors lg:whitespace-normal",
                                active === item.id ? "bg-accent font-medium text-black" : "bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white lg:bg-transparent lg:text-white/60 lg:hover:bg-white/[0.06]"
                            )}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
