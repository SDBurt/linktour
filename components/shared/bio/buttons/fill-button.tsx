import { Link } from "@prisma/client"

import BioButton, { bioButtonStyles } from "./bio-button"

interface FillButtonProps {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  type: "default" | "rounded" | "circular"
  textColor: string
  backgroundColor: string
}

function FillButton({
  link,
  backgroundColor,
  type,
  textColor,
}: FillButtonProps) {
  const buttonStyle = bioButtonStyles("fill", textColor, backgroundColor)

  return (
    <BioButton
      url={link.url}
      slug={link.slug}
      linkKey={link.key}
      variant={"fill"}
      type={type}
      style={buttonStyle}
    >
      {link.title}
    </BioButton>
  )
}

export default FillButton
