"use client";

import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format } from "date-fns";

export type ChartDataType = { start: string; clicks: number; end?: string };

const BarChart = ({ data }: { data: ChartDataType[] }) => {
  const dateFormatter = (date) => {
    return format(new Date(date), "MMM dd hh:mm");
  };

  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex w-full h-full">
      <div className="flex-1 w-0">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
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
            <CartesianGrid horizontal={true} vertical={false} />
            <Bar dataKey="clicks" fill="#00FF00" />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
