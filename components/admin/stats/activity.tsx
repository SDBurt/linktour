"use client";

import useSWR from "swr";

import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import BarChart, { ChartDataType } from "@/components/app/barchart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Activity = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const interval = searchParams?.get("interval");

  const { data } = useSWR<ChartDataType[]>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/timeseries${
      interval ? `?interval=${interval}` : "?interval=24hr"
    }`,
    fetcher
  );

  const formatData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((d: ChartDataType) => {
      return {
        ...d,
        start: new Date(d.start),
      };
    });
  };

  const clickTotal = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.clicks,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Total Clicks: {clickTotal}</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-96">
        <BarChart data={formatData(data)} />
      </CardContent>
    </Card>
  );
};

export default Activity;