import { Link } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyCardPlaceholder } from "@/components/shared/empty-card-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkCreateButton } from "./link-create-button";
import { LinkItem } from "@/components/admin/link/link-item";

interface LinkListProps {
  links: Pick<
    Link,
    "id" | "title" | "slug" | "key" | "createdAt" | "url" | "clicks"
  >[];
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
        <EmptyCardPlaceholder>
          <EmptyCardPlaceholder.Icon name="post" />
          <EmptyCardPlaceholder.Title>
            No links created
          </EmptyCardPlaceholder.Title>
          <EmptyCardPlaceholder.Description>
            You don&apos;t have any links yet. Start creating content.
          </EmptyCardPlaceholder.Description>
          <LinkCreateButton
            className={cn(buttonVariants({ variant: "outline" }))}
          />
        </EmptyCardPlaceholder>
      )}
    </div>
  );
}

LinkList.Skeleton = function LinkListSkeleton() {
  return (
    <EmptyCardPlaceholder>
      <EmptyCardPlaceholder.Icon name="post" />
      <EmptyCardPlaceholder.Title>
        <Skeleton className="h-5 w-4/5" />
      </EmptyCardPlaceholder.Title>
      <EmptyCardPlaceholder.Description>
        <Skeleton className="h-5 w-full" />
      </EmptyCardPlaceholder.Description>
    </EmptyCardPlaceholder>
  );
};
