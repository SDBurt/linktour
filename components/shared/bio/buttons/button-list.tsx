"use client"

import React from "react"
import NextLink from "next/link"

import { ThemeButtonStyleTypeProps } from "@/lib/types"

import Button from "./button"

interface LinkButtionItem {
  title: string
  url: string
  slug: string
  key: string
}

interface ButtonListProps {
  links: LinkButtionItem[]
  buttonType: ThemeButtonStyleTypeProps
  buttonTextColor: string
  buttonBackgroundColor: string
  buttonBorderColor: string
  registerClick?: boolean
}

export default function ButtonList({
  links,
  buttonType,
  buttonTextColor,
  buttonBackgroundColor,
  buttonBorderColor,
  registerClick = true,
}: ButtonListProps) {
  async function buttonClickedHandler(slug: string, LinkKey: string) {
    await fetch(`/api/projects/${slug}/links/${LinkKey}/click`)
  }

  if (links.length === 0) {
    return (
      <ul className="grid gap-4">
        <span className="text-center">List Empty</span>
      </ul>
    )
  }

  return (
    <ul className="grid gap-4">
      {links.map((link, index) => (
        <li key={`${link.title.trim()}-${index}`}>
          {registerClick && link.url.trim() !== "" ? (
            <NextLink
              href={link.url}
              onClick={() => buttonClickedHandler(link.slug, link.key)}
              target="_blank"
            >
              <Button
                buttonType={buttonType}
                textColor={buttonTextColor}
                backgroundColor={buttonBackgroundColor}
                borderColor={buttonBorderColor}
              >
                <span>{link.title}</span>
              </Button>
            </NextLink>
          ) : (
            <Button
              buttonType={buttonType}
              textColor={buttonTextColor}
              backgroundColor={buttonBackgroundColor}
              borderColor={buttonBorderColor}
            >
              <span>{link.title}</span>
            </Button>
          )}
        </li>
      ))}
    </ul>
  )
}
