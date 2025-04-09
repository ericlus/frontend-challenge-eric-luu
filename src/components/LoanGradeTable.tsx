import { AggregatedResult } from "../utils/aggregateLoans";

type LoanGradeTableProps = {
  aggregatedData: AggregatedResult[];
};

function LoanGradeTable({ aggregatedData }: LoanGradeTableProps) {
  if (aggregatedData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No data available for the selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-md text-sm text-center">
        <thead>
          <tr className="bg-gray-100">
            {aggregatedData.map(({ grade }) => (
              <th
                key={grade}
                className="border border-gray-300 px-6 py-3 font-medium text-gray-700"
              >
                Grade {grade}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {aggregatedData.map(({ grade, totalBalance }) => (
              <td
                key={grade}
                className="border border-gray-300 px-6 py-4 text-gray-900"
              >
                ${totalBalance}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LoanGradeTable;
