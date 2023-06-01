"use client"

import * as React from "react"

import { DialogCardButton } from "@/components/shared/dialog/dialog-card-button"

import { ProjectForm } from "./project-form"

interface ProjectCreateCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateCard({
  className,
  ...props
}: ProjectCreateCardProps) {
  return (
    <DialogCardButton className={className} {...props} text="New Project">
      <ProjectForm />
    </DialogCardButton>
  )
}
