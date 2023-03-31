"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { LinkCreateForm } from "./link-create-form"

interface LinkCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function LinkCreateButton({
  className,
  ...props
}: LinkCreateButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showCreateDialog, setShowCreateDialog] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Link",
        shortUrl: "",
        destinationUrl: ""
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 links reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your Link was not created. Please try again.",
        variant: "destructive",
      })
    }

    const link = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    // router.push(`/editor/${link.id}`)
  }

  return (
    <>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger className={cn(
          buttonVariants(),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 h-4 w-4" />
        )}
          {`New Link`}
        </DialogTrigger>
        <DialogContent className="p-0">
          <LinkCreateForm />
        </DialogContent>
      </Dialog>
    </>
  )
}