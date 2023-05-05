"use client";

import * as React from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "./icons";
import Link from "next/link";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  const path = usePathname();

  const crumbs = path?.split("/").slice(1);

  const renderCrumbs = crumbs?.map((key, index) => {
    const style =
      index === crumbs.length - 1 ? "text-foreground font-medium" : "";
    return (
      <>
        {index !== 0 ? (
          <Icons.chevronRight key={`${key}-chev-${index}`} />
        ) : null}
        <Link
          key={`${key}-link-${index}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            style
          )}
          href={"/" + crumbs.slice(0, index + 1).join("/")}
        >
          {key}
        </Link>
      </>
    );
  });

  return (
    <div
      className={cn(
        "flex flex-row items-center space-x-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {renderCrumbs}
    </div>
  );
}
