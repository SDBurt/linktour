import { LucideIcon } from "lucide-react"

import { MarketingConfig } from "types"
import THEME from "@/lib/constants/theme"
import { ThemeProps } from "@/lib/types"
import { Icons } from "@/components/shared/icons"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Demo",
      href: "/demo",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],
}

export type socialItemType = { icon: LucideIcon; name: string; label: string }

export const socialsOptions: socialItemType[] = [
  {
    label: "Facebook",
    name: "facebook",
    icon: Icons.facebook,
  },
  {
    label: "Twitter",
    name: "twitter",
    icon: Icons.twitter,
  },
  {
    label: "Instagram",
    name: "instagram",
    icon: Icons.instagram,
  },
  {
    label: "Github",
    name: "github",
    icon: Icons.github,
  },
  {
    label: "LinkedIn",
    name: "linkedin",
    icon: Icons.linkedin,
  },
  {
    label: "Email",
    name: "email",
    icon: Icons.mail,
  },
  {
    label: "Youtube",
    name: "youtube",
    icon: Icons.youtube,
  },
  {
    label: "Twitch",
    name: "twitch",
    icon: Icons.twitch,
  },
  {
    label: "Dribbble",
    name: "dribbble",
    icon: Icons.dribbble,
  },
]

export const demoDefaultProject = {
  name: "",
  image: "",
  description: "",
}
export const demoDefaultSocials = {
  facebook: "",
  twitter: "",
  instagram: "",
  github: "",
  linkedin: "",
  email: "",
  youtube: "",
  twitch: "",
  dribbble: "",
}

export const demoDefaultTheme = THEME
export const demoDefaultLinks = []

export const demoPopulatedProject = {
  name: "Morty Smith",
  description: "The titular central protagonist of Rick and Morty",
  image:
    "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png",
}
export const demoPopulatedSocials = {
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/home",
  instagram: "https://www.instagram.com/",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  email: "mail@morty_smith.cc",
  youtube: "https://www.youtube.com/",
  twitch: "https://www.twitch.tv/",
  dribbble: "https://dribbble.com/",
}

export const demoPopulatedTheme: ThemeProps = {
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
export const demoPopulatedLinks = [
  {
    title: "Wiki",
    url: "https://rickandmorty.fandom.com/wiki/Morty_Smith",
    slug: "wiki",
  },
  {
    title: "Watch",
    url: "https://www.adultswim.com/videos/rick-and-morty",
    slug: "watch",
  },
]
