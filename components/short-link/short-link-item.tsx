import Link from "next/link"
import { ShortLink } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { ShortLinkOperations } from "@/components/short-link/short-link-operations"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "../icons"

interface ShortLinkItemProps {
  shortLink: Pick<ShortLink, "id" | "title" | "published" | "createdAt" | "shortUrl" | "destinationUrl" | "clicks">
}

export function ShortLinkItem({ shortLink }: ShortLinkItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex justify-between w-full px-2 items-center">
          <Link
            href={shortLink.shortUrl}
            className="font-semibold hover:underline"
          >
            {shortLink.title}
          </Link>
          <div className="flex flex-row space-x-1">
            <Icons.chainlink />
            <p>{shortLink.shortUrl || "unknown"}</p>
          </div>
          <div className="flex flex-row space-x-1">
            <Icons.chainlink />
            <p>{shortLink.destinationUrl || "unknown"}</p>
          </div>
          <div className="flex flex-row space-x-1">
            <Icons.bars />
            <p>{shortLink.clicks}</p>
          </div>
          <p className="text-sm text-slate-600">
            {formatDate(shortLink.createdAt?.toDateString())}
          </p>
      
        
      </div>
      <ShortLinkOperations shortLink={{id: shortLink.id, shortUrl: shortLink.shortUrl, destinationUrl: shortLink.destinationUrl, clicks: shortLink.clicks, title: shortLink.title}} />
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  )
}

ShortLinkItem.Skeleton = function ShortLinkItemSkeleton() {
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