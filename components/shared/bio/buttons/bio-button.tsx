import NextLink from "next/link"
import { VariantProps, cva } from "class-variance-authority"

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
        default: "hover:translate-y-1 hover:bg-transparent",
        fill: "hover:translate-y-1 hover:bg-transparent",
        outline: "border hover:scale-[1.01]",
        softShadow: "shadow hover:drop-shadow-sm hover:scale-[1.01]",
        hardShadow:
          "hard-shadow hover:shadow-[0_4px_0px_rgb(0,0,0)] hover:-translate-y-1",
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
  backgroundColor: string
) => {
  switch (variant) {
    case "default":
      return {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }
    case "fill":
      return {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }
    case "outline":
      return {
        borderColor: backgroundColor,
        color: textColor,
      }
    case "softShadow":
      return {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }
    case "hardShadow":
      return {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }
    default:
      return {}
  }
}

export interface BioButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bioButtonVariants> {
  url: string
}

function BioButton({
  url,
  variant,
  type,
  className,
  style,
  children,
}: BioButtonProps) {
  return (
    <div>
      <NextLink
        href={url}
        className={cn(bioButtonVariants({ variant, type, className }))}
        style={style}
        target="_blank"
      >
        <div>
          <h1>{children}</h1>
        </div>
      </NextLink>
    </div>
  )
}

export default BioButton