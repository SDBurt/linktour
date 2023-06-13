import { useState } from "react"
import {
  ErrorOption,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button"
import { Icons } from "./icons"

interface SlugPickerProps {
  form: any
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
}

export async function checkSlug(slug: string) {
  if (slug.trim() === "") {
    return true
  }

  const res = await fetch(`/api/projects/${slug}/exists`)
  const exists = await res.json()

  return exists
}

export default function SlugPicker({ form, register }: SlugPickerProps) {
  const [isCheckingSlug, setIsCheckingSlug] = useState<boolean>(false)
  const [slugValid, setSlugValid] = useState<boolean | null>(null)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  async function checkSlugButtonHandler(e) {
    e.preventDefault()

    setIsCheckingSlug(true)
    setIsLocked(true)

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

    setTimeout(() => {
      setIsLocked(false)
    }, 500)
  }

  return (
    <FormItem>
      <FormControl>
        <div className="flex w-full items-center bg-background">
          <Label className="placeholder:text-muted-foreground0 h-10 items-center rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
            linktour.ca/
          </Label>
          <Input
            className="rounded-none"
            placeholder="Your project's public name"
            {...register("slug")}
          />
          <Button
            type="button"
            className={cn(
              "rounded-l-none",
              slugValid ? "bg-green-700 hover:bg-green-800" : ""
            )}
            onClick={(e) => checkSlugButtonHandler(e)}
            disabled={isCheckingSlug || isLocked}
          >
            {}
            {isCheckingSlug && (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Checking
              </>
            )}
            {!isCheckingSlug && !isLocked && slugValid && (
              <>
                <Icons.check className="mr-2 h-4 w-4" />
                Available
              </>
            )}
            {!isCheckingSlug && isLocked && (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            )}
            {!slugValid && !isCheckingSlug && !isLocked && <>Check</>}
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
