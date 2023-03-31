import NextLink from "next/link"
import { Project } from "@prisma/client"

import { ProjectOperations } from "@/components/project/project-operations"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card"

interface ProjectItemProps {
  project: Pick<Project, "id" | "name" | "slug" | "domain">
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Card key={project.id} className="p-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <NextLink href={`/${project.slug}`} className="font-semibold hover:underline cursor-pointer">{project.name}</NextLink>
            <div>api.sub.com/{project.slug}</div>
          </div>
          <ProjectOperations project={{id: project.id, name: project.name, slug: project.slug, domain: project.domain}}/>
        </div>
      
    </Card>
  )
}

ProjectItem.Skeleton = function ProjectItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex w-full px-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
      </div>
    </div>
  )
}