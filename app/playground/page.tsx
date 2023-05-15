import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Background, ButtonStyle } from "@prisma/client";
import Link from "next/link";
import Preview from "./preview";

type TestDataType = {
  theme: {
    background: Background;
    buttonStyle: ButtonStyle;
    key: string;
  };
};

const testLinks = [
  {
    id: "1",
    url: "https://sdburt.com",
    title: "Portfolio Site",
  },
  {
    id: "2",
    url: "https://github.com/sdburt/sdburt.com",
    title: "Github",
  },
];

const testData: TestDataType = {
  theme: {
    background: {
      id: "",
      color: "#4FC3F7",
      style: "COLORUP",
      type: "COLOR",
      themeId: "",
    },
    buttonStyle: {
      id: "",
      backgroundColor: "#EEEEEE",
      shadowColor: "#EEEEEE",
      textColor: "#424242",
      type: "SOFTSHADOW_ROUNDED",
      themeId: "",
    },
    key: "custom",
    luminance: "",
    socialStyleColor: "",
    typefaceColor: "#f5f5f5",
    typefaceFamily: "dm sans",
  },
};

const testUser = {
  name: "Sean Burt",
  image: "https://avatars.githubusercontent.com/u/14956845?v=4",
};

const testProject = {
  name: "Sean Burt",
  description: "A test project containing a portfolio site and a github repo",
  image: "https://avatars.githubusercontent.com/u/14956845?v=4",
};

export default async function PlaygroundPage() {
  const theme = testData.theme;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-green-100">
      <div className="w-full h-full p-2 bg-green-300 flex justify-center">
        <Preview
          theme={theme}
          project={testProject}
          links={testLinks}
          user={testUser}
        />
      </div>
    </div>
  );
}
