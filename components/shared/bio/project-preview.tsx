import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import Preview from "../preview/preview"
import ProjectBio from "./project-bio"
import { BioSocialItem } from "./socials/social-item"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: BioSocialItem[]
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
