import { Link, Theme, User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/shared/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type AdminConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export type EditorThemeType = Pick<
  Theme,
  | "key"
  | "luminance"
  | "socialStyleColor"
  | "backgroundColor"
  | "gradientColor"
  | "backgroundStyle"
  | "backgroundType"
  | "buttonBackgroundColor"
  | "buttonShadowColor"
  | "buttonTextColor"
  | "buttonType"
  | "typefaceColor"
  | "typefaceFamily"
>

export type LinkType = Pick<
  Link,
  | "id"
  | "title"
  | "slug"
  | "key"
  | "order"
  | "createdAt"
  | "url"
  | "clicks"
  | "thumbnail"
  | "thumbnailType"
>

export type ProjectType = Pick<Project, "id" | "name" | "slug" | "description">
