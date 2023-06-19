import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { Link } from "@prisma/client"

import { cn, nanoid } from "@/lib/utils"

import { ReorderGroup, ReorderItem } from "../shared/dnd/reorder"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface ProjectFormProps extends React.HTMLAttributes<HTMLFormElement> {
  links: Pick<Link, "slug" | "title" | "url">[]
  setLinks: Dispatch<SetStateAction<Pick<Link, "slug" | "title" | "url">[]>>
}

export default function LinkForm({
  links,
  setLinks,
  className,
  ...props
}: ProjectFormProps) {
  const removeLinkHandler = useCallback(
    (index: number) => {
      setLinks((prev) => {
        const newLinks = [...prev]
        newLinks.splice(index, 1)
        return newLinks
      })
    },
    [setLinks]
  )

  return (
    <>
      <form {...props} className={cn(className)}>
        <div className="grid w-full gap-4">
          <ReorderGroup items={links} setItems={setLinks}>
            {links.map((link, index: number) => (
              <div
                key={link.slug}
                className="group flex w-full items-center space-x-2"
              >
                <ReorderItem item={link} idField="slug">
                  <Card className="relative grid w-full gap-2 rounded-lg border p-4">
                    <div
                      className="absolute -right-3 -top-3 hidden h-8 w-8 items-center justify-center rounded-full border bg-background p-1 hover:cursor-pointer group-hover:flex"
                      onClick={(e) => removeLinkHandler(index)}
                    >
                      <Icons.close className="text-primary" />
                    </div>
                    <Label className="pt-2">Title</Label>
                    <Input
                      className="col-span-3 pt-2"
                      placeholder="Your links title"
                      value={link.title}
                      onChange={(e) =>
                        setLinks((prev) => {
                          const tmp = [...prev]
                          tmp[index].title = e.target.value
                          return tmp
                        })
                      }
                    />
                    <Label className="pt-2">URL</Label>
                    <Input
                      className="col-span-3 pt-2"
                      placeholder="Your links destination URL"
                      value={link.url}
                      onChange={(e) =>
                        setLinks((prev) => {
                          const tmp = [...prev]
                          tmp[index].url = e.target.value
                          return tmp
                        })
                      }
                    />
                  </Card>
                </ReorderItem>
              </div>
            ))}
          </ReorderGroup>
        </div>
      </form>
      <Button
        className="mt-4 w-full"
        onClick={() =>
          setLinks((prev) => [...prev, { title: "", url: "", slug: nanoid() }])
        }
      >
        Add Link
      </Button>
    </>
  )
}
