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

export type { Guide };

/** Every guide, in the order the guides hub and footer list them. */
export const guides: Guide[] = [
    saasCost,
    websiteCost,
    mvpCost,
    saasTimeline,
    chooseCompany,
    whiteLabel,
    outsourcing,
    freelancerVsAgency,
    multiTenant,
    stripeVsRazorpay,
    nextjsVsWordpress,
];

export const guideBySlug: Record<string, Guide> = Object.fromEntries(guides.map((g) => [g.slug, g]));
