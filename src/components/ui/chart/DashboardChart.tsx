import { Transaction } from "@/types";
import { Link } from "react-router-dom";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useMemo } from "react";
import { Empty } from "antd";

type DashboardChartProps = {
  data: Transaction[] | undefined;
};

const formatNumber = (value: number) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(0)}k`;
  return `${sign}${abs}`;
};

const DashboardChart = ({ data }: DashboardChartProps) => {
  const parsedData =
    data?.map((t) => ({
      ...t,
      amount:
        t.transaction_type === "income" ? Number(t.amount) : -Number(t.amount),
    })) ?? [];

  const gradientOffset = useMemo(() => {
    if (parsedData.length === 0) return 0;

    const values = parsedData.map((i) => i.amount);
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;

    return dataMax / (dataMax - dataMin);
  }, [parsedData]);

  return (
    <div className="border rounded-xl p-5">
      <div className="pb-5 flex items-center justify-between">
        <div className="flex flex-col">
          <Link to={"/transactions"} className="font-medium text-xl">
            Transactions
          </Link>
          <span className="text-sm font-medium text-gray-500">
            For all time
          </span>
        </div>
        <div className="flex items-center border rounded-md font-medium overflow-hidden">
          <button className="text-sm px-2 py-1 hover:bg-gray-100 duration-300">
            Last 3 months
          </button>
          <button className="text-sm px-2 py-1 border-x hover:bg-gray-100 duration-300">
            Last 30 days
          </button>
          <button className="text-sm px-2 py-1 hover:bg-gray-100 duration-300">
            Last 7 days
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {parsedData.length === 0 ? (
          <Empty />
        ) : (
          <AreaChart
            data={parsedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset={gradientOffset}
                  stopColor="green"
                  stopOpacity={1}
                />
                <stop offset={gradientOffset} stopColor="red" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip formatter={(value: number) => formatNumber(value)} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="none"
              fill="url(#splitColor)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
