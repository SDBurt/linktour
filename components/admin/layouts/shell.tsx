import * as React from "react";

import { cn } from "@/lib/utils";

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppShell({ children, className, ...props }: AppShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
