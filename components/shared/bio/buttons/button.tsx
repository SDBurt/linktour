import { cva } from "class-variance-authority"

import { ThemeButtonStyleTypeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export type bioButtonVariantsTypes =
  | "default"
  | "fill"
  | "outline"
  | "softShadow"
  | "hardShadow"
export type bioButtonBorderTypes = "default" | "rounded" | "circular"

export const bioButtonVariants = cva(
  "flex h-full w-full items-center justify-center p-4 font-medium transition-all ease-out",
  {
    variants: {
      variant: {
        default: "hover:scale-[1.01] hover:bg-transparent!",
        fill: "hover:scale-[1.01] hover:bg-transparent!",
        outline: "border hover:scale-[1.01]",
        softShadow: "soft-shadow hover:scale-[1.01]",
        hardShadow:
          "hard-shadow border border-black hover:translate-y-1 hover:translate-x-0.5",
      },
      type: {
        default: "rounded-none",
        rounded: "rounded-lg",
        circular: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "default",
    },
  }
)

export const bioButtonStyles = (
  variant: bioButtonVariantsTypes,
  textColor: string,
  backgroundColor: string,
  borderColor: string
) => {
  switch (variant) {
    case "default":
      return {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: textColor,
      }
    case "fill":
      return {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: textColor,
      }
    case "outline":
      return {
        borderColor: borderColor,
        color: textColor,
      }
    case "softShadow":
      return {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: textColor,
      }
    case "hardShadow":
      return {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: textColor,
      }
    default:
      return {}
  }
}

const buttonVariantType = (buttonType: string) => {
  const buttonMap = {
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

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonType: ThemeButtonStyleTypeProps
  textColor: string
  backgroundColor: string
  borderColor: string
}

export default function Button({
  buttonType,
  textColor,
  backgroundColor,
  borderColor,
  className,
  children,
}: ButtonProps) {
  const { variant, type } = buttonVariantType(buttonType)

  const buttonStyle = bioButtonStyles(
    variant,
    textColor,
    backgroundColor,
    borderColor
  )

  return (
    <div
      className={cn(bioButtonVariants({ variant, type, className }))}
      style={buttonStyle}
    >
      <div>
        <h1>{children}</h1>
      </div>
    </div>
  )
}
