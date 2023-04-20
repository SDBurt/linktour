import { cache } from "react"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { LinkCreateButton } from "@/components/link/link-create-button"
import { LinkItem } from "@/components/link/link-item"
import { DashboardShell } from "@/components/layouts/shell"
import { buttonVariants } from "@/components/ui/button"


export const metadata = {
  title: "Links",
}

const getLinksForUser = cache(async (userId: User["id"]) => {
  return await db.link.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      domain: true,
      key: true,
      url: true,
      clicks: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

async function LinksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const links = await getLinksForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading=" Links" text="Create and manage short links.">
        <LinkCreateButton
          className={cn(
          buttonVariants({ variant: "default" }),
          "mt-1"
        )}/>
      </DashboardHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any short links yet. Start creating content.
            </EmptyPlaceholder.Description>
            <LinkCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

export default LinksPage