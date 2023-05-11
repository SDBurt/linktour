"use client";

import useSWR from "swr";
import MetricCard from "@/components/shared/metric-card";
import { MousePointerClick } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";

export default function Clicks() {
  const params = useParams();
  const searchParams = useSearchParams();
  const interval = searchParams?.get("interval");
  const { data } = useSWR<number>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/clicks${
      interval ? `?interval=${interval}` : "?interval=24hr"
    }`,
    fetcher
  );

  if (data === null || data === undefined) {
    return (
      <MetricCard label="Clicks" value="No Clicks">
        <MousePointerClick />
      </MetricCard>
    );
  }

  return (
    <MetricCard label="Clicks" value={`+ ${data}`}>
      <MousePointerClick />
    </MetricCard>
  );
}