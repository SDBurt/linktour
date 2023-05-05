import { LinkCard } from "@/components/bio/link-card";
import { UserAvatar } from "@/components/user/user-avatar";
import { getProject } from "@/lib/api/projects";
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

  const { name, links, user } = project;

  return (
    <div className="container space-y-2 mt-2">
      <div>
        <UserAvatar user={user} />
      </div>
      <h1>{name}</h1>
      <div className="flex flex-col space-y-2">
        {links &&
          links.map((link) => {
            return (
              <LinkCard
                key={link.id}
                link={{
                  id: link.id,
                  title: link.title,
                  slug: link.slug,
                  key: link.key,
                  url: link.url,
                  clicks: link.clicks,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
