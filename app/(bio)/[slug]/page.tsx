import Preview from "@/app/playground/preview";
import { getProject } from "@/lib/api/projects";
import THEME from "@/lib/constants/theme";
import { ThemeProps } from "@/lib/types";
import { notFound } from "next/navigation";

// Dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const project = await getProject(params.slug);
  return { title: project?.name, description: project?.description };
}

export default async function BioPage({ params }) {
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { name, links, user, image, description, theme } = project;

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <div className="w-full h-full flex justify-center">
        <Preview
          theme={(theme as ThemeProps) || THEME}
          project={{ name: name, image: image, description: description }}
          links={links}
          user={user}
        />
      </div>
    </div>
  );
}
