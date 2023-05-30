import { cache } from "react"
import { notFound, redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { Link, Project } from "@prisma/client"

import { db } from "@/lib/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppShell } from "@/components/admin/layouts/shell"
import Activity from "@/components/admin/stats/activity"
import Country from "@/components/admin/stats/country"
import Devices from "@/components/admin/stats/devices"
import Referer from "@/components/admin/stats/referer"
import { AppHeader } from "@/components/shared/page-header"
import { TimeframeSelect } from "@/components/shared/timeframe-select"

const getLinkDetails = cache(async (slug: Link["slug"], key: Link["key"]) => {
  return await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      clicks: true,
    },
  })
})

const getProject = cache(async (userId: string, slug: Project["slug"]) => {
  const project = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      userId: true,
    },
  })

  if (project?.userId === userId) {
    return project
  }

  return null
})

export const metadata = {
  title: "Link Details",
}

async function LinkPage({ params }) {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const { slug, key } = params

  if (!slug || !key) {
    notFound()
  }

  const project = await getProject(userId, slug)

  if (!project) {
    notFound()
  }

  const link = await getLinkDetails(slug, key)

  return (
    <AppShell>
      <AppHeader
        heading={link?.title || "Untitled Link"}
        text="Link statistics"
      >
        <TimeframeSelect />
      </AppHeader>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent className="space-y-4" value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Activity />
            <Country />
            <Devices />
            <Referer />
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}

export default LinkPage
