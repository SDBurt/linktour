import NextLink from "next/link";
import { Link } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";

interface BioLinkItemProps {
  link: Pick<Link, "title" | "url">;
}

export function BioLinkItem({ link }: BioLinkItemProps) {
  return (
    <NextLink href={link.url} className="font-semibold hover:underline">
      <div className="flex items-center justify-between p-4">
        <div className="flex justify-center w-full px-2 items-center">
          {link.title}
        </div>
      </div>
    </NextLink>
  );
}

BioLinkItem.Skeleton = function LinkItemSkeleton() {
  return (
    <div className="font-semibold hover:underline max-w-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex w-full px-2">
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
};
