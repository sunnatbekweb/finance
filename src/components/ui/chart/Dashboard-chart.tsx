import { Transaction } from "@/types/type";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";

type DashboardChartProps = {
  data: Transaction[] | undefined;
};

const DashboardChart = ({ data }: DashboardChartProps) => {
  if (!data) return null;
  
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const xAxisDates = sortedData.map((t) => new Date(t.date));

  const seriesData = sortedData.map((t) => {
    const value = parseFloat(t.amount);
    return t.transaction_type === "expense" ? -value : value;
  });

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
        <div className="hidden sm:flex items-center border rounded-md font-medium overflow-hidden">
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

      <BarChart
        height={300}
        grid={{ horizontal: true }}
        series={[{ data: seriesData }]}
        yAxis={[
          {
            colorMap: {
              type: "piecewise",
              thresholds: [0],
              colors: ["#ef4444", "#10b981"],
            },
          },
        ]}
        xAxis={[
          {
            data: xAxisDates,
            valueFormatter: (value: Date) =>
              value.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
          },
        ]}
      />
    </div>
  );
};

export default DashboardChart;
