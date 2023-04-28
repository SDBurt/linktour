import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { User, Project } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { EmptyCardPlaceholder } from "@/components/shared/empty-card-placeholder";
import { AppHeader } from "@/components/shared/page-header";
import { LinkCreateButton } from "@/components/admin/link/link-create-button";
import { LinkItem } from "@/components/admin/link/link-item";
import { AppShell } from "@/components/admin/layouts/shell";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";

const getProject = cache(async (userId: User["id"], slug: Project["slug"]) => {
  return await db.project.findFirst({
    where: {
      userId: userId,
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      links: true,
    },
  });
});

async function ProjectPage({ params }) {
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const project = await getProject(session.user.id, slug);

  if (!project) {
    notFound();
  }

  const links = project?.links;

  return (
    <AppShell>
      <AppHeader
        heading={project?.name || "Untitled Project"}
        text="Create and manage short links."
      >
        <LinkCreateButton
          className={cn(buttonVariants({ variant: "default" }), "mt-1")}
        />
      </AppHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {links.map((link) => (
              <LinkItem key={link.id} slug={project.slug} link={link} />
            ))}
          </div>
        ) : (
          <EmptyCardPlaceholder>
            <EmptyCardPlaceholder.Icon name="post" />
            <EmptyCardPlaceholder.Title>
              No links created
            </EmptyCardPlaceholder.Title>
            <EmptyCardPlaceholder.Description>
              You don&apos;t have any short links yet. Start creating content.
            </EmptyCardPlaceholder.Description>
            <LinkCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyCardPlaceholder>
        )}
      </div>
    </AppShell>
  );
}

export default ProjectPage;
