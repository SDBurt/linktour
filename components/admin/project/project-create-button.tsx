"use client"

import * as React from "react"

import { DialogCardButton } from "@/components/shared/dialog-card-button"

import { ProjectForm } from "./project-form"

interface ProjectCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateButton({
  className,
  ...props
}: ProjectCreateButtonProps) {
  return (
    <DialogCardButton className={className} {...props} text="New Project">
      <ProjectForm />
    </DialogCardButton>
  )
}
