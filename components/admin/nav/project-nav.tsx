"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"

interface ProjectNavProps {
  items: SidebarNavItem[]
}

export function ProjectNav({ items }: ProjectNavProps) {
  const path = usePathname()
  const { slug } = useParams()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const fullPath = `/admin/${slug}/${item.href}`
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          <Link key={index} href={item.disabled ? "/" : fullPath}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                path === fullPath ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
