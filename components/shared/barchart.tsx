"use client"

// import { format } from "date-fns"
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export type ChartDataType = { start: string; clicks: number; end?: string }

const BarChart = ({ data, format }: { data: ChartDataType[]; format: any }) => {
  const dateFormatter = (date) => {
    return format(new Date(date))
    // return format(new Date(date), "MMM dd hh:mm")
  }

  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex h-full w-full">
      <div className="w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: -20,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="start"
              type="category"
              stroke="#888888"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={dateFormatter}
            />
            <YAxis
              type="number"
              stroke="#888888"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              allowDecimals={false}
            />
            <Tooltip labelFormatter={dateFormatter} />
            <Legend />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#EEEEEE"
            />
            <Bar dataKey="clicks" fill="#26E0EC" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChart
