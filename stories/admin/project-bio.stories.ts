import type { Meta, StoryObj } from "@storybook/react"

import { ThemeProps } from "@/lib/types"
import ProjectBio from "@/components/shared/bio/project-bio"
import { Icons } from "@/components/shared/icons"

const project = {
  name: "Morty Smith",
  description: "The titular central protagonist of Rick and Morty",
  image:
    "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png",
}

const socials = [
  {
    id: "facebook",
    type: "facebook",
    order: 0,
    url: "https://www.facebook.com",
    active: true,
  },
  {
    id: "twitter",
    type: "twitter",
    order: 1,
    url: "https://twitter.com/home",
    active: true,
  },
  {
    id: "instagram",
    type: "instagram",
    order: 2,
    url: "https://www.instagram.com",
    active: true,
  },
  {
    id: "github",
    type: "github",
    order: 3,
    url: "https://github.com",
    active: true,
  },
  {
    id: "linkedin",
    type: "linkedin",
    order: 4,
    url: "https://www.linkedin.com",
    active: true,
  },
  {
    id: "email",
    type: "email",
    order: 5,
    url: "mail@morty_smith.cc",
    active: true,
  },
  {
    id: "youtube",
    type: "youtube",
    order: 6,
    url: "https://www.youtube.com",
    active: true,
  },
  {
    id: "twitch",
    type: "twitch",
    order: 7,
    url: "https://www.twitch.tv",
    active: true,
  },
  {
    id: "dribbble",
    type: "dribbble",
    order: 8,
    url: "https://dribbble.com",
    active: true,
  },
]

const theme: ThemeProps = {
  key: "custom",
  luminance: "DARK",
  socialStyleColor: "",
  backgroundColor: "#8dff50",
  gradientColor: "#ffb800",
  backgroundStyle: "COLORDOWN",
  backgroundType: "COLOR",
  buttonBackgroundColor: "#ffffff",
  buttonShadowColor: "#000000",
  buttonBorderColor: "#333333",
  buttonTextColor: "#333333",
  buttonType: "HARDSHADOW_CIRCULAR",
  typefaceColor: "#333333",
  typefaceFamily: "dm sans",
}
const links = [
  {
    title: "Wiki",
    key: "fandom",
    url: "https://rickandmorty.fandom.com/wiki/Morty_Smith",
    slug: "wiki",
  },
  {
    title: "Watch",
    key: "adultswim",
    url: "https://www.adultswim.com/videos/rick-and-morty",
    slug: "watch",
  },
]

const meta: Meta<typeof ProjectBio> = {
  component: ProjectBio,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ProjectBio>

export const Default: Story = {
  args: {
    user: { username: project.name, imageUrl: project.image },
    socials: socials,
    project: project,
    theme: theme,
    links: links,
  },
}

export const NoSocials: Story = {
  args: {
    user: { username: project.name, imageUrl: project.image },
    project: project,
    theme: theme,
    links: links,
  },
}

export const NoLinks: Story = {
  args: {
    user: { username: project.name, imageUrl: project.image },
    socials: socials,
    project: project,
    theme: theme,
  },
}
