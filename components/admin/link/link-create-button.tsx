"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LinkCreateForm } from "@/components/admin/link/link-create-form"
import { DialogButton } from "@/components/shared/dialog-button"
import { Icons } from "@/components/shared/icons"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateButton({
  className,
  ...props
}: LinkCreateButtonProps) {
  return (
    <DialogButton {...props} text="New Link">
      <LinkCreateForm />
    </DialogButton>
  )
}
