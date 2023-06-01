import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Page not found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This page cound not be found. Log in to claim in!
      </EmptyPlaceholder.Description>
      <div className="flex space-x-2">
        <Link href="/login" className={buttonVariants({ variant: "default" })}>
          Log in
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Home
        </Link>
      </div>
    </EmptyPlaceholder>
  )
}
