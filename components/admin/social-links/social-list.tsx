import { SocialLink } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import SocialItem from "@/components/admin/social-links/social-item"
import { ReorderGroup, ReorderItem } from "@/components/shared/dnd/reorder"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { AddSocialButton } from "./add-social-button"
import { SocialLinkCreateCard } from "./social-create-card"

interface SocialListProps {
  socials: Pick<SocialLink, "id" | "order" | "url" | "active" | "type">[]
  setSocials: (social) => void
  slug: string
}

export function SocialList({ socials, setSocials, slug }: SocialListProps) {
  const reorderHandler = (newOrder) => {
    const body = newOrder.map((item, index) => ({ id: item.id, order: index }))

    fetch(`/api/projects/${slug}/socials/reorder`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })

    setSocials(newOrder)
  }

  return (
    <div className="flex flex-col space-y-4">
      {socials?.length ? (
        <>
          <SocialLinkCreateCard slug={slug} />
          <ReorderGroup items={socials} setItems={reorderHandler}>
            {socials.map((social) => (
              <ReorderItem item={social} idField="type" key={social.type}>
                <SocialItem
                  social={{
                    id: social.id,
                    url: social.url,
                    slug: slug,
                    type: social.type,
                    order: social.order,
                    active: social.active,
                  }}
                />
              </ReorderItem>
            ))}
          </ReorderGroup>
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No socials created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any socials yet. Start creating content.
          </EmptyPlaceholder.Description>
          <AddSocialButton
            className={cn(buttonVariants({ variant: "outline" }))}
            projectSlug={slug}
          />
        </EmptyPlaceholder>
      )}
    </div>
  )
}

SocialList.Skeleton = function SocialListSkeleton() {
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
