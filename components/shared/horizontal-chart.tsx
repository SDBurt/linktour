"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export interface ChartProps {
  dataKey: string
  data: {
    [key: string]: string | number
  }[]
  fill: string
}

const HorizontalChart = ({ dataKey, data, fill = "#26E0EC" }: ChartProps) => {
  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex h-full w-full">
      <div className="w-0 flex-1">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
              layout="vertical"
            >
              <XAxis
                type="number"
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                allowDecimals={false}
              />
              <YAxis
                dataKey={dataKey}
                type="category"
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip />
              <Legend />
              <CartesianGrid
                horizontal={false}
                vertical={true}
                stroke="#EEEEEE"
              />
              <Bar
                barSize={20}
                dataKey="clicks"
                fill={fill}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No {dataKey} data for this time period</p>
        )}
      </div>
    </div>
  )
}

export default HorizontalChart
