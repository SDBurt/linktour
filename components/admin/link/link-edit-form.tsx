import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { linkPatchSchema } from "@/lib/validations/link"
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
  title: string
  url: string
  linkKey: string
  slug: string
  submitHandler: (body: any) => Promise<Response>
}

type FormData = z.infer<typeof linkPatchSchema>

export default function LinkEditForm({
  title,
  url,
  linkKey,
  slug,
  submitHandler,
  className,
  ...props
}: linkFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkPatchSchema),
    defaultValues: {
      title: title, // Name of the link
      url: url, // Destination of the link
      key: linkKey, // key of the link, uses the domain
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const body = JSON.stringify({
      title: data?.title,
      url: data.url,
      key: data.key,
    })

    // const response = await fetch(`/api/projects/${slug}/links/${linkKey}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body,
    // })

    const response = await submitHandler(body)

    setIsSaving(false)

    if (!response?.ok) {
      console.error(await response?.json())
      return toast({
        title: "Something went wrong.",
        description: "Your link was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your link has been updated.",
    })
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" size={32} {...register("title")} />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}

            <Label htmlFor="key">Key</Label>
            <div className="flex w-full items-center">
              <Label
                htmlFor="key"
                className="  placeholder:text-muted-foreground0 h-10 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                {slug || "undefined"}/
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

            <Label htmlFor="url">URL</Label>
            <Input id="url" size={32} {...register("url")} />
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
