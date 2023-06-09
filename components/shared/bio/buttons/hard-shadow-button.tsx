import { Link } from "@prisma/client"

import { cn } from "@/lib/utils"

import BioButton, { bioButtonStyles } from "./bio-button"

interface HardShadowButtonProps {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  type: "default" | "rounded" | "circular"
  textColor: string
  backgroundColor: string
}

function HardShadowButton({
  link,
  backgroundColor,
  type,
  textColor,
}: HardShadowButtonProps) {
  const buttonStyle = bioButtonStyles("hardShadow", textColor, backgroundColor)

  return (
    <BioButton
      url={link.url}
      slug={link.slug}
      linkKey={link.key}
      variant="hardShadow"
      type={type}
      style={buttonStyle}
    >
      {link.title}
    </BioButton>
  )
}

export default HardShadowButton
