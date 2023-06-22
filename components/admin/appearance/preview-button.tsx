import React from "react"

import { ThemeButtonStyleTypeProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import Button from "@/components/shared/bio/buttons/button"

interface PreviewButtonWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  active: boolean
}

export function PreviewButtonWrapper({
  active,
  children,
  ...props
}: PreviewButtonWrapperProps) {
  return (
    <div
      className={cn(
        "rounded border border-muted p-4 hover:cursor-pointer hover:border-muted-foreground",
        active ? "border-2 border-muted-foreground" : null
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface PreviewButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonType: ThemeButtonStyleTypeProps
  buttonTextColor: string
  buttonBackgroundColor: string
  buttonBorderColor: string
  active?: boolean
  children?: React.ReactNode
}

export default function PreviewButton({
  buttonTextColor,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonType,
  active = false,
  children,
  ...props
}: PreviewButtonProps) {
  return (
    <PreviewButtonWrapper active={active} {...props}>
      <Button
        className="h-10 px-4 py-2"
        textColor={buttonTextColor}
        backgroundColor={buttonBackgroundColor}
        borderColor={buttonBorderColor}
        buttonType={buttonType}
      >
        {children}
      </Button>
    </PreviewButtonWrapper>
  )
}
