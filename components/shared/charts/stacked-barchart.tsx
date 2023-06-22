"use client"

import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ExampleProps {
  data: any
  format: any
  barKeyOne: string
  barKeyTwo?: string
  lineKey?: string
}

export const StackedBarChart = ({
  data,
  format,
  barKeyOne = "views",
  barKeyTwo = "clicks",
  lineKey = "ctr",
}: ExampleProps) => {
  const dateFormatter = (date) => {
    return format(new Date(date))
  }

  return (
    <div className="flex min-h-[24rem] w-full">
      <div className="w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -5,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="start"
              type="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={dateFormatter}
            />
            <YAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip labelFormatter={dateFormatter} />

            <Bar dataKey={barKeyOne} stackId="a" fill="#39e09b" />
            <Bar
              dataKey={barKeyTwo}
              stackId="a"
              fill="#7551e9"
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey={lineKey}
              stroke="#0bafff"
              strokeWidth={3}
              dot={false}
            />
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StackedBarChart
