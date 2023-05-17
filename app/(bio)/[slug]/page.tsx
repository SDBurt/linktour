import Preview from "@/app/playground/preview";
import { getProject } from "@/lib/api/projects";
import THEME from "@/lib/constants/theme";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Bio",
};

export default async function BioPage({ params }) {
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { name, links, user, image, description } = project;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <div className="w-full h-full flex justify-center">
        <Preview
          theme={THEME}
          project={{ name: name, image: image, description: description }}
          links={links}
          user={user}
        />
      </div>
    </div>
  );
}
