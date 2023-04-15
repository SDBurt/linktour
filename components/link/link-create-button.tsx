"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { LinkCreateForm } from "./link-create-form"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateButton({
  className,
  ...props
}: LinkCreateButtonProps) {

  const [showCreateDialog, setShowCreateDialog] = React.useState<boolean>(false)

  return (
    <>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger className={cn(
          buttonVariants(),
          className
        )}
        {...props}
      >
          <Icons.add className="mr-2 h-4 w-4" />
          New Link
        </DialogTrigger>
        <DialogContent className="p-0">
          <LinkCreateForm/>
        </DialogContent>
      </Dialog>
    </>
  )
}