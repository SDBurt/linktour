"use client";

import * as React from "react";

import { ProjectCreateForm } from "@/components/admin/project/project-create-form";
import { DialogButton } from "@/components/shared/dialog-button";

interface ProjectCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateButton({
  className,
  ...props
}: ProjectCreateButtonProps) {
  return (
    <DialogButton {...props} text="New Project">
      <ProjectCreateForm />
    </DialogButton>
  );
}
