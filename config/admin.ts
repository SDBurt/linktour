import { AdminConfig } from "types";

export const adminConfig: AdminConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin",
    },
  ],
  sidebarNav: [
    {
      title: "Projects",
      href: "/",
      icon: "post",
    },
    {
      title: "Membership",
      href: "/membership/settings",
      icon: "settings",
      disabled: true,
    },
  ],
};
