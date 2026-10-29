import React from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import type { ArchitectureDiagram as Diagram } from "@/lib/case-studies";

/** Lanes of components read left to right (top to bottom on phones), as drawn on yashsuthar.dev. */
export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
    return (
        <figure className="rounded-2xl border border-line bg-surface p-5 md:p-7">
            <div className="space-y-6">
                {diagram.lanes.map((lane) => (
                    <div key={lane.label}>
                        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/40">{lane.label}</p>
                        <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
                            {lane.nodes.map((node, i) => (
                                <li key={node.name} className="flex flex-col md:flex-1 md:flex-row md:items-center">
                                    <div className="h-full flex-1 rounded-xl border border-line-strong bg-canvas p-4">
                                        <p className="text-sm font-semibold text-white">{node.name}</p>
                                        {node.detail && <p className="mt-1 text-xs leading-relaxed text-white/50">{node.detail}</p>}
                                    </div>
                                    {i < lane.nodes.length - 1 && (
                                        <span className="flex justify-center py-1 text-white/30 md:px-2 md:py-0" aria-hidden>
                                            <Icon icon={ArrowRight01Icon} size={16} className="rotate-90 md:rotate-0" />
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
            <figcaption className="mt-6 border-t border-line pt-4 text-sm text-white/55">{diagram.caption}</figcaption>
        </figure>
    );
}
