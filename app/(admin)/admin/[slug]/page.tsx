import { cache } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { Project } from "@prisma/client"

import { getProject } from "@/lib/api/projects"
import { ThemeProps } from "@/lib/types"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppearanceEditor } from "@/components/admin/editor/appearance-editor"
import LinkEditor from "@/components/admin/editor/link-editor"
import ProfileEditor from "@/components/admin/editor/profile-editor"
import { AppShell } from "@/components/admin/layouts/shell"
import { AppHeader } from "@/components/shared/page-header"

const getProjectForUser = cache(
  async (userId: string, slug: Project["slug"]) => {
    const project = await getProject(slug)

    if (!project || project.userId !== userId) {
      return null
    }
    return project
  }
)

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

  const project = await getProjectForUser(user.id, slug)

  if (!project) {
    notFound()
  }

  const links = project?.links
  const theme = project?.theme as ThemeProps

  return (
    <AppShell>
      <AppHeader
        heading="Project"
        text={`Manage links and appearance for ${
          project?.name || "Untitled Project"
        }`}
      >
        <Link
          href={`/${project.slug}`}
          className={buttonVariants()}
          target="_blank"
        >
          View Project
        </Link>
      </AppHeader>
      <Tabs defaultValue="links">
        <TabsList>
          <TabsTrigger id="links" value="links">
            Links
          </TabsTrigger>
          <TabsTrigger id="profile" value="profile">
            Profile
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
          <LinkEditor
            project={project}
            links={links}
            user={{
              username: user?.username || "",
              imageUrl: user?.profileImageUrl || "",
            }}
            theme={theme}
          />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileEditor
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
          <AppearanceEditor
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
