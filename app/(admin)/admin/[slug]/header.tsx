
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import Preview from "./preview"
import { User } from "@clerk/nextjs/dist/types/server"
import { ProjectForm } from "@/components/admin/project/project-form"

interface HeaderProps {
  project: Pick<Project, "id" | "name" | "description" | "image" | "slug">
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
  theme: ThemeProps
  user: Pick<User, "imageUrl" | "username">
}

export function Header({ project, links, theme, user }: HeaderProps) {

  return (
    <div className="grid grid-cols-3 py-2 ">
      <div className="col-span-2 flex max-h-[700px] flex-col space-y-2 overflow-y-scroll px-2">
        <ProjectForm project={project} />
      </div>
      <div className="col-span-1 flex w-full items-center justify-center overflow-hidden">
        <div className="h-[700px] w-[341px] rounded-lg border bg-black p-2">
          <Preview
            theme={theme}
            project={project}
            links={links}
            user={{ username: user.username, imageUrl: user.imageUrl }}
          />
        </div>
      </div>
    </div>
  )
}
