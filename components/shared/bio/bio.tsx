import { useMemo } from "react"
import NextLink from "next/link"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"
import { LucideIcon } from "lucide-react"

import { ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { UserAvatar } from "@/components/user/user-avatar"

import { Icons } from "../icons"
import BioLinkButton from "./bio-link-button"

interface PreviewProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: { [social: string]: string }[]
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

function SocialLink({ social, url }: { social: string; url: string }) {
  if (
    !Object.keys(Icons).includes(social) ||
    (url && url.trim().length === 0)
  ) {
    return null
  }
  const Icon: LucideIcon = Icons[social]
  return (
    <NextLink
      className={cn(buttonVariants({ variant: "ghost", size: "xs" }))}
      href={url}
    >
      <Icon className="h-5 w-5" />
    </NextLink>
  )
}

const Bio = ({ user, socials, project, theme, links }: PreviewProps) => {
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
            className="h-24 w-24 ring-1 ring-muted"
            user={{ username: user.username, imageUrl: user.imageUrl }}
          />
        </div>
        <div
          className="w-full text-center"
          style={{
            color: theme.typefaceColor,
          }}
        >
          <h2 className="pb-2 text-xl font-bold">{project.name}</h2>
          <p className="font-normal">{project.description}</p>
        </div>

        {socials && Object.keys(socials).length > 0 && (
          <div className="flex items-center justify-center space-x-1">
            {Object.keys(socials).map((social) => {
              if (socials[social].trim().length === 0) {
                return null
              }
              return <SocialLink social={social} url={socials[social]} />
            })}
          </div>
        )}

        <ul className="flex flex-col space-y-4">
          {links.map((link, index) => (
            <li key={`${link.title.trim()}-${index}`}>
              <BioLinkButton link={link} theme={theme} />
            </li>
          ))}
        </ul>
      </div>

      <NextLink
        href="/"
        className="flex h-16 w-full items-center justify-center space-x-2"
        style={{
          color: theme.typefaceColor,
        }}
      >
        <Icons.logo />
        <p className="font-normal">LinkTour</p>
      </NextLink>
    </main>
  )
}

export default Bio
