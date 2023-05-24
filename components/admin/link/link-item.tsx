import NextLink from "next/link"
import { Link } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkOperations } from "@/components/admin/link/link-operations"
import { Icons } from "@/components/shared/icons"

interface LinkItemProps {
  link: Pick<
    Link,
    "id" | "title" | "slug" | "key" | "createdAt" | "url" | "clicks"
  >
}

export function LinkItem({ link }: LinkItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{link.title}</CardTitle>
        <CardDescription>
          {formatDate(link.createdAt?.toDateString())}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <NextLink href={`/admin/${link.slug}/${link.key}`}>
                <TooltipTrigger
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })
                  )}
                >
                  <Icons.bars />
                  <p>{link.clicks}</p>
                </TooltipTrigger>
              </NextLink>
              <TooltipContent>
                <p>View stats</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <NextLink href={link.url} target="_blank">
                <TooltipTrigger
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })
                  )}
                >
                  <Icons.external />
                </TooltipTrigger>
              </NextLink>
              <TooltipContent>
                <p>{link.url}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <LinkOperations
            link={{
              id: link.id,
              slug: link.slug,
              key: link.key,
              url: link.url,
              clicks: link.clicks,
              title: link.title,
            }}
          />
        </div>
      </CardContent>
    </Card>
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
