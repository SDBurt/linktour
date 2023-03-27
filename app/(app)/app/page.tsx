import { cache } from "react"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ShortLinkCreateButton } from "@/components/short-link/short-link-create-button"
import { ShortLinkItem } from "@/components/short-link/short-link-item"
import { DashboardShell } from "@/components/layouts/shell"
import { buttonVariants } from "@/components/ui/button"


export const metadata = {
  title: "Dashboard",
}

const getLinksForUser = cache(async (userId: User["id"]) => {
  return await db.shortLink.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      shortUrl: true,
      destinationUrl: true,
      clicks: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const links = await getLinksForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Short Links" text="Create and manage short links.">
        <ShortLinkCreateButton />
      </DashboardHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {links.map((link) => (
              <ShortLinkItem key={link.id} shortLink={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any short linkss yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ShortLinkCreateButton
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

export default DashboardPage