import { UserAvatar } from "@/components/user/user-avatar";
import { cn } from "@/lib/utils";
import { Link, Project, User } from "@prisma/client";
import NextLink from "next/link";
import React from "react";

interface PreviewProps {
  user: Pick<User, "image" | "name">;
  project: Pick<Project, "name" | "image" | "description">;
  theme: object;
  links: Pick<Link, "id" | "title" | "url">[];
}

const customStyles = {
  SOFTSHADOW: "shadow",
  SOFTSHADOW_ROUNDED: "shadow rounded-lg",
  SOFTSHADOW_CIRCULAR: "shadow rounded-full",

  HARDSHADOW: "hard-shadow",
  HARDSHADOW_ROUNDED: "hard-shadow rounded-lg",
  HARDSHADOW_CIRCULAR: "hard-shadow rounded-full",
};

const Preview = ({ user, project, theme, links }: PreviewProps) => {
  const buttonStyle = cn(
    "p-4 flex justify-center items-center w-full h-full font-medium",
    `${customStyles[theme.buttonStyle.type]}`
  );

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center py-8"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="max-w-2xl w-full px-2 py-4 space-y-8 mb-auto">
        <div className="w-full flex justify-center items-center">
          <UserAvatar className="h-24 w-24 border" user={user} />
        </div>
        <div
          className="w-full text-center"
          style={{
            color: theme.typefaceColor,
            fontFamily: theme.typefaceFamily,
          }}
        >
          <h2 className="font-bold text-xl pb-2">{project.name}</h2>
          <p className="font-normal">{project.description}</p>
        </div>

        <div className="flex flex-col space-y-4">
          {links.map((link) => (
            <NextLink
              key={link.id}
              href={link.url}
              className={buttonStyle}
              style={{
                backgroundColor: theme.buttonStyle.backgroundColor,
                color: theme.buttonStyle.textColor,
              }}
            >
              <div>
                <h1>{link.title}</h1>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
      <div
        className="w-full h-16 flex items-center justify-center"
        style={{
          color: theme.typefaceColor,
          fontFamily: theme.typefaceFamily,
        }}
      >
        <p className="font-normal">ShortLinker</p>
      </div>
    </div>
  );
};

export default Preview;
