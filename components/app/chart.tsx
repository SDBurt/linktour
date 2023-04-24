"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartDataType = { start: string; clicks: number; end?: string };

interface ChartProps {
  data: ChartDataType[];
}

const Chart = ({ data }: ChartProps) => {
  const formatData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((d: ChartDataType) => {
      return {
        ...d,
        start: new Date(d.start).toLocaleTimeString("en-us", {
          hour: "numeric",
        }),
      };
    });
  };

  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex w-full h-full">
      <div className="flex-1 w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formatData(data)}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="start" interval={4} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
