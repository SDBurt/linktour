"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { projectSchema } from "@/lib/validations/project"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/shared/icons"

interface ProjectFormProps extends React.HTMLAttributes<HTMLFormElement> {
  project?: Pick<Project, "id" | "name" | "slug" | "description">
}

type FormData = z.infer<typeof projectSchema>

export function ProjectCreateForm({
  project,
  className,
  ...props
}: ProjectFormProps) {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
    formState,
    getFieldState,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      slug: project?.slug || "",
      description: project?.description || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isCheckingSlug, setIsCheckingSlug] = React.useState<boolean>(false)
  const [slugValid, setSlugValid] = React.useState<boolean | null>(null)

  async function checkSlug(slug: string) {
    const res = await fetch(`/api/projects/${slug}/exists`)
    const exists = await res.json()

    return exists === 1
  }

  async function checkSlugButtonHandler(e) {
    e.preventDefault()

    setIsCheckingSlug(true)
    const { error, isDirty, invalid } = getFieldState("slug", formState)

    if (error || isDirty || invalid) {
      return
    }
    const slug = getValues("slug")

    const exists = await checkSlug(slug)

    if (exists) {
      setSlugValid(true)
    } else {
      setSlugValid(false)
    }

    setIsCheckingSlug(false)
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    if (checkSlug === null) {
      const exists = await checkSlug(data.slug)
      if (exists) {
        setIsSaving(false)
        return toast({
          title: "Something went wrong.",
          description: "Your Project slug is already taken. Please try again.",
          variant: "destructive",
        })
      }
    }

    const response = await fetch(`/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        slug: data.slug,
        description: data.description,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.error(await response.json())
      return toast({
        title: "Something went wrong.",
        description: "Your project was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your project has been created.",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              placeholder="ex: dub"
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
            <Label htmlFor="slug">Slug</Label>
            <div className="flex w-full items-center">
              <Label
                htmlFor="slug"
                className="placeholder:text-muted-foreground0 h-10 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                localhost:3000/
              </Label>
              <Input
                id="slug"
                className="w-full rounded-none border"
                size={32}
                placeholder="Your project slug"
                {...register("slug")}
              />
              <Button
                type="button"
                className="rounded-l-none"
                onClick={(e) => checkSlugButtonHandler(e)}
                disabled={isCheckingSlug}
              >
                {isCheckingSlug && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Check
              </Button>
            </div>
            {!errors?.slug && slugValid !== null && slugValid && (
              <p className="px-1 text-xs text-green-600">Slug Free</p>
            )}
            {!errors?.slug && slugValid !== null && !slugValid && (
              <p className="px-1 text-xs text-red-600">Slug Taken</p>
            )}
            {errors?.slug && (
              <p className="px-1 text-xs text-red-600">{errors.slug.message}</p>
            )}
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              className="w-full"
              size={32}
              placeholder="ex: dub"
              {...register("description")}
            />
            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
