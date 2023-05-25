import React, { useMemo } from "react"
import { Link, Project, User } from "@prisma/client"
import hexToRgba from "hex-to-rgba"

import { ThemeProps } from "@/lib/types"
import { UserAvatar } from "@/components/user/user-avatar"

import CustomButton from "./customButton"

interface PreviewProps {
  user: Pick<User, "image" | "name">
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
}

const Preview = ({ user, project, theme, links }: PreviewProps) => {
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
    <div
      className="flex h-full w-full flex-col items-center justify-center py-8"
      style={backgroundStyle}
    >
      <div className="mb-auto w-full max-w-2xl space-y-8 p-4">
        <div className="flex w-full items-center justify-center">
          <UserAvatar
            className="h-24 w-24"
            user={{ name: user.name, image: user.image }}
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

        <div className="flex flex-col space-y-4">
          {links.map((link, index) => (
            <CustomButton
              key={`${link.title.trim()}-${index}`}
              link={link}
              theme={theme}
            />
          ))}
        </div>
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
    </div>
  )
}

export default Preview
