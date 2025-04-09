import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AggregatedResult } from "../utils/aggregateLoans";

type LoanGradeBarChart = {
  aggregatedData: AggregatedResult[];
};

function LoanGradeBarChart({ aggregatedData }: LoanGradeBarChart) {
  if (aggregatedData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No chart data available for the selected filters.
      </div>
    );
  }

  // Transform aggregatedData into a format suitable for Recharts
  const chartData = aggregatedData.map((data) => ({
    grade: data.grade,
    "Total Balance": data.totalBalance,
  }));

  return (
    <div className="bg-white border border-gray-300 rounded-xl px-6 pt-6">
      <div className="overflow-x-auto mb-6 flex justify-center items-center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ left: 40, right: 30, top: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="grade" tick={{ fill: "#4B5563", fontSize: 14 }} />
            <YAxis tick={{ fill: "#4B5563", fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                color: "#333",
              }}
            />
            <Legend wrapperStyle={{ color: "#4B5563" }} />
            <Bar dataKey="Total Balance" fill="#7eb0d5" barSize={80} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LoanGradeBarChart;
