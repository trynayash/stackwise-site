import React from "react";
import Link from "next/link";

const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

/** Renders guide text: [label](/path) becomes a link and **text** becomes bold. Everything else is plain text. */
export function RichText({ text }: { text: string }) {
    return (
        <>
            {text.split(TOKEN).map((part, i) => {
                const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
                if (link) {
                    const [, label, href] = link;
                    const cls = "font-medium text-white underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent";
                    return href.startsWith("/") ? (
                        <Link key={i} href={href} className={cls}>
                            {label}
                        </Link>
                    ) : (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {label}
                        </a>
                    );
                }
                const bold = part.match(/^\*\*([^*]+)\*\*$/);
                if (bold) return <strong key={i} className="font-semibold text-white">{bold[1]}</strong>;
                return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
        </>
    );
}
