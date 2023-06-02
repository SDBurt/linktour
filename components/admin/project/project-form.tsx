"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { freePlanValues } from "@/config/subscriptions"
import { cn } from "@/lib/utils"
import {
  projectCreateSchema,
  projectPatchSchema,
  projectSchema,
} from "@/lib/validations/project"
import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/shared/icons"

interface ProjectFormProps extends React.HTMLAttributes<HTMLFormElement> {
  project?: Pick<Project, "id" | "name" | "slug" | "description">
}

type FormData = z.infer<typeof projectSchema>

export function ProjectForm({
  project,
  className,
  ...props
}: ProjectFormProps) {
  const router = useRouter()
  const defaultValues = {
    name: project?.name || "",
    description: project?.description || "",
  }

  if (project) {
    defaultValues["slug"] = project?.slug || undefined
  }

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(project ? projectPatchSchema : projectCreateSchema),
    defaultValues,
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isCheckingSlug, setIsCheckingSlug] = React.useState<boolean>(false)
  const [slugValid, setSlugValid] = React.useState<boolean | null>(null)

  const endpoint = React.useMemo(() => {
    if (project) {
      return {
        method: "PATCH",
        url: `/api/projects/${encodeURIComponent(project.slug)}`,
      }
    } else {
      return {
        method: "POST",
        url: `/api/projects`,
      }
    }
  }, [project])

  async function checkSlug(slug: string) {
    if (slug.trim() === "") {
      return true
    }

    const res = await fetch(`/api/projects/${slug}/exists`)
    const exists = await res.json()

    return exists
  }

  async function checkSlugButtonHandler(e) {
    e.preventDefault()

    setIsCheckingSlug(true)

    form.clearErrors("slug")
    const slug = form.getValues("slug")

    if (!slug) {
      setSlugValid(false)
      form.setError(
        "slug",
        {
          type: "focus",
          message: "This slug invalid",
        },
        { shouldFocus: true }
      )
      setIsCheckingSlug(false)
      return
    }

    const exists = await checkSlug(slug)

    if (exists === 0) {
      setSlugValid(true)
      form.clearErrors(["slug"])
    } else if (exists === 1) {
      setSlugValid(false)
      form.setError(
        "slug",
        {
          type: "focus",
          message: "This slug is already taken",
        },
        { shouldFocus: true }
      )
    } else {
      setSlugValid(false)
      form.setError(
        "slug",
        {
          type: "focus",
          message: "This slug invalid",
        },
        { shouldFocus: true }
      )
    }

    setIsCheckingSlug(false)
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    if (!project && data.slug) {
      const exists = await checkSlug(data.slug)
      if (exists === 1) {
        setIsSaving(false)
        return toast({
          title: "Something went wrong.",
          description: "Your Project slug is already taken. Please try again.",
          variant: "destructive",
        })
      } else if (exists === -1) {
        setIsSaving(false)
        return toast({
          title: "Something went wrong.",
          description: "Your Project is not valid. Please try again.",
          variant: "destructive",
        })
      }
    }

    const response = await fetch(endpoint.url, {
      method: endpoint.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: `Limit of ${freePlanValues.project.count} posts reached.`,
          description: "Please upgrade your plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description:
          "Your project was not " +
          (project ? "edited" : "created") +
          ". Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your project has been " + (project ? "edited" : "created"),
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>{project ? "Edit Project" : "Create Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your project's public name"
                      {...form.register("name")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!project && (
              <FormField
                control={form.control}
                name="slug"
                render={() => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center">
                        <Label className="placeholder:text-muted-foreground0 h-10 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                          localhost:3000/
                        </Label>
                        <Input
                          className="rounded-none"
                          placeholder="Your project's public name"
                          {...form.register("slug")}
                        />
                        <Button
                          type="button"
                          className={cn(
                            "rounded-l-none",
                            slugValid ? "bg-green-700 hover:bg-green-800" : ""
                          )}
                          onClick={(e) => checkSlugButtonHandler(e)}
                          disabled={isCheckingSlug}
                        >
                          {isCheckingSlug && (
                            <>
                              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              Checking
                            </>
                          )}
                          {!isCheckingSlug && slugValid && (
                            <>
                              <Icons.check className="mr-2 h-4 w-4" />
                              Available
                            </>
                          )}
                          {!slugValid && !isCheckingSlug && <>Check</>}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your project's bio description"
                      {...form.register("description")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <span>{project ? "Update" : "Create"}</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
