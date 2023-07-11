import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project, SocialLink } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import Preview from "../preview/preview"
import ProjectBio from "./project-bio"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: Pick<SocialLink, "id" | "type" | "order" | "url" | "active">[]
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

export default function ProjectPreview({
  user,
  project,
  socials,
  theme,
  links,
}: PreviewProps) {
  return (
    <Preview>
      <ProjectBio
        user={user}
        socials={socials}
        project={project}
        theme={theme}
        links={links}
      />
    </Preview>
  )
}
