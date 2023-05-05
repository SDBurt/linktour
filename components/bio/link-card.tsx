"use client";

import * as React from "react";
import { Link } from "@prisma/client";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

interface LinkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Pick<Link, "id" | "title" | "slug" | "key" | "url" | "clicks">;
}

export function LinkCard({ link, className, ...props }: LinkCardProps) {
  const buttonClickedHandler = async (link) => {
    await fetch(`/api/projects/${link.slug}/links/${link.key}/click`);
  };

  return (
    <Card
      className={cn(className)}
      {...props}
      onClick={() => buttonClickedHandler(link)}
    >
      <NextLink href={link.url}>
        <CardContent>
          <div className="w-full">
            <p>{link.id}</p>
            <p>{link.title}</p>
            <p>{link.slug}</p>
            <p>{link.key}</p>
            <p>{link.url}</p>
            <p>{link.clicks}</p>
          </div>
        </CardContent>
      </NextLink>
    </Card>
  );
}
