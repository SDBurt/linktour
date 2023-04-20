import { cache } from "react"
import { notFound, redirect } from "next/navigation"
import { Link, User } from "@prisma/client"

import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { LinkCreateButton } from "@/components/link/link-create-button"
import { DashboardShell } from "@/components/layouts/shell"
import { buttonVariants } from "@/components/ui/button"
import { LinkProps } from "@/lib/types"
import { getSession } from "next-auth/react"


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

const getLink = cache(async (key: Link["key"]) => {
  const link = await db.link.findUnique({
    where: {
      domain_key: {
        domain: "localhost:3000",
        key
      }
    },
    select: {
      id: true,
      title: true,
      domain: true,
      key: true,
      url: true,
      clicks: true,
      createdAt: true,
    }
  })

  return link
})


export async function generateStaticParams() {

  const session = await getSession();

  let links: LinkProps[] = []
  if (session?.user) {
    links = (await getLinksForUser(session.user.id)) as LinkProps[]
  }
  
  return links.map((link) => ({
    key: link.key,
  }));

}

export async function generateMetadata({ params }) {

  const link = await getLink(params.key)

  return { title: link?.title || 'Link' };
}

async function DashboardPage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const link = await getLink(params.key)

  if (!link) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={link.title} text="Manage link." />
  
      <p>Placeholder</p>
    </DashboardShell>
  )
}

export default DashboardPage