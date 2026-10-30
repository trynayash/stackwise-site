"use client";

import React from "react";
import { QuoteChat } from "@/components/quote/quote-chat";
import { useQuoteChat } from "@/components/quote/use-quote-chat";

/** The quote chat as a standalone panel. Loaded on demand so its answer engine stays out of the first page load. */
export default function InlineChat() {
    const chat = useQuoteChat();
    return <QuoteChat chat={chat} className="h-full" />;
}
