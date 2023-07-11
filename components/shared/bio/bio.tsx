import React from "react"

import { cn } from "@/lib/utils"

const Bio = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col items-center justify-center px-2 py-12",
      className
    )}
    style={style}
    {...props}
  />
))
Bio.displayName = "Bio"

const BioContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-auto w-full max-w-2xl space-y-6 p-4", className)}
    style={style}
    {...props}
  />
))
BioContent.displayName = "BioContent"

const BioFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center", className)}
    style={style}
    {...props}
  />
))
BioFooter.displayName = "BioFooter"

export { Bio, BioContent, BioFooter }
