import { UserSubscriptionPlan } from "@/types"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BillingForm } from "@/components/admin/billing/billing-form"
import { Icons } from "@/components/shared/icons"

interface BillingProps {
  subscriptionPlan: UserSubscriptionPlan
  isCanceled: boolean
}

export function Billing({ subscriptionPlan, isCanceled }: BillingProps) {
  return (
    <div className="grid gap-2">
      <Alert className="!pl-14">
        <Icons.warning />
        <AlertTitle>This is a demo app.</AlertTitle>
        <AlertDescription>
          This app currently uses a Stripe test environment. You can find a list
          of test card numbers on the{" "}
          <a
            href="https://stripe.com/docs/testing#cards"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-8"
          >
            Stripe docs
          </a>
          .
        </AlertDescription>
      </Alert>
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  )
}
