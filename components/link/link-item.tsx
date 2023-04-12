import NextLink from "next/link"
import { Link } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { LinkOperations } from "@/components/link/link-operations"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "../icons"

interface LinkItemProps {
  link: Pick<Link, "id" | "title" | "domain" | "key" | "createdAt" | "url" | "clicks">
}

export function LinkItem({ link }: LinkItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex justify-between w-full px-2 items-center">
          <NextLink
            href={link.key}
            className="font-semibold hover:underline"
          >
            {link.title}
          </NextLink>
          <div className="flex flex-row space-x-1">
            <Icons.chainlink />
            <p>{link.domain || "unknown"}/{link.key || "unknown"}</p>
          </div>
          <div className="flex flex-row space-x-1">
            <Icons.chainlink />
            <p>{link.url || "unknown"}</p>
          </div>
          <div className="flex flex-row space-x-1">
            <Icons.bars />
            <p>{link.clicks}</p>
          </div>
          <p className="text-sm text-slate-600">
            {formatDate(link.createdAt?.toDateString())}
          </p>
      
        
      </div>
      <LinkOperations link={{id: link.id, domain: link.domain, key: link.key, url: link.url, clicks: link.clicks, title: link.title}} />
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  )
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
  )
}