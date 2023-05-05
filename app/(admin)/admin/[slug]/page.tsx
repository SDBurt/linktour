import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { User, Project } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/shared/page-header";
import { LinkCreateButton } from "@/components/admin/link/link-create-button";
import { AppShell } from "@/components/admin/layouts/shell";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkList } from "@/components/admin/link/link-list";

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
      {/* <Breadcrumb /> */}
      <AppHeader
        heading={project?.name || "Untitled Project"}
        text="Create and manage short links."
      >
        <LinkCreateButton
          className={cn(buttonVariants({ variant: "default" }), "mt-1")}
        />
      </AppHeader>
      <Tabs defaultValue="links" className="w-full">
        <TabsList>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger disabled value="appearance">
            Appearance
          </TabsTrigger>
          <TabsTrigger disabled value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="links">
          <LinkList links={links} />
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

export default ProjectPage;
