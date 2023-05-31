import { notFound, useParams } from "next/navigation"
import { UserButton, auth } from "@clerk/nextjs"
import { adminConfig } from "@/config/admin"
import { getProjectsForUserNav } from "@/lib/api/projects"
import { MainNav } from "@/components/admin/nav/main-nav"
import { SiteFooter } from "@/components/shared/page-footer"

interface AdminLayoutProps {
  children?: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    return notFound()
  }

  const projects = await getProjectsForUserNav(userId)

  return (
    <div className="mx-auto flex min-h-screen flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-background">
        <div className="flex h-16 items-center justify-between border-b py-4">
          <MainNav items={adminConfig.mainNav} projects={projects} />
          <UserButton afterSignOutUrl="/" />
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
