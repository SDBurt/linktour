import { Project } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyCardPlaceholder } from "@/components/shared/empty-card-placeholder";
import { ProjectCreateButton } from "./project-create-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectItem } from "./project-item";

interface ProjectListProps {
  projects: Pick<Project, "id" | "name" | "slug" | "description">[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
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
                description: project.description,
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
  );
}

ProjectList.Skeleton = function ProjectListSkeleton() {
  return (
    <EmptyCardPlaceholder>
      <EmptyCardPlaceholder.Icon name="post" />
      <EmptyCardPlaceholder.Title>
        <Skeleton className="h-5 w-4/5" />
      </EmptyCardPlaceholder.Title>
      <EmptyCardPlaceholder.Description>
        <Skeleton className="h-5 w-full" />
      </EmptyCardPlaceholder.Description>
    </EmptyCardPlaceholder>
  );
};
