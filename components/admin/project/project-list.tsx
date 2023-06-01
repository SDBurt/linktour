import { Project } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { ProjectCreateButton } from "./project-create-button"
import { ProjectCreateCard } from "./project-create-card"
import { ProjectItem } from "./project-item"

interface ProjectListProps {
  projects: Pick<Project, "id" | "name" | "slug" | "description">[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {projects?.length ? (
          <>
            <ProjectCreateCard className="h-full" />
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={{
                  id: project.id,
                  name: project.name,
                  slug: project.slug,
                  description: project.description,
                }}
              />
            ))}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any projects yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ProjectCreateButton
              className={cn(buttonVariants({ variant: "outline" }))}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  )
}

ProjectList.Skeleton = function ProjectListSkeleton() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>
        <Skeleton className="h-5 w-4/5" />
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        <Skeleton className="h-5 w-full" />
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}
