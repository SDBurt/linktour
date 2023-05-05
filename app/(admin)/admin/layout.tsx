import { notFound } from "next/navigation";

import { adminConfig } from "@/config/admin";
import { MainNav } from "@/components/admin/nav/main-nav";
import { PrimaryNav } from "@/components/admin/nav/nav";
import { UserAccountNav } from "@/components/admin/nav/user-account-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getProjectsForUserNav } from "@/lib/api/projects";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return notFound();
  }

  const projects = await getProjectsForUserNav(session.user.id);

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
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
      <div className="container">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
