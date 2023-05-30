// @ts-nocheck
// TODO: Fix this when we turn strict mode on.

import { clerkClient } from "@clerk/nextjs/server"

import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if (!userId) {
    throw new Error("User not found")
  }

  let user = await clerkClient.users.getUser(userId)

  // Check if user is on a pro plan.
  const isPro =
    user.publicMetadata.stripePriceId &&
    user.publicMetadata.stripeCurrentPeriodEnd?.getTime() + 86_400_000 >
      Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    stripeCurrentPeriodEnd:
      user.publicMetadata.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
