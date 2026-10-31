import React from "react";
import Link from "next/link";
import { ArrowBubble, Card, IconTile } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { SiteLink } from "@/lib/site-links";

/** Link to another page of the site: its icon, what kind of page it is, the title and a one-line summary. */
export function RelatedCard({ link }: { link: SiteLink }) {
    return (
        <Link href={link.path} className="group block h-full">
            <Card interactive className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between">
                    <IconTile>
                        <Icon icon={link.icon} size={20} />
                    </IconTile>
                    <ArrowBubble size="sm" />
                </div>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-white/55">{link.kind}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{link.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{link.summary}</p>
            </Card>
        </Link>
    );
}
