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
    label: "facebook",
    name: "facebook",
    Icon: Icons.facebook,
    url: "https://www.facebook.com",
  },
  {
    label: "twitter",
    name: "twitter",
    Icon: Icons.twitter,
    url: "https://twitter.com/home",
  },
  {
    label: "instagram",
    name: "instagram",
    Icon: Icons.instagram,
    url: "https://www.instagram.com",
  },
  {
    label: "github",
    name: "github",
    Icon: Icons.github,
    url: "https://github.com",
  },
  {
    label: "linkedin",
    name: "linkedin",
    Icon: Icons.linkedin,
    url: "https://www.linkedin.com",
  },
  {
    label: "email",
    name: "email",
    Icon: Icons.mail,
    url: "mail@morty_smith.cc",
  },
  {
    label: "youtube",
    name: "youtube",
    Icon: Icons.youtube,
    url: "https://www.youtube.com",
  },
  {
    label: "twitch",
    name: "twitch",
    Icon: Icons.twitch,
    url: "https://www.twitch.tv",
  },
  {
    label: "dribbble",
    name: "dribbble",
    Icon: Icons.dribbble,
    url: "https://dribbble.com",
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
