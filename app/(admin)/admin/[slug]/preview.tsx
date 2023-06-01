import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import Bio from "@/components/shared/bio/bio"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

const Preview = ({ user, project, theme, links }: PreviewProps) => {
  return (
    <div className="rounded-lg bg-black p-2">
      <Bio user={user} project={project} theme={theme} links={links} />
    </div>
  )
}

export default Preview
