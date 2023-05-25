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

const HorizontalChart = ({ dataKey, data, fill = "#00FF00" }: ChartProps) => {
  console.log({data})
  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex h-full w-full">
      <div className="w-0 flex-1">
        {data && data.length > 0 ? <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 40,
              bottom: 20,
            }}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis dataKey={dataKey} type="category" />
            <Tooltip />
            <Legend />
            <CartesianGrid horizontal={false} vertical={true} />
            <Bar barSize={20} dataKey="clicks" fill={fill} />
          </BarChart>
        </ResponsiveContainer> : <p>No {dataKey} data for this time period</p>}
      </div>
    </div>
  )
}

export default HorizontalChart
