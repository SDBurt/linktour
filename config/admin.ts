import { AdminConfig } from "types"

export const adminConfig: AdminConfig = {
  mainNav: [
    {
      title: "Projects",
      href: "/admin",
    },
  ],
  sidebarNav: [
    {
      title: "Links",
      href: "",
      icon: "post",
    },
    {
      title: "Profile",
      href: "profile",
      icon: "post",
    },
    {
      title: "Socials",
      href: "socials",
      icon: "post",
    },
    {
      title: "Appearance",
      href: "appearance",
      icon: "post",
    },
    {
      title: "Analytics",
      href: "analytics",
      icon: "post",
      disabled: true,
    },
    {
      title: "Settings",
      href: "settings",
      icon: "settings",
      disabled: true,
    },
  ],
}
