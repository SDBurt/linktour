"use client"

import * as React from "react"

import { DialogCardButton } from "@/components/shared/dialog/dialog-card-button"

import AddSocialProcess from "./add-social-process"

interface SocialLinkCreateCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  slug: string
}

export function SocialLinkCreateCard({
  className,
  slug,
  ...props
}: SocialLinkCreateCardProps) {
  return (
    <DialogCardButton className={className} {...props} text="Add Social Link">
      <AddSocialProcess slug={slug} />
    </DialogCardButton>
  )
}
