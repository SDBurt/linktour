"use client"

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

export interface BioButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bioButtonVariants> {
  url: string
  slug: string
  LinkKey: string
}

function BioButton({
  url,
  slug,
  LinkKey,
  variant,
  type,
  className,
  style,
  children,
}: BioButtonProps) {
  async function buttonClickedHandler() {
    console.log(slug, LinkKey)
    await fetch(`/api/projects/${slug}/links/${LinkKey}/click`)
  }

  return (
    <div>
      {url ? (
        <NextLink
          onClick={() => buttonClickedHandler()}
          href={url}
          className={cn(bioButtonVariants({ variant, type, className }))}
          style={style}
          target="_blank"
        >
          <div>
            <h1>{children}</h1>
          </div>
        </NextLink>
      ) : (
        <div
          className={cn(bioButtonVariants({ variant, type, className }))}
          style={style}
        >
          <div>
            <h1>{children}</h1>
          </div>
        </div>
      )}
    </div>
  )
}

export default BioButton
