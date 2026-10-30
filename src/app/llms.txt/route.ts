import { llmsIndex } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms.txt: a plain-Markdown map of the site for AI assistants and AI search (llmstxt.org). */
export function GET() {
    return new Response(llmsIndex(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
