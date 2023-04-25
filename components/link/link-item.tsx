import NextLink from "next/link";
import { Link } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { LinkOperations } from "@/components/link/link-operations";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "../icons";

interface LinkItemProps {
  link: Pick<Link, "id" | "title" | "key" | "createdAt" | "url" | "clicks">;
  slug: string;
}

export function LinkItem({ slug, link }: LinkItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col space-y-4 justify-between w-full px-2">
        <NextLink
          href={`/${slug}/${link.key}`}
          className="font-semibold hover:underline"
        >
          {link.title}
        </NextLink>
        <div className="flex flex-row space-x-1">
          <Icons.chainlink />
          <p>{link.url}</p>
        </div>
        <div className="flex flex-row space-x-3">
          <div>
            {link.domain && link.key ? (
              <NextLink
                className="flex flex-row space-x-1"
                href={`http://${link.domain}/${link.key}`}
              >
                <Icons.share />
                {link.domain}/{link.key}
              </NextLink>
            ) : (
              <p className="flex flex-row space-x-1">
                <Icons.share /> {link.domain}/{link.key}
              </p>
            )}
          </div>

          <div className="flex flex-row space-x-1">
            <Icons.bars />
            <p>{link.clicks}</p>
          </div>
          <p className="text-slate-600">
            {formatDate(link.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <LinkOperations
        link={{
          id: link.id,
          domain: link.domain,
          key: link.key,
          url: link.url,
          clicks: link.clicks,
          title: link.title,
        }}
      />
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
}

LinkItem.Skeleton = function LinkItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex w-full px-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-5 w-1/5" />
      </div>
    </div>
  );
};
