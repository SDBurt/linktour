import { cache } from "react"
import { notFound } from "next/navigation"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { Project } from "@prisma/client"

import { db } from "@/lib/db"
import { ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppShell } from "@/components/admin/layouts/shell"
import { LinkCreateButton } from "@/components/admin/link/link-create-button"
import { LinkList } from "@/components/admin/link/link-list"
import { AppHeader } from "@/components/shared/page-header"

import { Appearance } from "./appearance"
import { Header } from "./header"

const getProject = cache(async (userId: string, slug: Project["slug"]) => {
  return await db.project.findFirst({
    where: {
      userId: userId,
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      links: true,
      description: true,
      image: true,
      theme: true,
    },
  })
})

export const metadata = {
  title: "Project Details",
}

async function ProjectPage({ params }) {
  const slug = params.slug

  if (!slug) {
    notFound()
  }

  const user = await currentUser()

  if (!user?.id) {
    return redirectToSignIn()
  }

  const project = await getProject(user.id, slug)

  if (!project) {
    notFound()
  }

  const links = project?.links
  const theme = project?.theme as ThemeProps

  return (
    <AppShell>
      {/* <Breadcrumb /> */}
      <AppHeader
        heading="Project"
        text={`Manage links and appearance for ${
          project?.name || "Untitled Project"
        }`}
      >
        <LinkCreateButton
          className={cn(buttonVariants({ variant: "default" }), "mt-1")}
        />
      </AppHeader>
      <Tabs defaultValue="links" className="w-full">
        <TabsList>
          <TabsTrigger id="links" value="links">
            Links
          </TabsTrigger>
          <TabsTrigger id="header" value="header">
            Header
          </TabsTrigger>
          <TabsTrigger id="appearance" value="appearance">
            Appearance
          </TabsTrigger>
          <TabsTrigger id="analytics" disabled value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger id="settings" disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="links">
          <LinkList links={links} />
        </TabsContent>
        <TabsContent value="header">
          <Header
            project={project}
            links={links}
            user={{
              username: user?.username || "",
              imageUrl: user?.profileImageUrl || "",
            }}
            theme={theme}
          />
        </TabsContent>
        <TabsContent value="appearance">
          <Appearance
            project={project}
            links={links}
            user={{
              username: user?.username || "",
              imageUrl: user?.profileImageUrl || "",
            }}
            theme={theme}
          />
        </TabsContent>
        <TabsContent value="analytics">
          <p>To be implemented</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  )
}

export default ProjectPage
