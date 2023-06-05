"use client"

import NextLink from "next/link"
import { Link } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  url: string
  slug: string
  key: string
}

function BioButton({
  slug,
  key,
  url,
  title,
  className,
  style,
}: BioButtonProps) {
  async function buttonClickedHandler(s: string, k: string) {
    if (s && k) {
      await fetch(`/api/projects/${s}/links/${k}/click`)
    } else {
      console.warn("slug or link is undefined")
    }
  }

  return (
    <div onClick={(e) => buttonClickedHandler(slug, key)}>
      <NextLink href={url} className={className} style={style} target="_blank">
        <div>
          <h1>{title}</h1>
        </div>
      </NextLink>
    </div>
  )
}

interface CustomButtonProps {
  link: Pick<Link, "title" | "url" | "slug" | "key">
  theme: ThemeProps
}

const makeGeneralStyle = (buttonType: string) => {
  const customStyles = {
    FILL: "hover:bg-transparent hover:translate-y-1",
    FILL_ROUNDED: "rounded-lg hover:bg-transparent hover:translate-y-1",
    FILL_CIRCULAR: "rounded-full hover:bg-transparent hover:translate-y-1",
    OUTLINE: "border hover:scale-[1.01]",
    OUTLINE_ROUNDED: "border rounded-lg hover:scale-[1.01]",
    OUTLINE_CIRCULAR: "border rounded-full hover:scale-[1.01]",
    SOFTSHADOW: "shadow hover:drop-shadow-sm hover:scale-[1.01]",
    SOFTSHADOW_ROUNDED:
      "shadow rounded-lg hover:drop-shadow-sm hover:scale-[1.01]",
    SOFTSHADOW_CIRCULAR:
      "shadow rounded-full hover:drop-shadow-sm hover:scale-[1.01]",
    HARDSHADOW:
      "hard-shadow hover:shadow-[0_4px_0px_rgb(0,0,0)] hover:-translate-y-1",
    HARDSHADOW_ROUNDED:
      "hard-shadow rounded-lg hover:shadow-[0_4px_0px_rgb(0,0,0)] hover:-translate-y-1",
    HARDSHADOW_CIRCULAR:
      "hard-shadow rounded-full hover:shadow-[0_4px_0px_rgb(0,0,0)] hover:-translate-y-1",
  }

  return `${customStyles[buttonType]}`
}

const isOutline = (buttonType: string) => {
  return (
    buttonType === "OUTLINE" ||
    buttonType === "OUTLINE_ROUNDED" ||
    buttonType === "OUTLINE_CIRCULAR"
  )
}

const makeBackgroundStyle = (type: string, color: string) => {
  if (isOutline(type)) {
    return undefined
  }
  return color
}

const makeBorderStyle = (type: string, color: string) => {
  if (isOutline(type)) {
    return undefined
  }
  return color
}

export default function CustomButton({ link, theme }: CustomButtonProps) {
  // we can use tailwind for non-arbitrary values
  const buttonCls = cn(
    "flex h-full w-full items-center justify-center p-4 font-medium", // position and base style
    "ease-out transition-all", // animate
    makeGeneralStyle(theme?.buttonType)
  )

  // arbitrary values can't dynamically be set so we have to use style
  const buttonStyle = {
    backgroundColor: makeBackgroundStyle(
      theme?.buttonType,
      theme.buttonBackgroundColor
    ),
    borderColor: makeBorderStyle(
      theme?.buttonType,
      theme.buttonBackgroundColor
    ),
    color: theme.buttonTextColor,
  }

  return (
    <BioButton
      title={link.title}
      url={link.url}
      slug={link.slug}
      key={link.key}
      className={buttonCls}
      style={buttonStyle}
    />
  )
}
