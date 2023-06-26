import type { Meta, StoryObj } from "@storybook/react"

import BioSocials from "@/components/shared/bio/socials/socials"
import { Icons } from "@/components/shared/icons"

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

const meta: Meta<typeof BioSocials> = {
  component: BioSocials,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof BioSocials>

export const Default: Story = {
  args: {
    socials,
  },
}
