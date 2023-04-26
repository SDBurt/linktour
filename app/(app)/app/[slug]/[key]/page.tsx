import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { Link, Project } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/shared/page-header";
import { DashboardShell } from "@/components/layouts/shell";
import { getServerSession } from "next-auth";
import Chart from "@/components/app/chart";

const getLinkDetails = cache(async (slug: Link["slug"], key: Link["key"]) => {
  return await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      clicks: true,
    },
  });
});

const getProject = cache(async (userId: string, slug: Project["slug"]) => {
  const project = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      userId: true,
    },
  });

  if (project?.userId === userId) {
    return project;
  }

  return null;
});

const testdata = JSON.stringify([
  { start: "2023-04-23T17:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T18:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T19:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T20:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T21:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T22:00:00.000Z", clicks: 0 },
  { start: "2023-04-23T23:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T00:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T01:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T02:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T03:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T04:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T05:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T06:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T07:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T08:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T09:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T10:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T11:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T12:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T13:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T14:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T15:00:00.000Z", clicks: 0 },
  { start: "2023-04-24T16:00:00.000Z", clicks: 1 },
]);

async function LinkPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const { slug, key } = params;

  if (!slug || !key) {
    notFound();
  }

  const project = await getProject(session?.user.id, slug);

  if (!project) {
    notFound();
  }

  const link = await getLinkDetails(slug, key);

  const data = JSON.parse(testdata);

  return (
    <DashboardShell>
      <DashboardHeader
        heading={link?.title || "Untitled Link"}
        text="manage link."
      ></DashboardHeader>
      <div className="w-full h-96">
        <h2>Clicks: {link?.clicks || 0}</h2>
        <Chart data={data} />
      </div>
    </DashboardShell>
  );
}

export default LinkPage;
