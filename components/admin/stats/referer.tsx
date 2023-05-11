"use client";

import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import HorizontalChart, { ChartProps } from "@/components/app/horizontal-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Referer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const interval = searchParams?.get("interval");

  const { data, isLoading } = useSWR<ChartProps["data"]>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/referer${
      interval ? `?interval=${interval}` : "?interval=24hr"
    }`,
    fetcher
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referer</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-96">
        {isLoading ? (
          <p>Loading</p>
        ) : data ? (
          <HorizontalChart dataKey={"referer"} data={data} fill="#00FF00" />
        ) : (
          <p>No Data</p>
        )}
      </CardContent>
    </Card>
  );
}
