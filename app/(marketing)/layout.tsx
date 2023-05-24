import Link from "next/link";

import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/admin/nav/main-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getServerSession(authOptions);

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
  );

  if (session?.user) {
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
    );
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
    </div>
  );
}
