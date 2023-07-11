import { useMemo } from "react"
import NextLink from "next/link"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project, SocialLink } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import { Icons } from "../icons"
import BioBanner from "./banner/bio-banner"
import { Bio, BioContent, BioFooter } from "./bio"
import ButtonList from "./buttons/button-list"
import { BioSocialItem } from "./socials/social-item"
import BioSocials from "./socials/socials"

interface ProjectBioProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: Pick<SocialLink, "id" | "type" | "order" | "url" | "active">[]
  project: Pick<Project, "name" | "image" | "description">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
  isPreview?: boolean
}

const ProjectBio = ({
  user,
  socials,
  project,
  theme,
  links,
  isPreview = false,
}: ProjectBioProps) => {
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

  const socialItems: BioSocialItem[] = useMemo(() => {
    if (!socials || socials.length === 0) return []

    const socialsData: BioSocialItem[] = []
    socials.forEach((item: SocialLink) => {
      socialsData.push({
        label: item.type,
        name: item.type,
        Icon: Icons[item.type],
        url: item.url,
      })
    })

    return socialsData
  }, [socials])

  return (
    <Bio style={backgroundStyle}>
      <BioContent>
        <BioBanner
          name={project.name}
          description={project.description}
          imageUrl={user.imageUrl}
          imageName={user.username}
          theme={{ typefaceColor: theme.typefaceColor }}
        />

        {/* List of social icon buttons */}
        {socials && (
          <BioSocials socials={socialItems} color={theme.typefaceColor} />
        )}

        {/* List of link buttons */}
        {links && (
          <ButtonList
            links={links}
            buttonType={theme.buttonType}
            buttonTextColor={theme.buttonTextColor}
            buttonBackgroundColor={theme.buttonBackgroundColor}
            buttonBorderColor={theme.buttonBorderColor}
            registerClick={!isPreview}
          />
        )}
      </BioContent>
      <BioFooter>
        <NextLink
          href="/"
          className="flex h-16 w-full items-center justify-center space-x-2"
          style={{
            color: theme.typefaceColor,
          }}
        >
          <Icons.logo />
          <p className="font-primary">LinkTour</p>
        </NextLink>
      </BioFooter>
    </Bio>
  )
}

export default ProjectBio
