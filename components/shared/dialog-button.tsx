"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface DialogButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
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
  const [showCreateDialog, setShowCreateDialog] =
    React.useState<boolean>(false);

  return (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogTrigger className={cn(buttonVariants(), className)} {...props}>
        <Icons.add className="mr-2 h-4 w-4" />
        {text}
      </DialogTrigger>
      <DialogContent className="p-0">{children}</DialogContent>
    </Dialog>
  );
}
