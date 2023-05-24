import NextLink from "next/link"
import { Project } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ProjectOperations } from "@/components/admin/project/project-operations"
import { Icons } from "@/components/shared/icons"

interface ProjectItemProps {
  project: Pick<Project, "id" | "name" | "slug" | "description">
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle>
          <NextLink
            href={`/admin/${project.slug}`}
            className="cursor-pointer font-semibold hover:underline"
          >
            {project.name}
          </NextLink>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <NextLink href={project.slug} target="_blank">
                <TooltipTrigger
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })
                  )}
                >
                  <Icons.external />
                </TooltipTrigger>
              </NextLink>
              <TooltipContent>
                <p>View project page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ProjectOperations
            project={{
              id: project.id,
              name: project.name,
              slug: project.slug,
              description: project.description,
            }}
          />
        </div>
      </CardContent>
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
