"use client"

import { useState } from "react"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import THEME from "@/lib/constants/theme"
import { ThemeProps } from "@/lib/types"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "@/components/admin/project/project-form"

import { BackgroundCard } from "./backgroundCard"
import { ButtonsCard } from "./buttonsCard"
import { FontsCard } from "./fontsCard"
import Preview from "./preview"

interface AppearanceProps {
  project: Pick<Project, "id" | "name" | "description" | "image" | "slug">
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
  theme: ThemeProps
  user: Pick<User, "imageUrl" | "username">
}

export function Appearance({ project, links, theme, user }: AppearanceProps) {
  let method = "PATCH"
  if (!theme) {
    theme = THEME
    method = "POST"
  }

  const [themePreview, setThemePreview] = useState<ThemeProps>(theme ?? THEME)

  const onSubmitClicked = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/projects/${project.slug}/theme`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themePreview),
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your theme was not created/updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description:
        method === "PATCH"
          ? "Your theme has been updated."
          : "Your theme has been created.",
    })
  }

  return (
    <div className="grid grid-cols-3 py-2 ">
      <div className="col-span-2 flex max-h-[700px] flex-col space-y-2 overflow-y-scroll px-2">
        <BackgroundCard theme={themePreview} setTheme={setThemePreview} />
        <ButtonsCard theme={themePreview} setTheme={setThemePreview} />
        <FontsCard theme={themePreview} setTheme={setThemePreview} />
        <Button onClick={onSubmitClicked}>
          {method === "PATCH" ? "Update" : "Create"}
        </Button>
      </div>
      <div className="col-span-1 flex w-full items-center justify-center overflow-hidden">
        <div className="h-[700px] w-[341px] rounded-lg border bg-black p-2">
          <Preview
            theme={themePreview}
            project={project}
            links={links}
            user={{ username: user.username, imageUrl: user.imageUrl }}
          />
        </div>
      </div>
    </div>
  )
}
