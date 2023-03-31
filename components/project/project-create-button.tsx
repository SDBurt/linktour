"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { LinkCreateForm } from "../link/link-create-form"
import { ProjectCreateForm } from "./project-create-form"

interface ProjectCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateButton({
  className,
  ...props
}: ProjectCreateButtonProps) {

  const [showCreateDialog, setShowCreateDialog] = React.useState<boolean>(false)

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger className={cn(
        buttonVariants(),
        className
      )}
      {...props}
    >
        <Icons.add className="mr-2 h-4 w-4" />
        New Project
      </DialogTrigger>
      <DialogContent className="p-0">
        <ProjectCreateForm />
      </DialogContent>
    </Dialog>
  )
}