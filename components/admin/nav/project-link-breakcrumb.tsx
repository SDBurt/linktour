"use client"

import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-8")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
            {item.title}
          </h4>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  pathname: string | null
}

export function ProjectLinkBreadcrumb({}: DocsSidebarNavItemsProps) {
  return (
    <div>
      {projects && <ProjectDropdownNav projects={projects ? projects : []} />}
      {links && <LinkDropdownNav projects={links ? links : []} />}
    </div>
        
      
  )
}
