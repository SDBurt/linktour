import { BioLinkItem } from "@/components/bio/link/bio-link-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { db } from "@/lib/db";
import { Link, Project } from "@prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProject = cache(async (slug: Project["slug"]) => {
  return await db.project.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      links: true,
    },
  });
});

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);

  return { title: project?.name || "Project" };
}

export default async function BioPage({ params }) {
  const { slug } = params as { slug: string };

  if (!slug) {
    notFound();
  }

  const project = await getProject(slug);
  const links = project?.links;

  return (
    <div className="container space-y-2 mt-2 text-center">
      <h1>This should be the Bio page of the {slug} project</h1>
      <div className="flex flex-col items-center justify-center">
        {links?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 w-full max-w-lg">
            {links.map((link: Link) => (
              <BioLinkItem key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any short links yet. Start creating content.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
}
