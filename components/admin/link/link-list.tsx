import { Link } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkItem } from "@/components/admin/link/link-item"
import { ReorderGroup, ReorderItem } from "@/components/shared/dnd/reorder"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { LinkCreateButton } from "./link-create-button"
import { LinkCreateCard } from "./link-create-card"

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
  setLinks: (link) => void
  slug: string
}

export function LinkList({ links, setLinks, slug }: LinkListProps) {
  const reorderHandler = (newOrder) => {
    const body = newOrder.map((item, index) => ({ id: item.id, order: index }))

    fetch(`/api/projects/${slug}/links/reorder`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })

    setLinks(newOrder)
  }

  return (
    <div>
      {links?.length ? (
        <div className="flex flex-col space-y-1">
          <LinkCreateCard />
          <ReorderGroup items={links} setItems={reorderHandler}>
            {links.map((link) => (
              <ReorderItem item={link} idField="key" key={link.key}>
                <LinkItem link={link} />
              </ReorderItem>
            ))}
          </ReorderGroup>
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
