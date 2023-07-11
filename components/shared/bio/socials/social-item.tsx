import React from "react"
import NextLink from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

export interface BioSocialItem {
  label: string
  name: string
  Icon: LucideIcon
  url: string
  color?: string
}

export default function SocialItem({
  label,
  name,
  Icon,
  url,
  color,
}: BioSocialItem) {
  if (!Object.keys(Icons).includes(name) || (url && url.trim().length === 0)) {
    return null
  }
  return (
    <NextLink className="px-1" href={url}>
      <Icon className="h-6 w-6" style={{ color: color ? color : undefined }} />
      <span className="sr-only">Open {label}</span>
    </NextLink>
  )
}
