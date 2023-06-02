import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs"

import { getProjectsForUser } from "@/lib/api/projects"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppShell } from "@/components/admin/layouts/shell"
import { ProjectCreateButton } from "@/components/admin/project/project-create-button"
import { ProjectList } from "@/components/admin/project/project-list"
import { AppHeader } from "@/components/shared/page-header"

import { Billing } from "./billing"

export const metadata = {
  title: "Admin",
}

async function AdminHomePage() {
  const user = await currentUser()

  if (!user?.id) {
    return redirectToSignIn()
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  const projects = await getProjectsForUser(user.id)

  return (
    <AppShell>
      {/* <Breadcrumb /> */}
      <AppHeader
        heading="Admin"
        text="Create and manage projects, billing, and settings"
      ></AppHeader>
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger id="projects" value="projects">
            Projects
          </TabsTrigger>
          <TabsTrigger id="billing" value="billing">
            Billing
          </TabsTrigger>
          <TabsTrigger id="settings" disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectList projects={projects} />
        </TabsContent>
        <TabsContent value="billing">
          <Billing
            isCanceled={isCanceled}
            subscriptionPlan={subscriptionPlan}
          />
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}

export default AdminHomePage
