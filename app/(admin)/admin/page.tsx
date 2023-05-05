import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { AppHeader } from "@/components/shared/page-header";
import { ProjectCreateButton } from "@/components/admin/project/project-create-button";
import { AppShell } from "@/components/admin/layouts/shell";
import { getProjectsForUser } from "@/lib/api/projects";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/admin/project/project-list";

export const metadata = {
  title: "Admin",
};

async function AdminHomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const projects = await getProjectsForUser(session.user.id);

  return (
    <AppShell>
      {/* <Breadcrumb /> */}
      <AppHeader heading="Projects" text="Create and manage projects.">
        <ProjectCreateButton />
      </AppHeader>
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectList projects={projects} />
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

export default AdminHomePage;
