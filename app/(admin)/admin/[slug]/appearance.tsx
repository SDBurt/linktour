import Preview from "@/app/playground/preview";
import { Link, Project, Theme, User } from "@prisma/client";
import { BackgroundCard } from "./backgroundCard";
import { ButtonsCard } from "./buttonsCard";
import { FontsCard } from "./fontsCard";

interface AppearanceProps {
  project: Pick<Project, "name" | "description" | "image">;
  links: Pick<Link, "title" | "url">[];
  theme: Pick<
    Theme,
    | "backgroundColor"
    | "backgroundStyle"
    | "backgroundType"
    | "buttonBackgroundColor"
    | "buttonShadowColor"
    | "buttonTextColor"
    | "buttonType"
    | "key"
    | "luminance"
    | "socialStyleColor"
    | "typefaceColor"
    | "typefaceFamily"
  >;
  user: Pick<User, "image" | "name">;
}

export function Appearance({ project, links, theme, user }: AppearanceProps) {
  return (
    <div className="grid grid-cols-2 border p-2 h-full">
      <div className="flex flex-col col-span-1 space-y-2">
        <BackgroundCard />
        <ButtonsCard />
        <FontsCard />
      </div>
      <div className="flex col-span-1 w-full overflow-hidden">
        <div className="h-3/5 w-1/3 fixed right-20 border p-2 bg-black rounded-lg">
          <Preview
            theme={theme}
            project={project}
            links={links}
            user={{ name: user.name, image: user.image }}
          />
        </div>
      </div>
    </div>
  );
}
