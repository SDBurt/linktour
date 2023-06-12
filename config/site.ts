import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "LinkTour",
  description:
    "An open source link in bio application built using Next.js 13.x",
  url: "https://www.linktour.ca",
  ogImage: "https://linktour.ca/og.jpg",
  links: {
    twitter: "https://twitter.com/seanburt8",
    github: "https://github.com/sdburt/linktour",
  },
}

export const reservedkeys = ["", "admin", "login", "register", "playground"]
