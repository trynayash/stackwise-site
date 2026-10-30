import { llmsFull } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms-full.txt: the full text of every landing page and guide, for AI assistants and answer engines. */
export function GET() {
    return new Response(llmsFull(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
