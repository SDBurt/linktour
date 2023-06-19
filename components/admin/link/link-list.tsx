"use client"

import { useEffect, useState } from "react"
import { Link } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkItem } from "@/components/admin/link/link-item"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { LinkCreateButton } from "./link-create-button"
import { LinkCreateCard } from "./link-create-card"
import LinkGrip from "./link-grip"

interface LinkListProps {
  links: Pick<
    Link,
    | "id"
    | "title"
    | "slug"
    | "key"
    | "order"
    | "createdAt"
    | "url"
    | "clicks"
    | "thumbnail"
    | "thumbnailType"
  >[]
}

export function LinkList({ links }: LinkListProps) {
  const [sortedLinks, setSortedLinks] = useState(
    links.sort((a, b) => a.order - b.order)
  )

  return (
    <div>
      {sortedLinks?.length ? (
        <div className="flex flex-col space-y-1">
          <LinkCreateCard />
          {sortedLinks.map((link, index) => (
            <div className="flex items-center space-x-2" key={link.id}>
              {/* <LinkGrip
                links={sortedLinks}
                setLinks={setSortedLinks}
                index={index}
              /> */}
              <LinkItem link={link} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any links yet. Start creating content.
          </EmptyPlaceholder.Description>
          <LinkCreateButton
            className={cn(buttonVariants({ variant: "outline" }))}
          />
        </EmptyPlaceholder>
      )}
    </div>
  )
}

LinkList.Skeleton = function LinkListSkeleton() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>
        <Skeleton className="h-5 w-4/5" />
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        <Skeleton className="h-5 w-full" />
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}
