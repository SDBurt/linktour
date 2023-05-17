import { UserAvatar } from "@/components/user/user-avatar";
import { ThemeButtonStyleTypeProps, ThemeProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link, Project, Theme, User } from "@prisma/client";
import NextLink from "next/link";
import React from "react";

interface PreviewProps {
  user: Pick<User, "image" | "name">;
  project: Pick<Project, "name" | "image" | "description">;
  theme: ThemeProps;
  links: Pick<Link, "title" | "url">[];
}

const customStyles = {
  SOFTSHADOW: "drop-shadow",
  SOFTSHADOW_ROUNDED: "drop-shadow rounded-lg",
  SOFTSHADOW_CIRCULAR: "drop-shadow rounded-full",

  HARDSHADOW: "hard-shadow",
  HARDSHADOW_ROUNDED: "hard-shadow rounded-lg",
  HARDSHADOW_CIRCULAR: "hard-shadow rounded-full",
};

const Preview = ({ user, project, theme, links }: PreviewProps) => {
  const buttonStyle = cn(
    "p-4 flex justify-center items-center w-full h-full font-medium",
    `${customStyles[theme?.buttonType]}`
  );

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center py-8"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="max-w-2xl w-full p-4 space-y-8 mb-auto">
        <div className="w-full flex justify-center items-center">
          <UserAvatar
            className="h-24 w-24"
            user={{ name: user.name, image: user.image }}
          />
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
          {links.map((link, index) => (
            <NextLink
              key={`${link.title.trim()}-${index}`}
              href={link.url}
              className={buttonStyle}
              style={{
                backgroundColor: theme.buttonBackgroundColor,
                color: theme.buttonTextColor,
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
