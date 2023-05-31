
import { Project } from "@prisma/client"
import { ProjectForm } from "@/components/admin/project/project-form"

interface HeaderProps {
  project: Pick<Project, "id" | "name" | "description" | "image" | "slug">
}

export function Header({ project }: HeaderProps) {

  return (
    <div className="flex max-h-[700px] flex-col space-y-2 overflow-y-auto">
      <ProjectForm project={project} />
    </div>
    
  )
}
