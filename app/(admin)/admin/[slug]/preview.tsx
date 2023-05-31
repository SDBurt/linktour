import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import { User } from "@clerk/nextjs/dist/types/server"
import Bio from "@/components/shared/bio/bio"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

const Preview = ({ user, project, theme, links }: PreviewProps) => {

  return (
    <div className="rounded-lg p-2 bg-black">
      <Bio user={user} project={project} theme={theme} links={links}/>
    </div>
  )
}

export default Preview
