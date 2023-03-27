"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShortLink, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { shortLinkPatchSchema } from "@/lib/validations/short-link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface shortLinkFormProps extends React.HTMLAttributes<HTMLFormElement> {
  shortLink: Pick<ShortLink, "id" | "title" | "shortUrl" | "destinationUrl" | "clicks">
}

type FormData = z.infer<typeof shortLinkPatchSchema>

export function ShortLinkForm({ shortLink, className, ...props }: shortLinkFormProps) {
  const router = useRouter()
  console.log(shortLink)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(shortLinkPatchSchema),
    defaultValues: {
      title: shortLink?.title || "",
      shortUrl: shortLink.shortUrl || "",
      destinationUrl: shortLink.destinationUrl || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/links/${shortLink.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data?.title,
        shortUrl: data.shortUrl,
        destinationUrl: data.destinationUrl,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.error(await response.json())
      return toast({
        title: "Something went wrong.",
        description: "Your short link was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your short link has been updated.",
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

            <Label htmlFor="shorturl">
              Short URL
            </Label>
            <Input
              id="shorturl"
              className="w-[400px]"
              size={32}
              {...register("shortUrl")}
            />
            {errors?.shortUrl && (
              <p className="px-1 text-xs text-red-600">{errors.shortUrl.message}</p>
            )}

            <Label htmlFor="destinationurl">
              Destination URL
            </Label>
            <Input
              id="destinationurl"
              className="w-[400px]"
              size={32}
              {...register("destinationUrl")}
            />
            {errors?.destinationUrl && (
              <p className="px-1 text-xs text-red-600">{errors.destinationUrl.message}</p>
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