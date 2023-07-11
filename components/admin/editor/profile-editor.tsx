import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project, SocialLink } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { ProjectForm } from "@/components/admin/project/project-form"
import ProjectPreview from "@/components/shared/bio/project-preview"

interface HeaderProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: Pick<SocialLink, "id" | "type" | "order" | "url" | "active">[]
  project: Pick<Project, "id" | "name" | "image" | "description" | "slug">
  theme: ThemeProps
  links: Pick<
    Link,
    | "id"
    | "title"
    | "slug"
    | "key"
    | "order"
    | "createdAt"
    | "url"
    | "clicks"
    | "thumbnail"
    | "thumbnailType"
  >[]
}

export default function ProfileEditor({
  user,
  socials,
  project,
  theme,
  links,
}: HeaderProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-2">
        <ProjectForm project={project} />
      </div>
      <div className="col-span-4 hidden justify-center p-4 lg:col-span-2 lg:flex">
        <ProjectPreview
          theme={theme}
          socials={socials}
          project={project}
          links={links}
          user={{ username: user.username, imageUrl: user.imageUrl }}
        />
      </div>
    </div>
  )
}
