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
    <div className="h-[729px] w-[340px] overflow-hidden overflow-y-auto rounded-[3rem] ring-8 ring-slate-800">
      <Bio user={user} project={project} theme={theme} links={links} />
    </div>
  )
}

export default Preview
