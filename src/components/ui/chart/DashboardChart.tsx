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
import { format } from "date-fns";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
      amount: Number(t.amount),
    })) ?? [];

  useEffect(() => {
    toast.warn("We are making updates. Some features may not work.");
  }, []);
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
        <div className="flex items-center border rounded-md font-medium">
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
        <AreaChart
          width={500}
          height={400}
          data={parsedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) =>
              format(new Date(value), "dd.MM.yyyy")
            }
          />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip
            formatter={(value: number) => formatNumber(value)}
            labelFormatter={(label: string) =>
              format(new Date(label), "dd.MM.yyyy")
            }
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#f8c023"
            fill="#f8c023"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
