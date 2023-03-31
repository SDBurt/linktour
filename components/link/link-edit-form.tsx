"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { linkPatchSchema } from "@/lib/validations/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface linkFormProps extends React.HTMLAttributes<HTMLFormElement> {
  link: Pick<Link, "id" | "title" | "key" | "url" | "clicks">
}

type FormData = z.infer<typeof linkPatchSchema>

export function LinkEditForm({ link, className, ...props }: linkFormProps) {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkPatchSchema),
    defaultValues: {
      title: link?.title || "", // Name of the link
      url: link.url || "", // Destination of the link
      key: link.key || "", // key of the link, uses the domain
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/links/${link.id}`, {
      method: "PATCH",
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
        description: "Your link was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your link has been updated.",
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
        <Card.Header>
          <Card.Title>Edit Short Link</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-2">
            
            <Label htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              className="w-[400px]"
              size={32}
              {...register("title")}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
            )}

            <Label htmlFor="key">
              Key
            </Label>
            <Input
              id="key"
              className="w-[400px]"
              size={32}
              {...register("url")}
            />
            {errors?.key && (
              <p className="px-1 text-xs text-red-600">{errors.key.message}</p>
            )}

            <Label htmlFor="url">
              URL
            </Label>
            <Input
              id="url"
              className="w-[400px]"
              size={32}
              {...register("url")}
            />
            {errors?.url && (
              <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
            )}

          </div>
        </Card.Content>
        <Card.Footer>
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
        </Card.Footer>
      </Card>
    </form>
  )
}