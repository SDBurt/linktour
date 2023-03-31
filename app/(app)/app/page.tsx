import { cache } from "react"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ProjectCreateButton } from "@/components/project/project-create-button"
import { DashboardShell } from "@/components/layouts/shell"
import { buttonVariants } from "@/components/ui/button"


export const metadata = {
  title: "Dashboard",
}

const getProjectsForUser = cache(async (userId: User["id"]) => {
  return await db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      domain: true,
      verified: true,
      links: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

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
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {projects.map((project) => (
              <p>{project.id}</p>
              
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