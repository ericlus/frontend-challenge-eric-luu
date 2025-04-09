import { AggregatedResult } from "../utils/aggregateLoans";

type LoanGradeTableProps = {
  aggregatedData: AggregatedResult[];
};

function LoanGradeTable({ aggregatedData }: LoanGradeTableProps) {
  return (
    <div className="overflow-x-auto mb-6">
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
          <tr>
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
