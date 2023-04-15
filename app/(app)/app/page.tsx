import { cache } from "react"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ProjectCreateButton } from "@/components/project/project-create-button"
import { DashboardShell } from "@/components/layouts/shell"
import { buttonVariants } from "@/components/ui/button"
import { ProjectItem } from "@/components/project/project-item"
import { getProjectsForUser } from "@/lib/api/projects"


export const metadata = {
  title: "App",
}

async function AppPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const projects = await getProjectsForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Create and manage projects.">
        <ProjectCreateButton />
      </DashboardHeader>
      <div>
        {projects?.length ? (
          <div className="space-y-1">
            {projects.map((project) => (
             <ProjectItem key={project.id} project={{id: project.id, name: project.name, slug: project.slug, domain: project.domain}} />
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
  )
}

export default AppPage