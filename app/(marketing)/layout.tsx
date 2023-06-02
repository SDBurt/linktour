import Link from "next/link"
import { auth } from "@clerk/nextjs"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/marketing/nav/main-nav"
import { SiteFooter } from "@/components/shared/page-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const { userId } = auth()

  let navCallToAction = (
    <Link
      href="/login"
      className={cn(
        buttonVariants({ variant: "secondary", size: "sm" }),
        "px-4"
      )}
    >
      Login
    </Link>
  )

  if (userId) {
    navCallToAction = (
      <Link
        href="/admin"
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          "px-4"
        )}
      >
        Admin
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} showSiteName />
          <nav>{navCallToAction}</nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
