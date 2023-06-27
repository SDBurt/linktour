import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { ProjectForm } from "@/components/admin/project/project-form"
import ProjectPreview from "@/components/shared/bio/project-preview"
import { BioSocialItem } from "@/components/shared/bio/socials/social-item"

interface HeaderProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: BioSocialItem[]
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
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 flex justify-center p-4 lg:col-span-1">
        <ProjectPreview
          theme={theme}
          socials={socials}
          project={project}
          links={links}
          user={{ username: user.username, imageUrl: user.imageUrl }}
        />
      </div>
      <div className="col-span-3 lg:-order-1 lg:col-span-2">
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
