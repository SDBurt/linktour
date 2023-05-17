"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Preview from "@/app/playground/preview";
import { ThemeProps } from "@/lib/types";
import { Link, Project, User } from "@prisma/client";
import { BackgroundCard } from "./backgroundCard";
import { ButtonsCard } from "./buttonsCard";
import { FontsCard } from "./fontsCard";
import { Button } from "@/components/ui/button";
import THEME from "@/lib/constants/theme";

interface AppearanceProps {
  project: Pick<Project, "name" | "description" | "image" | "slug">;
  links: Pick<Link, "title" | "url">[];
  theme: ThemeProps;
  user: Pick<User, "image" | "name">;
}

export function Appearance({ project, links, theme, user }: AppearanceProps) {
  let method = "PATCH";
  if (!theme) {
    console.log({ project, links, theme, user });
    theme = THEME;
    method = "POST";
  }
  const [themePreview, setThemePreview] = useState<ThemeProps>(theme ?? THEME);

  const onSubmitClicked = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/projects/${project.slug}/theme`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themePreview),
    });

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your theme was not created/updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description:
        method === "PATCH"
          ? "Your theme has been updated."
          : "Your theme has been created.",
    });
  };

  return (
    <div className="grid grid-cols-3 py-2 ">
      <div className="flex flex-col col-span-2 space-y-2 overflow-y-scroll px-2 max-h-[700px]">
        <BackgroundCard theme={themePreview} setTheme={setThemePreview} />
        <ButtonsCard theme={themePreview} setTheme={setThemePreview} />
        <FontsCard theme={themePreview} setTheme={setThemePreview} />
        <Button onClick={onSubmitClicked}>
          {method === "PATCH" ? "Update" : "Create"}
        </Button>
      </div>
      <div className="flex col-span-1 w-full overflow-hidden justify-center items-center">
        <div className="h-[700px] w-[341px] border p-2 bg-black rounded-lg">
          <Preview
            theme={themePreview}
            project={project}
            links={links}
            user={{ name: user.name, image: user.image }}
          />
        </div>
      </div>
    </div>
  );
}
