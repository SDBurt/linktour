import { SubscriptionPlan } from "types";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 short links. Upgrade to the PRO plan for unlimited short links.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited short links.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
};
