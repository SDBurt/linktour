import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { EmptyCardPlaceholder } from "@/components/shared/empty-card-placeholder";
import { AppHeader } from "@/components/shared/page-header";
import { ProjectCreateButton } from "@/components/project/project-create-button";
import { AppShell } from "@/components/layouts/shell";
import { buttonVariants } from "@/components/ui/button";
import { ProjectItem } from "@/components/project/project-item";
import { getProjectsForUser } from "@/lib/api/projects";
import { getServerSession } from "next-auth";

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
      <AppHeader heading="Projects" text="Create and manage projects.">
        {/* <ProjectCreateButton /> */}
      </AppHeader>
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
          <EmptyCardPlaceholder>
            <EmptyCardPlaceholder.Icon name="post" />
            <EmptyCardPlaceholder.Title>
              No projects created
            </EmptyCardPlaceholder.Title>
            <EmptyCardPlaceholder.Description>
              You don&apos;t have any projects yet. Start creating content.
            </EmptyCardPlaceholder.Description>
            <ProjectCreateButton
              className={cn(buttonVariants({ variant: "outline" }))}
            />
          </EmptyCardPlaceholder>
        )}
      </div>
    </AppShell>
  );
}

export default AdminHomePage;