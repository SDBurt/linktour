export interface SimpleLinkProps {
  key: string
  url: string
}

export interface LinkProps {
  id?: string
  slug: string
  key: string
  url: string

  title: string | null
  description: string | null

  clicks: number

  public: boolean
  publicStats: boolean

  createdAt: Date
  updatedAt: Date

  userId: string
}

export interface ProjectProps {
  id: string
  name: string
  slug: string
  userId: string
  links?: { id: string }[]
}

export interface UsageProps {
  usage: number
  usageLimit: number
  projectCount?: number
  billingCycleStart?: number
  ownerUsageLimit?: number
  ownerExceededUsage?: boolean
}

export interface UserProps {
  id: string
  name: string
  email: string
  stripeId: string
  usageLimit: number
  joinedAt?: Date
  projects?: { projectId: string }[]
}

export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error"

export interface RootDomainProps {
  target: string
  rewrite?: boolean
}

export type ThemeBackgroundStyleProps = "COLORUP" | "COLORDOWN" | "FLAT"
export type ThemeBackgroundTypeProps = "COLOR" | "IMAGE"
export type ThemeButtonStyleTypeProps =
  | "SOFTSHADOW_CIRCULAR"
  | "SOFTSHADOW_ROUNDED"
  | "SOFTSHADOW"
  | "HARDSHADOW_CIRCULAR"
  | "HARDSHADOW_ROUNDED"
  | "HARDSHADOW"
  | "OUTLINE_CIRCULAR"
  | "OUTLINE_ROUNDED"
  | "OUTLINE"
  | "FILL_CIRCULAR"
  | "FILL_ROUNDED"
  | "FILL"

export type ThemeLuminanceProps = "LIGHT" | "DARK"

export interface ThemeProps {
  key: string
  luminance: ThemeLuminanceProps
  socialStyleColor: string
  backgroundColor: string
  gradientColor: string
  backgroundStyle: ThemeBackgroundStyleProps
  backgroundType: ThemeBackgroundTypeProps
  buttonBackgroundColor: string
  buttonShadowColor?: string
  buttonBorderColor: string
  buttonTextColor: string
  buttonType: ThemeButtonStyleTypeProps
  typefaceColor: string
  typefaceFamily: string
}
