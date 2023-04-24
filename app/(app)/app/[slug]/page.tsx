import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { User, Project } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { LinkCreateButton } from "@/components/link/link-create-button";
import { LinkItem } from "@/components/link/link-item";
import { DashboardShell } from "@/components/layouts/shell";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const getUserProjects = cache(async (userId: User["id"]) => {
  return await db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      domain: true,
      links: true,
    },
  });
});

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
      domain: true,
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
    <DashboardShell>
      <DashboardHeader
        heading={project?.name || "Untitled Project"}
        text="Create and manage short links."
      >
        <LinkCreateButton
          className={cn(buttonVariants({ variant: "default" }), "mt-1")}
        />
      </DashboardHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {links.map((link) => (
              <LinkItem key={link.id} slug={project.slug} link={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any short links yet. Start creating content.
            </EmptyPlaceholder.Description>
            <LinkCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}

export default ProjectPage;
