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

const getLinkTimeseriesData = cache(
  async (slug: Project["slug"], key: Link["key"], interval: IntervalProps) => {
    const timeseriesData = await getLinkStats({
      slug: slug,
      key: key,
      endpoint: "timeseries",
      interval,
    });

    console.log(timeseriesData);

    return timeseriesData;
  }
);

const activityTestData = JSON.stringify([
  { start: "2023-04-12T16:00:00.000Z", clicks: 1 },
  { start: "2023-04-13T16:00:00.000Z", clicks: 2 },
  { start: "2023-04-14T16:00:00.000Z", clicks: 10 },
  { start: "2023-04-15T16:00:00.000Z", clicks: 100 },
  { start: "2023-04-16T16:00:00.000Z", clicks: 10 },
  { start: "2023-04-17T16:00:00.000Z", clicks: 100 },
  { start: "2023-04-18T16:00:00.000Z", clicks: 90 },
  { start: "2023-04-19T16:00:00.000Z", clicks: 80 },
  { start: "2023-04-20T16:00:00.000Z", clicks: 110 },
  { start: "2023-04-21T16:00:00.000Z", clicks: 80 },
  { start: "2023-04-22T16:00:00.000Z", clicks: 90 },
  { start: "2023-04-23T16:00:00.000Z", clicks: 200 },
  { start: "2023-04-24T16:00:00.000Z", clicks: 300 },
]);

const deviceTestData = JSON.stringify([
  { device: "Desktop", clicks: 2 },
  { device: "Mobile", clicks: 10 },
]);

const locationTestData = JSON.stringify([
  { location: "United Kingdom", clicks: 2 },
  { location: "United States", clicks: 10 },
  { location: "Canada", clicks: 200 },
]);

const referrerTestData = JSON.stringify([
  { referrer: "(direct)", clicks: 7 },
  { referrer: "sdburt.com", clicks: 4 },
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

  const timeseriesData = await getLinkTimeseriesData(slug, key, "24h");

  const activityData = timeseriesData;
  const deviceData = JSON.parse(deviceTestData);
  const locationData = JSON.parse(locationTestData);
  const referrerData = JSON.parse(referrerTestData);

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
                <ActivityChart data={activityData} />
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
                <CardTitle>Referrer</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96">
                <HorizontalChart dataKey="referrer" data={referrerData} />
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
