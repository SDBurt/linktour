import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { projectCreateSchema } from "@/lib/validations/project"
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

interface CardFormProps extends React.HTMLAttributes<HTMLFormElement> {
  submitHandler: () => void
  isSaving: boolean
  defaultValues: object
  resolver: Resolver<object, any> | undefined
}

export function FormCard({
  submitHandler,
  isSaving,
  defaultValues,
  resolver,
  className,
  ...props
}: CardFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver, defaultValues })

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(submitHandler)}
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
                className="  placeholder:text-muted-foreground0 h-10 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                LinkShortener/
              </Label>
              <Input
                id="slug"
                className="w-full rounded-l-none rounded-r-md border"
                size={32}
                placeholder="Your project slug"
                {...register("slug")}
              />
            </div>
            {errors?.slug && (
              <p className="px-1 text-xs text-red-600">{errors.slug.message}</p>
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
