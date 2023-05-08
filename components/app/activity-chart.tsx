"use client";

import useSWR from "swr";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format } from "date-fns";
import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import { useCallback } from "react";

export type ChartDataType = { start: string; clicks: number; end?: string };

const ActivityChart = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const interval = searchParams?.get("interval");

  const { data } = useSWR<number>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/timeseries${
      interval ? "?" + `interval=${interval}` : null
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

  const dateFormatter = (date) => {
    return format(new Date(date), "MMM dd hh:mm");
  };

  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex w-full h-full">
      <div className="flex-1 w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formatData(data)}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="start"
              type="category"
              tickFormatter={dateFormatter}
            />
            <YAxis type="number" />
            <Tooltip labelFormatter={dateFormatter} />
            <Legend />
            <Bar dataKey="clicks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
