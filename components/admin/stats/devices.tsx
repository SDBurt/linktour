"use client"

import { useParams, useSearchParams } from "next/navigation"
import useSWR from "swr"

import { fetcher } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HorizontalChart, {
  ChartProps,
} from "@/components/shared/horizontal-chart"

export default function Devices() {
  const params = useParams()
  const searchParams = useSearchParams()
  const interval = searchParams?.get("interval")

  const { data, isLoading } = useSWR<ChartProps["data"]>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/devices${
      interval ? `?interval=${interval}` : "?interval=24h"
    }`,
    fetcher
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Devices</CardTitle>
      </CardHeader>
      <CardContent className="h-96 w-full">
        {isLoading ? (
          <p>Loading</p>
        ) : data ? (
          <HorizontalChart dataKey={"device"} data={data} fill="#00FF00" />
        ) : (
          <p>No Data</p>
        )}
      </CardContent>
    </Card>
  )
}
