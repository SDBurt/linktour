"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ProjectCreateForm } from "./project-create-form";

interface ProjectCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function ProjectCreateButton({
  className,
  ...props
}: ProjectCreateButtonProps) {
  const [showCreateDialog, setShowCreateDialog] =
    React.useState<boolean>(false);

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger className={cn(buttonVariants(), className)} {...props}>
        <Icons.add className="mr-2 h-4 w-4" />
        New Project
      </DialogTrigger>
      <DialogContent className="p-0">
        <ProjectCreateForm />
      </DialogContent>
    </Dialog>
  );
}
