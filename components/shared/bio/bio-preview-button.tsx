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
  theme: ThemeProps
  children: React.ReactNode
}

const buttonVariantType = (
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

export default function PreviewButton({
  theme,
  buttonType,
  children,
}: PreviewButtonProps) {
  const { buttonTextColor, buttonBackgroundColor } = theme
  const { variant, type } = buttonVariantType(buttonType)
  const buttonStyle = bioButtonStyles(
    "hardShadow",
    buttonTextColor,
    buttonBackgroundColor
  )

  return (
    <div
      className={cn(bioButtonVariants({ variant: variant, type: type }))}
      style={buttonStyle}
    >
      {children}
    </div>
  )
}
