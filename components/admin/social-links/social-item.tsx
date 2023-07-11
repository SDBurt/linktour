import { SocialLink } from "@prisma/client"

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SocialOperations } from "@/components/admin/social-links/social-operations"
import { Icons } from "@/components/shared/icons"

interface SocialItemProps {
  social: Pick<SocialLink, "id" | "slug" | "url" | "type" | "active" | "order">
}

const SocialIcon = ({ type }: { type: string }) => {
  const Icon = Icons[type]

  return <Icon className="mr-2" size={24} />
}

export function SocialItem({ social }: SocialItemProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-row items-center">
        <div className="pr-8">
          <SocialIcon type={social.type} />
        </div>
        <div>
          <CardTitle className="capitalize">{social.type}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis">
            {social.url}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <SocialOperations
          social={{
            id: social.id,
            slug: social.slug,
            type: social.type,
          }}
        />
      </CardContent>
    </div>
  )
}

SocialItem.Skeleton = function SocialItemSkeleton() {
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

export default SocialItem
