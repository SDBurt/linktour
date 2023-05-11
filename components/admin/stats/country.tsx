"use client";

import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import HorizontalChart, { ChartProps } from "@/components/app/horizontal-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Country() {
  const params = useParams();
  const searchParams = useSearchParams();
  const interval = searchParams?.get("interval");

  const { data, isLoading } = useSWR<ChartProps["data"]>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/country${
      interval ? `?interval=${interval}` : "?interval=24hr"
    }`,
    fetcher
  );

  // const clickTotal =
  //   !isLoading &&
  //   data?.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.clicks,
  //     0
  //   );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Country</CardTitle>
        {/* <CardDescription>Total Clicks: {clickTotal}</CardDescription> */}
      </CardHeader>
      <CardContent className="w-full h-96">
        {isLoading ? (
          <p>Loading</p>
        ) : data ? (
          <HorizontalChart dataKey={"country"} data={data} fill="#00FF00" />
        ) : (
          <p>No Data</p>
        )}
      </CardContent>
    </Card>
  );
}
