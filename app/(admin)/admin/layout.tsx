import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { adminConfig } from "@/config/admin"
import { getProjectsForUserNav } from "@/lib/api/projects"
import { authOptions } from "@/lib/auth-options"
import { MainNav } from "@/components/admin/nav/main-nav"
import { UserAccountNav } from "@/components/admin/nav/user-account-nav"
import { SiteFooter } from "@/components/shared/page-footer"

interface AdminLayoutProps {
  children?: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const projects = await getProjectsForUserNav(session.user.id)

  return (
    <div className="mx-auto flex min-h-screen flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-background">
        <div className="flex h-16 items-center justify-between border-b py-4">
          <MainNav items={adminConfig.mainNav} projects={projects} />
          <UserAccountNav
            user={{
              name: session.user.name,
              image: session.user.image,
              email: session.user.email,
            }}
          />
        </div>
      </header>
      <div className="container flex-1">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
