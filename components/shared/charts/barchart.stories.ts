import type { Meta, StoryObj } from "@storybook/react"

import { intervalData } from "@/lib/api/stats"
import BarChart, { ChartDataType } from "@/components/shared/charts/barchart"

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof BarChart>

const data = [
  {
    start: "2023-06-20 23:00:00",
    clicks: 0,
  },
  {
    start: "2023-06-21 00:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 01:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 02:00:00",
    clicks: 2,
  },
  {
    start: "2023-06-21 03:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 04:00:00",
    clicks: 3,
  },
  {
    start: "2023-06-21 05:00:00",
    clicks: 4,
  },
  {
    start: "2023-06-21 06:00:00",
    clicks: 16,
  },
  {
    start: "2023-06-21 07:00:00",
    clicks: 20,
  },
  {
    start: "2023-06-21 08:00:00",
    clicks: 9,
  },
  {
    start: "2023-06-21 09:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 10:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 11:00:00",
    clicks: 0,
  },
  {
    start: "2023-06-21 12:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 13:00:00",
    clicks: 2,
  },
  {
    start: "2023-06-21 14:00:00",
    clicks: 6,
  },
  {
    start: "2023-06-21 15:00:00",
    clicks: 7,
  },
  {
    start: "2023-06-21 16:00:00",
    clicks: 8,
  },
  {
    start: "2023-06-21 17:00:00",
    clicks: 9,
  },
  {
    start: "2023-06-21 18:00:00",
    clicks: 2,
  },
  {
    start: "2023-06-21 19:00:00",
    clicks: 2,
  },
  {
    start: "2023-06-21 20:00:00",
    clicks: 6,
  },
  {
    start: "2023-06-21 21:00:00",
    clicks: 1,
  },
  {
    start: "2023-06-21 22:00:00",
    clicks: 2,
  },
]

export const Default: Story = {
  args: {
    data: data,
    format: intervalData["24h"].format,
  },
}
