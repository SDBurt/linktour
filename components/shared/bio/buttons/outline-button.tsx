import { Link } from "@prisma/client"

import { cn } from "@/lib/utils"

import BioButton from "./bio-button"

interface OutlineButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  type: "default" | "rounded" | "circular"
  textColor: string
  backgroundColor: string
}

function OutlineButton({
  link,
  backgroundColor,
  type,
  color,
}: OutlineButtonProps) {
  const buttonStyle = bioButtonStyles("outline", textColor, backgroundColor)

  return (
    <BioButton
      title={link.title}
      url={link.url}
      slug={link.slug}
      linkKey={link.key}
      variant="outline"
      type={type}
      style={buttonStyle}
    >
      {link.title}
    </BioButton>
  )
}

export default OutlineButton
