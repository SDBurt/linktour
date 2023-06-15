"use client"

import React from "react"

import { ThemeButtonStyleTypeProps, ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

import {
  bioButtonStyles,
  bioButtonVariants,
  type bioButtonBorderTypes,
  type bioButtonVariantsTypes,
} from "./buttons/bio-button"

interface PreviewButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonType: ThemeButtonStyleTypeProps
  buttonTextColor: string
  buttonBackgroundColor: string
  buttonBorderColor: string
  active?: boolean
  children?: React.ReactNode
}
interface PreviewButtonWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  active: boolean
}

export const buttonVariantType = (
  buttonType: ThemeButtonStyleTypeProps
): { variant: bioButtonVariantsTypes; type: bioButtonBorderTypes } => {
  const buttonMap: {
    [key: string]: {
      variant: bioButtonVariantsTypes
      type: bioButtonBorderTypes
    }
  } = {
    FILL: { variant: "fill", type: "default" },
    FILL_ROUNDED: { variant: "fill", type: "rounded" },
    FILL_CIRCULAR: { variant: "fill", type: "circular" },
    OUTLINE: { variant: "outline", type: "default" },
    OUTLINE_ROUNDED: { variant: "outline", type: "rounded" },
    OUTLINE_CIRCULAR: { variant: "outline", type: "circular" },
    SOFTSHADOW: { variant: "softShadow", type: "default" },
    SOFTSHADOW_ROUNDED: { variant: "softShadow", type: "rounded" },
    SOFTSHADOW_CIRCULAR: { variant: "softShadow", type: "circular" },
    HARDSHADOW: { variant: "hardShadow", type: "default" },
    HARDSHADOW_ROUNDED: { variant: "hardShadow", type: "rounded" },
    HARDSHADOW_CIRCULAR: { variant: "hardShadow", type: "circular" },
  }

  return buttonMap[buttonType]
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

export default function PreviewButton({
  buttonTextColor,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonType,
  active,
  children,
  ...props
}: PreviewButtonProps) {
  const { variant, type } = buttonVariantType(buttonType)
  const buttonStyle = bioButtonStyles(
    variant,
    buttonTextColor,
    buttonBackgroundColor,
    buttonBorderColor
  )

  return (
    <PreviewButtonWrapper active={active ?? false} {...props}>
      <div
        className={cn(
          bioButtonVariants({ variant: variant, type: type }),
          "h-10 px-4 py-2"
        )}
        style={buttonStyle}
      >
        {children}
      </div>
    </PreviewButtonWrapper>
  )
}
