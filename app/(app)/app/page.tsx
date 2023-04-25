import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { ProjectCreateButton } from "@/components/project/project-create-button";
import { DashboardShell } from "@/components/layouts/shell";
import { buttonVariants } from "@/components/ui/button";
import { ProjectItem } from "@/components/project/project-item";
import { getProjectsForUser } from "@/lib/api/projects";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "App",
};

async function AppPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const projects = await getProjectsForUser(session.user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Create and manage projects.">
        <ProjectCreateButton />
      </DashboardHeader>
      <div>
        {projects?.length ? (
          <div className="space-y-1">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={{
                  id: project.id,
                  name: project.name,
                  slug: project.slug,
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any projects yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ProjectCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}

export default AppPage;
