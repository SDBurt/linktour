import { Link } from "@prisma/client"

import { ThemeProps } from "@/lib/types"

import BioButton, { bioButtonStyles } from "./buttons/bio-button"

interface BioLinkButtonProps {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  theme: ThemeProps
}

const buttonVariantType = (buttonType: string) => {
  const buttonMap = {
    FILL: { variant: "fill", type: "default" },
    FILL_ROUNDED: { variant: "fill", type: "rounded" },
    FILL_CIRCULAR: { variant: "fill", type: "circular" },
    OUTLINE: { variant: "outline", type: "default" },
    OUTLINE_ROUNDED: { variant: "outline", type: "rounded" },
    OUTLINE_CIRCULAR: { variant: "outline", type: "circular" },
    SOFTSHADOW: { variant: "softShadow", type: "default" },
    SOFTSHADOW_ROUNDED: { variant: "softShadow", type: "rounded" },
    SOFTSHADOW_CIRCULAR: { variant: "softShadow", type: "circular" },
    HARDSHADOW: { variant: "hardShadow", type: "default" },
    HARDSHADOW_ROUNDED: { variant: "hardShadow", type: "rounded" },
    HARDSHADOW_CIRCULAR: { variant: "hardShadow", type: "circular" },
  }

  return buttonMap[buttonType]
}

export default function BioLinkButton({ link, theme }: BioLinkButtonProps) {
  const {
    buttonType,
    buttonTextColor,
    buttonBackgroundColor,
    buttonBorderColor,
  } = theme
  const { variant, type } = buttonVariantType(buttonType)
  const { title, url, slug, key } = link

  const buttonStyle = bioButtonStyles(
    variant,
    buttonTextColor,
    buttonBackgroundColor,
    buttonBorderColor
  )

  const buttonClickedHandler = (s: string, k: string) => {
    if (s && k) {
      fetch(`/api/projects/${s}/links/${k}/click`).then(() =>
        console.log("registered click done")
      )
    } else {
      console.warn("slug or link is undefined")
    }
  }
  return (
    <BioButton
      onClick={() => buttonClickedHandler(slug, key)}
      url={url}
      variant={variant}
      type={type}
      style={buttonStyle}
    >
      {title}
    </BioButton>
  )
}
