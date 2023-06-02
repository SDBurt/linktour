"use client"

import { useParams, useSearchParams } from "next/navigation"
import useSWR from "swr"

import { intervalData } from "@/lib/api/stats"
import { fetcher } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BarChart, { ChartDataType } from "@/components/shared/barchart"

const Activity = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const interval = searchParams?.get("interval")

  const { data } = useSWR<ChartDataType[]>(
    `/api/projects/${params?.slug}/links/${params?.key}/stats/timeseries${
      interval ? `?interval=${interval}` : "?interval=24h"
    }`,
    fetcher
  )

  const formatData = (data) => {
    if (!data || data.length === 0) {
      return []
    }
    return data.map((d: ChartDataType) => {
      return {
        ...d,
        start: new Date(d.start),
      }
    })
  }

  const clickTotal = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.clicks,
    0
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Total Clicks: {clickTotal}</CardDescription>
      </CardHeader>
      <CardContent className="h-96 w-full">
        <BarChart
          data={formatData(data)}
          format={intervalData[interval || "24h"].format}
        />
      </CardContent>
    </Card>
  )
}

export default Activity
