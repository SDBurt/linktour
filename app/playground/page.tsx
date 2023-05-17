import { Link, Project, Theme, User } from "@prisma/client";
import Preview from "./preview";

const testLinks: Pick<Link, "title" | "url">[] = [
  {
    url: "https://sdburt.com",
    title: "Portfolio Site",
  },
  {
    url: "https://github.com/sdburt/sdburt.com",
    title: "Github",
  },
];

const testTheme: Pick<
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
> = {
  // General
  key: "custom",
  luminance: "",
  socialStyleColor: "",

  // Background
  backgroundColor: "#4FC3F7",
  backgroundStyle: "COLORUP",
  backgroundType: "COLOR",

  // Button
  buttonBackgroundColor: "#EEEEEE",
  buttonShadowColor: "#EEEEEE",
  buttonTextColor: "#424242",
  buttonType: "SOFTSHADOW_ROUNDED",

  // Typeface
  typefaceColor: "#f5f5f5",
  typefaceFamily: "dm sans",
};

const testUser: Pick<User, "image" | "name"> = {
  name: "Sean Burt",
  image: "https://avatars.githubusercontent.com/u/14956845?v=4",
};

const testProject: Pick<Project, "name" | "image" | "description"> = {
  name: "Sean Burt",
  image: "https://avatars.githubusercontent.com/u/14956845?v=4",
  description: "A test project containing a portfolio site and a github repo",
};

export default async function PlaygroundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-green-100">
      <div className="w-full h-full p-2 bg-green-300 flex justify-center">
        <Preview
          theme={testTheme}
          project={testProject}
          links={testLinks}
          user={testUser}
        />
      </div>
    </div>
  );
}
