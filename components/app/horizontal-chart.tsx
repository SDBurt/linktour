"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  dataKey: string;
  data: {
    [key: string]: number;
    clicks: number;
  }[];
}

const HorizontalChart = ({ dataKey, data }: ChartProps) => {
  return (
    // flex hack for resizing widow from larger to smaller
    // https://github.com/recharts/recharts/issues/172
    <div className="flex w-full h-full">
      <div className="flex-1 w-0">
        <ResponsiveContainer width="100%" height="100%">
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
            <Bar barSize={20} dataKey="clicks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalChart;
