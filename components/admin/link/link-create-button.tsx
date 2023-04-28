"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LinkCreateForm } from "@/components/admin/link/link-create-form";
import { DialogButton } from "@/components/shared/dialog-button";

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
  );
}
