import { notFound } from "next/navigation";



import { getProject } from "@/lib/api/projects";
import THEME from "@/lib/constants/theme";
import { ThemeProps } from "@/lib/types"
import Preview from "@/app/(admin)/admin/[slug]/preview"





// Dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const project = await getProject(params.slug)
  return { title: project?.name, description: project?.description }
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

  const { name, links, user, image, description, theme } = project

  if (!project) {
    notFound()
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <div className="flex h-full w-full justify-center">
        <Preview
          theme={(theme as ThemeProps) || THEME}
          project={{ name: name, image: image, description: description }}
          links={links}
          user={user}
        />
      </div>
    </div>
  )
}