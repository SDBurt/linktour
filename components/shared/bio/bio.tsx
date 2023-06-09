import { useMemo } from "react"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { UserAvatar } from "@/components/user/user-avatar"

import BioLinkButton from "./bio-link-button"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

const Bio = ({ user, project, theme, links }: PreviewProps) => {
  const backgroundStyle = useMemo(() => {
    let style = {}
    if (theme.backgroundStyle === "COLORUP") {
      style = {
        background: `linear-gradient(${theme.backgroundColor}, ${theme.gradientColor})`,
      }
    } else if (theme.backgroundStyle === "COLORDOWN") {
      style = {
        background: `linear-gradient(${theme.gradientColor}, ${theme.backgroundColor})`,
      }
    } else {
      style = { backgroundColor: theme.backgroundColor }
    }
    return style
  }, [theme.backgroundColor, theme.backgroundStyle, theme.gradientColor])

  return (
    <main
      className="flex h-full w-full flex-col items-center justify-center p-4"
      style={backgroundStyle}
    >
      <div className="mb-auto w-full max-w-2xl space-y-8 p-4">
        <div className="flex w-full items-center justify-center">
          <UserAvatar
            className="h-24 w-24 ring-1"
            user={{ username: user.username, imageUrl: user.imageUrl }}
          />
        </div>
        <div
          className="w-full text-center"
          style={{
            color: theme.typefaceColor,
            fontFamily: theme.typefaceFamily,
          }}
        >
          <h2 className="pb-2 text-xl font-bold">{project.name}</h2>
          <p className="font-normal">{project.description}</p>
        </div>

        <ul className="flex flex-col space-y-4">
          {links.map((link, index) => (
            <li key={`${link.title.trim()}-${index}`}>
              <BioLinkButton link={link} theme={theme} />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="flex h-16 w-full items-center justify-center"
        style={{
          color: theme.typefaceColor,
          fontFamily: theme.typefaceFamily,
        }}
      >
        <p className="font-normal">LinkTour</p>
      </div>
    </main>
  )
}

export default Bio
