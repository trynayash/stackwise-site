import type { Guide } from "@/lib/guides/types";

/** Guide text without [label](/path) link and **bold** markup, for structured data and plain-text outputs. */
export function plainText(text: string) {
    return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** Every word a reader sees in the guide, used for the reading-time estimate. */
export function guideWordCount(guide: Guide) {
    const parts: string[] = [guide.answer, ...guide.takeaways, ...guide.faqs.flatMap((f) => [f.q, f.a])];
    for (const s of guide.sections) {
        parts.push(s.heading);
        for (const b of s.blocks) {
            if (b.type === "p") parts.push(b.text);
            else if (b.type === "list") parts.push(...b.items);
            else if (b.type === "table") parts.push(...b.head, ...b.rows.flat());
            else parts.push(b.title, b.text);
        }
    }
    return plainText(parts.join(" ")).split(/\s+/).filter(Boolean).length;
}

/** Minutes to read at about 220 words a minute. */
export function readingMinutes(guide: Guide) {
    return Math.max(1, Math.round(guideWordCount(guide) / 220));
}

/** "2026-10-30" → "30 October 2026". */
export function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
