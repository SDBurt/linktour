"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

import BackgroundCard from "./backgroundCard"
import ButtonsCard from "./buttonsCard"
import FontsCard from "./fontsCard"

interface AppearanceProps {
  project: Pick<Project, "id" | "name" | "description" | "image" | "slug">
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
  theme: ThemeProps
  user: Pick<User, "imageUrl" | "username">
}

export function Appearance({ project, theme }: AppearanceProps) {
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
    <div className="flex flex-col space-y-2">
      <BackgroundCard theme={themePreview} setTheme={setThemePreview} />
      <ButtonsCard theme={themePreview} setTheme={setThemePreview} />
      <FontsCard theme={themePreview} setTheme={setThemePreview} />
      <Button onClick={onSubmitClicked}>Update</Button>
    </div>
  )
}
