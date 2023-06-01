"use client"

import * as React from "react"

import { LinkCreateForm } from "@/components/admin/link/link-create-form"
import { DialogButton } from "@/components/shared/dialog-button"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateButton({
  className,
  ...props
}: LinkCreateButtonProps) {
  return (
    <DialogButton className={className} {...props} text="New Link">
      <LinkCreateForm />
    </DialogButton>
  )
}
