"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { linkPatchSchema } from "@/lib/validations/link"
import useProject from "@/hooks/use-project"
import { toast } from "@/hooks/use-toast"
import { buttonVariants } from "@/components/ui/button"
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

interface linkFormProps extends React.HTMLAttributes<HTMLFormElement> {
  link?: Pick<Link, "id" | "title" | "slug" | "key" | "url" | "clicks">
  domain?: string
}

type FormData = z.infer<typeof linkPatchSchema>

export function LinkCreateForm({ link, className, ...props }: linkFormProps) {
  const router = useRouter()

  const params = useParams()

  const { slug } = params as {
    slug: string
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkPatchSchema),
    defaultValues: {
      title: link?.title || "", // Name of the link
      url: link?.url || "", // Destination of the link
      key: link?.key || "", // key of the link, uses the domain
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/projects/${slug}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data?.title,
        url: data.url,
        key: data.key,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.error(await response.json())
      return toast({
        title: "Something went wrong.",
        description: "Your link was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your link has been created.",
    })

    const newLink = await response.json()

    router.refresh()

    router.push(`/admin/${newLink.slug}/links/${newLink.key}`)
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      {/* <Card className="rounded"> */}
      <CardHeader>
        <CardTitle>Create Link</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            className="w-full"
            size={32}
            placeholder="ex: Personal Github"
            {...register("title")}
          />
          {errors?.title && (
            <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
          )}

          <Label htmlFor="key">Key</Label>
          <div className="flex w-full items-center">
            <Label
              htmlFor="key"
              className="placeholder:text-muted-foreground0 h-9 items-center rounded-l-md border border-r-0  px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
            >
              {link?.slug || slug || "localhost:3000"}
            </Label>
            <Input
              id="key"
              className="w-full rounded-l-none rounded-r-md border"
              size={32}
              placeholder="Your project key"
              {...register("key")}
            />
          </div>
          {errors?.key && (
            <p className="px-1 text-xs text-red-600">{errors.key.message}</p>
          )}

          <Label htmlFor="url">Destination URL</Label>
          <Input
            id="url"
            className="w-full"
            size={32}
            placeholder="ex: https://github.com"
            {...register("url")}
          />
          {errors?.url && (
            <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <button
          type="submit"
          className={cn(buttonVariants(), className)}
          disabled={isSaving}
        >
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Save</span>
        </button>
      </CardFooter>
      {/* </Card> */}
    </form>
  )
}
