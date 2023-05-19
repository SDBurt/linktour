"use client";

import NextLink from "next/link";
import { ThemeProps } from "@/lib/types";
import { Link } from "@prisma/client";
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  link: Pick<Link, "title" | "url" | "slug" | "key">;
  theme: ThemeProps;
}

const makeGeneralStyle = (buttonType: string) => {
  const customStyles = {
    FILL: "",
    FILL_ROUNDED: "rounded-lg",
    FILL_CIRCULAR: "rounded-full",
    OUTLINE: "border",
    OUTLINE_ROUNDED: "border rounded-lg",
    OUTLINE_CIRCULAR: "border rounded-full",
    SOFTSHADOW: "shadow",
    SOFTSHADOW_ROUNDED: "shadow rounded-lg",
    SOFTSHADOW_CIRCULAR: "shadow rounded-full",
    HARDSHADOW: "hard-shadow",
    HARDSHADOW_ROUNDED: "hard-shadow rounded-lg",
    HARDSHADOW_CIRCULAR: "hard-shadow rounded-full",
  };

  return `${customStyles[buttonType]}`;
};

const isOutline = (buttonType: string) => {
  return (
    buttonType === "OUTLINE" ||
    buttonType === "OUTLINE_ROUNDED" ||
    buttonType === "OUTLINE_CIRCULAR"
  );
};

export default function CustomButton({ link, theme }: CustomButtonProps) {
  const buttonCls = cn(
    "p-4 flex justify-center items-center w-full h-full font-medium",
    makeGeneralStyle(theme?.buttonType)
  );

  const buttonStyle = {
    backgroundColor: isOutline(theme?.buttonType)
      ? undefined
      : theme.buttonBackgroundColor,
    borderColor: isOutline(theme?.buttonType)
      ? theme.buttonBackgroundColor
      : undefined,
    color: theme.buttonTextColor,
  };

  async function buttonClickedHandler(link) {
    await fetch(`/api/projects/${link.slug}/links/${link.key}/click`);
  }

  return (
    <div onClick={(e) => buttonClickedHandler(link)}>
      <NextLink
        href={link.url}
        className={buttonCls}
        style={buttonStyle}
        target="_blank"
      >
        <div>
          <h1>{link.title}</h1>
        </div>
      </NextLink>
    </div>
  );
}
