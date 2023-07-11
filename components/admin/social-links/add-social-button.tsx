"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogButton } from "@/components/shared/dialog/dialog-button"

import AddSocialProcess from "./add-social-process"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  projectSlug: string
}

export function AddSocialButton({
  className,
  projectSlug,
  ...props
}: LinkCreateButtonProps) {
  return (
    <DialogButton className={className} {...props} text="Add Social Link">
      <AddSocialProcess slug={projectSlug} />
    </DialogButton>
  )
}
