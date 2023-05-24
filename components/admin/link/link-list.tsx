import { Link } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkItem } from "@/components/admin/link/link-item"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { LinkCreateButton } from "./link-create-button"

interface LinkListProps {
  links: Pick<
    Link,
    "id" | "title" | "slug" | "key" | "createdAt" | "url" | "clicks"
  >[]
}

export function LinkList({ links }: LinkListProps) {
  return (
    <div>
      {links?.length ? (
        <div className="space-y-1">
          {links.map((link) => (
            <LinkItem key={link.id} link={link} />
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
