"use client"

import * as React from "react"

import { DialogButton } from "@/components/shared/dialog-button"

import { ProjectForm } from "./project-form"

interface ProjectCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateButton({
  className,
  ...props
}: ProjectCreateButtonProps) {
  return (
    <DialogButton className={className} {...props} text="New Project">
      <ProjectForm />
    </DialogButton>
  )
}
