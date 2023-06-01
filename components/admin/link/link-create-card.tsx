"use client"

import * as React from "react"

import { LinkCreateForm } from "@/components/admin/link/link-create-form"
import { DialogCardButton } from "@/components/shared/dialog/dialog-card-button"

interface LinkCreateCardProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateCard({ className, ...props }: LinkCreateCardProps) {
  return (
    <DialogCardButton className={className} {...props} text="New Link">
      <LinkCreateForm />
    </DialogCardButton>
  )
}
