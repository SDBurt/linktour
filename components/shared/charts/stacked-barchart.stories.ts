import type { Meta, StoryObj } from "@storybook/react"

import { intervalData } from "@/lib/api/stats"
import StackedBarChart from "@/components/shared/charts/stacked-barchart"

import { ChartDataType } from "./barchart"

const meta: Meta<typeof StackedBarChart> = {
  component: StackedBarChart,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof StackedBarChart>

const data = [
  {
    start: "2023-06-20 23:00:00",
    views: 0,
    clicks: 0,
    ctr: 1,
  },
  {
    start: "2023-06-21 00:00:00",
    views: 1,
    clicks: 1,
    ctr: 2,
  },
  {
    start: "2023-06-21 01:00:00",
    views: 1,
    clicks: 1,
    ctr: 2,
  },
  {
    start: "2023-06-21 02:00:00",
    views: 2,
    clicks: 2,
    ctr: 1,
  },
  {
    start: "2023-06-21 03:00:00",
    views: 1,
    clicks: 1,
    ctr: 1,
  },
  {
    start: "2023-06-21 04:00:00",
    views: 3,
    clicks: 3,
    ctr: 2,
  },
  {
    start: "2023-06-21 05:00:00",
    views: 4,
    clicks: 4,
    ctr: 5,
  },
  {
    start: "2023-06-21 06:00:00",
    views: 16,
    clicks: 16,
    ctr: 9,
  },
  {
    start: "2023-06-21 07:00:00",
    views: 20,
    clicks: 20,
    ctr: 10,
  },
  {
    start: "2023-06-21 08:00:00",
    views: 9,
    clicks: 9,
    ctr: 8,
  },
  {
    start: "2023-06-21 09:00:00",
    views: 1,
    clicks: 1,
    ctr: 3,
  },
  {
    start: "2023-06-21 10:00:00",
    views: 1,
    clicks: 1,
    ctr: 1,
  },
  {
    start: "2023-06-21 11:00:00",
    views: 0,
    clicks: 0,
    ctr: 0,
  },
  {
    start: "2023-06-21 12:00:00",
    views: 1,
    clicks: 1,
    ctr: 3,
  },
  {
    start: "2023-06-21 13:00:00",
    views: 2,
    clicks: 2,
    ctr: 6,
  },
  {
    start: "2023-06-21 14:00:00",
    views: 6,
    clicks: 6,
    ctr: 5,
  },
  {
    start: "2023-06-21 15:00:00",
    views: 7,
    clicks: 7,
    ctr: 4,
  },
  {
    start: "2023-06-21 16:00:00",
    views: 8,
    clicks: 8,
    ctr: 3,
  },
  {
    start: "2023-06-21 17:00:00",
    views: 9,
    clicks: 9,
    ctr: 4,
  },
  {
    start: "2023-06-21 18:00:00",
    views: 2,
    clicks: 2,
    ctr: 5,
  },
  {
    start: "2023-06-21 19:00:00",
    views: 2,
    clicks: 2,
    ctr: 4,
  },
  {
    start: "2023-06-21 20:00:00",
    views: 6,
    clicks: 6,
    ctr: 3,
  },
  {
    start: "2023-06-21 21:00:00",
    views: 1,
    clicks: 1,
    ctr: 2,
  },
  {
    start: "2023-06-21 22:00:00",
    views: 2,
    clicks: 2,
    ctr: 1,
  },
]
export const Default: Story = {
  args: {
    data: data,
    format: intervalData["24h"].format,
    barKeyOne: "views",
    barKeyTwo: "clicks",
    lineKey: "ctr",
  },
}
