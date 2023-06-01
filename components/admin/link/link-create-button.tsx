"use client"

import * as React from "react"

import { LinkCreateForm } from "@/components/admin/link/link-create-form"
import { DialogCardButton } from "@/components/shared/dialog-card-button"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateButton({
  className,
  ...props
}: LinkCreateButtonProps) {
  return (
    <DialogCardButton className={className} {...props} text="New Link">
      <LinkCreateForm />
    </DialogCardButton>
  )
}
