import Link from "next/link"
import { Project } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { ProjectOperations } from "@/components/project/project-operations"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "../icons"

interface ProjectItemProps {
  project: Pick<Project, "id" | "name" | "createdAt">
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex justify-between w-full px-2 items-center">
          <Link
            href={project.name}
            className="font-semibold hover:underline"
          >
            {project.name}
          </Link>
          <p className="text-sm text-slate-600">
            {formatDate(project.createdAt?.toDateString())}
          </p>
      
        
      </div>
      <ProjectOperations project={{id: project.id, name: project.name}} />
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
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