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

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    return notFound()
  }

  const projects = await getProjectsForUserNav(userId)

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between  py-4">
          <MainNav items={adminConfig.mainNav} projects={projects} />
          <div className="flex flex-row space-x-2">
            <Link
              href="https://t7bdb9vvkgv.typeform.com/to/KrCQIcJ9"
              target="_blank"
              className={buttonVariants({ variant: "outline" })}
            >
              Feedback
            </Link>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "border rounded-full shadow-sm",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </header>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
