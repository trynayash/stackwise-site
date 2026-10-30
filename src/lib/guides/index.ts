import type { Guide } from "@/lib/guides/types";
import saasCost from "@/lib/guides/saas-development-cost-india";
import websiteCost from "@/lib/guides/website-development-cost-india";
import mvpCost from "@/lib/guides/mvp-development-cost";
import saasTimeline from "@/lib/guides/how-long-to-build-a-saas";
import chooseCompany from "@/lib/guides/how-to-choose-a-saas-development-company";
import whiteLabel from "@/lib/guides/white-label-development-for-agencies";
import outsourcing from "@/lib/guides/outsourcing-software-development-to-india";
import freelancerVsAgency from "@/lib/guides/freelancer-vs-agency-vs-studio";
import multiTenant from "@/lib/guides/multi-tenant-saas-architecture";
import stripeVsRazorpay from "@/lib/guides/stripe-vs-razorpay-for-saas";
import nextjsVsWordpress from "@/lib/guides/nextjs-vs-wordpress";
import aiChatbotCost from "@/lib/guides/ai-chatbot-development-cost";
import mobileAppCost from "@/lib/guides/mobile-app-development-cost-india";
import saasPricingModels from "@/lib/guides/saas-pricing-models";
import hiringInMumbai from "@/lib/guides/hiring-a-software-company-in-mumbai";
import contractChecklist from "@/lib/guides/software-development-contract-checklist";
import customVsOffTheShelf from "@/lib/guides/custom-software-vs-off-the-shelf";

export type { Guide };

/** Every guide, in the order the guides hub and footer list them. */
export const guides: Guide[] = [
    saasCost,
    websiteCost,
    mvpCost,
    aiChatbotCost,
    mobileAppCost,
    saasTimeline,
    saasPricingModels,
    customVsOffTheShelf,
    chooseCompany,
    hiringInMumbai,
    contractChecklist,
    whiteLabel,
    outsourcing,
    freelancerVsAgency,
    multiTenant,
    stripeVsRazorpay,
    nextjsVsWordpress,
];

export const guideBySlug: Record<string, Guide> = Object.fromEntries(guides.map((g) => [g.slug, g]));
