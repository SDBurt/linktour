"use client"

import * as React from "react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Link } from "@prisma/client"

import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LinkEditForm from "@/components/admin/link/link-edit-form"
import { Icons } from "@/components/shared/icons"

async function deleteLink(slug: string, key: string) {
  const response = await fetch(`/api/projects/${slug}/links/${key}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your link was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

interface LinkOperationsProps {
  link: Pick<Link, "id" | "title" | "slug" | "key" | "url" | "clicks">
}

export function LinkOperations({ link }: LinkOperationsProps) {
  const router = useRouter()

  const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const onSubmit = useCallback(
    async (body) => {
      const response = await fetch(
        `/api/projects/${link.slug}/links/${link.key}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      )

      setShowEditDialog(false)

      return response
    },
    [link]
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            className="flex cursor-pointer items-center focus:bg-red-50"
            onSelect={() => setShowEditDialog(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this link?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()

                setIsDeleteLoading(true)
                const deleted = await deleteLink(link.slug, link.key)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="p-0">
          <LinkEditForm
            title={link.title}
            url={link.url}
            linkKey={link.key}
            slug={link.slug}
            submitHandler={onSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
