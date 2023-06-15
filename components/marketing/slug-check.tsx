"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { checkSlug, cn } from "@/lib/utils"
import { projectSlugSchema } from "@/lib/validations/project"
import { Form, FormField } from "@/components/ui/form"
import SlugPicker from "@/components/shared/slug-picker"

type FormData = z.infer<typeof projectSlugSchema>

interface SlugPickerFormProps extends React.HTMLAttributes<HTMLFormElement> {}

export function SlugPickerForm({ className, ...props }: SlugPickerFormProps) {
  const defaultValues = {
    slug: "",
  }

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(projectSlugSchema),
    defaultValues,
  })

  async function onSubmit(data: FormData) {
    if (data.slug) {
      await checkSlug(data.slug)
    }
  }

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="slug"
          render={() => <SlugPicker form={form} register={form.register} />}
        />
      </form>
    </Form>
  )
}
