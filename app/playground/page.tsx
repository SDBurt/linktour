"use client"

import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { IconPopover } from "@/components/shared/popover/icon-popover"

export default async function IndexPage() {
  const [selectedIcon, setSelectedIcon] = React.useState<string | undefined>()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A link-in-bio built using Next.js 13 server components.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section id="items" className="container">
        <div className="grid grid-cols-4 gap-4 rounded border p-4">
          <div className="rounded border p-2">
            <IconPopover onClick={() => console.log("clicked")} />
          </div>
          <div className="rounded border p-2">Grid Item</div>

          <div className="rounded border p-2">Grid Item</div>

          <div className="rounded border p-2">Grid Item</div>

          <div className="rounded border p-2">Grid Item</div>
        </div>
      </section>
    </>
  )
}
