import { notFound } from "next/navigation"
import { Project } from "@prisma/client"

import { IncrementViews, getProject } from "@/lib/api/projects"
import { getUser } from "@/lib/clerk"
import THEME from "@/lib/constants/theme"
import { ThemeProps } from "@/lib/types"
import ProjectBio from "@/components/shared/bio/project-bio"

// Dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const project = await getProject(params.slug)
  return { title: project?.name, description: project?.description }
}

async function recordNewView(slug: Project["slug"]) {
  // db total clicks
  await IncrementViews(slug)
}

export default async function BioPage({ params }) {
  const slug = params.slug

  if (!slug) {
    notFound()
  }

  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const { name, links, image, description, theme, userId } = project

  const user = await getUser(userId)

  await recordNewView(project.slug)

  return (
    <div className="flex h-full w-full justify-center">
      <ProjectBio
        theme={(theme as ThemeProps) || THEME}
        project={{ name: name, image: image, description: description }}
        links={links}
        user={{ imageUrl: user.imageUrl, username: user.username }}
      />
    </div>
  )
}
