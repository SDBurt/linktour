"use client"

import * as React from "react"
import NextLink from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/admin/nav/mobile-nav"
import { Icons } from "@/components/shared/icons"

interface MainNavProps {
  showSiteName?: boolean
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({
  items,
  showSiteName = false,
  children,
}: MainNavProps) {
  const segment = useSelectedLayoutSegment()

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-4 md:gap-8">
      <NextLink href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        {showSiteName && (
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        )}
      </NextLink>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <NextLink
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`) && "text-foreground",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </NextLink>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
