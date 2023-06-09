"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/shared/icons"

interface DialogButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

/**
 * Component which wraps content and displays it in a model when the user
 * clicks on the trigger
 */
export function DialogButton({
  className,
  text,
  children,
  ...props
}: DialogButtonProps) {
  const [showCreateDialog, setShowCreateDialog] = React.useState<boolean>(false)

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        {text}
      </DialogTrigger>
      <DialogContent className="p-4">{children}</DialogContent>
    </Dialog>
  )
}
