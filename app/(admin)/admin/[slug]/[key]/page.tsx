import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { Link, Project } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { AppHeader } from "@/components/shared/page-header";
import { AppShell } from "@/components/admin/layouts/shell";
import { getServerSession } from "next-auth";
import ActivityChart from "@/components/app/activity-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HorizontalChart from "@/components/app/horizontal-chart";
import { CalendarPopover } from "@/components/shared/calendar-popover";
import MetricCard from "@/components/shared/metric-card";
import { Activity, CreditCard, DollarSign } from "lucide-react";
import Clicks from "@/components/admin/stats/clicks";
import { getLinkStats, IntervalProps } from "@/lib/api/stats";
import { TimeframeSelect } from "@/components/shared/timeframe-select";

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

const deviceTestData = JSON.stringify([
  { device: "Desktop", clicks: 2 },
  { device: "Mobile", clicks: 10 },
]);

const locationTestData = JSON.stringify([
  { location: "United Kingdom", clicks: 2 },
  { location: "United States", clicks: 10 },
  { location: "Canada", clicks: 200 },
]);

const refererTestData = JSON.stringify([
  { referer: "(direct)", clicks: 7 },
  { referer: "sdburt.com", clicks: 4 },
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

  const deviceData = JSON.parse(deviceTestData);
  const locationData = JSON.parse(locationTestData);
  const refererData = JSON.parse(refererTestData);

  return (
    <AppShell>
      <AppHeader heading={link?.title || "Untitled Link"}>
        <TimeframeSelect />
      </AppHeader>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger disabled value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent className="space-y-4" value="overview">
          <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {/* <MetricCard
              label="Total Clicks"
              value="125"
              subValue="+20.1% from last month"
            >
              <MousePointerClick />
            </MetricCard> */}
            <Clicks />

            <MetricCard
              label="Total Revenue"
              value="$45,231.89"
              subValue="+20.1% from last month"
            >
              <DollarSign />
            </MetricCard>
            <MetricCard
              label="Subscriptions"
              value="+2350"
              subValue="+180.1% from last month"
            >
              <Activity />
            </MetricCard>
            <MetricCard
              label="Sales"
              value="+12,234"
              subValue="+19% from last month"
            >
              <CreditCard />
            </MetricCard>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clicks</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96">
                <ActivityChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96">
                <HorizontalChart dataKey="location" data={locationData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Devices</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96">
                <HorizontalChart dataKey="device" data={deviceData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>referer</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96">
                <HorizontalChart dataKey="referer" data={refererData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <p>To be implemented</p>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

export default LinkPage;
