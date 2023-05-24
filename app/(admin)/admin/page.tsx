import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { stripe } from "@/lib/stripe";
import { AppHeader } from "@/components/shared/page-header";
import { ProjectCreateButton } from "@/components/admin/project/project-create-button";
import { AppShell } from "@/components/admin/layouts/shell";
import { getProjectsForUser } from "@/lib/api/projects";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/admin/project/project-list";
import { Billing } from "./billing";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export const metadata = {
  title: "Admin",
};

async function AdminHomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  const projects = await getProjectsForUser(session.user.id);

  return (
    <AppShell>
      {/* <Breadcrumb /> */}
      <AppHeader
        heading="Admin"
        text="Create and manage projects, billing, and settings"
      >
        <ProjectCreateButton />
      </AppHeader>
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
  );
}

export default AdminHomePage;
