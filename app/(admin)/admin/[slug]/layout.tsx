import Link from "next/link"
import { notFound } from "next/navigation"
import { UserButton, auth } from "@clerk/nextjs"

import { adminConfig } from "@/config/admin"
import { getProjectsForUserNav } from "@/lib/api/projects"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/admin/nav/main-nav"
import { SiteFooter } from "@/components/shared/page-footer"

interface AdminLayoutProps {
  children?: React.ReactNode
}

export default async function ProjectLayout({ children }: AdminLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    return notFound()
  }

  const projects = await getProjectsForUserNav(userId)

  return (
    <main className="flex w-full flex-1 flex-col overflow-hidden">
      {children}
    </main>
  )
}
