import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { proPlan } from "@/config/subscriptions"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/admin#billing")

export async function GET(req: Request) {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return new Response(null, { status: 403 })
    }

    const emailAddress = user?.emailAddresses.find(
      (email) => email.id === user?.primaryEmailAddressId
    )?.emailAddress

    if (!emailAddress) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: emailAddress,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
