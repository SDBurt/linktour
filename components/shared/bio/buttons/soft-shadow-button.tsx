import { Link } from "@prisma/client"

import BioButton, { bioButtonStyles } from "./bio-button"

interface SoftShadowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  type: "default" | "rounded" | "circular"
  textColor: string
  backgroundColor: string
}

function SoftShadowButton({
  link,
  backgroundColor,
  type,
  textColor,
}: SoftShadowButtonProps) {
  const buttonStyle = bioButtonStyles("fill", textColor, backgroundColor)

  return (
    <BioButton
      title={link.title}
      url={link.url}
      slug={link.slug}
      linkKey={link.key}
      variant={"softShadow"}
      type={type}
      style={buttonStyle}
    >
      {link.title}
    </BioButton>
  )
}

export default SoftShadowButton
