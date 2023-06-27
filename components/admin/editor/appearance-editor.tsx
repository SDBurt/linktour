"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import BackgroundCard from "@/components/admin/appearance/backgroundCard"
import ButtonsCard from "@/components/admin/appearance/buttonsCard"
import FontsCard from "@/components/admin/appearance/fontsCard"
import ProjectPreview from "@/components/shared/bio/project-preview"
import { BioSocialItem } from "@/components/shared/bio/socials/social-item"

interface AppearanceEditorProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: BioSocialItem[]
  project: Pick<Project, "name" | "image" | "description" | "slug">
  theme: ThemeProps
  links: Pick<
    Link,
    | "id"
    | "title"
    | "slug"
    | "key"
    | "order"
    | "createdAt"
    | "url"
    | "clicks"
    | "thumbnail"
    | "thumbnailType"
  >[]
}

export function AppearanceEditor({
  user,
  socials,
  project,
  theme,
  links,
}: AppearanceEditorProps) {
  const router = useRouter()

  const [themePreview, setThemePreview] = useState<ThemeProps>(theme)

  const onSubmitClicked = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/projects/${project.slug}/theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themePreview),
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your theme was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your theme has been updated.",
    })

    router.refresh()
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 flex justify-center p-4 lg:col-span-1">
        <ProjectPreview
          theme={themePreview}
          socials={socials}
          project={project}
          links={links}
          user={{ username: user.username, imageUrl: user.imageUrl }}
        />
      </div>
      <div className="col-span-3 flex flex-col space-y-2 lg:-order-1 lg:col-span-2">
        <BackgroundCard theme={themePreview} setTheme={setThemePreview} />
        <ButtonsCard theme={themePreview} setTheme={setThemePreview} />
        <FontsCard theme={themePreview} setTheme={setThemePreview} />
        <Button onClick={onSubmitClicked}>Update</Button>
      </div>
    </div>
  )
}
