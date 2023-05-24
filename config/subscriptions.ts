import { SubscriptionPlan } from "types";

export const freePlanValues = {
  project: {
    count: 2,
  },
  analytics: {
    link: {
      activity: true,
      device: true,
      country: true,
      referer: true,
    },
    lifetime: true,
    socials: true,
  },
};

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description: `The free plan is limited to ${freePlanValues.project.count} projects and basic analytics. Upgrade to the PRO plan for unlimited projects and analytics.`,
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited projects and additional analytics.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
};
