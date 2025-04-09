import { useLoanData } from "../hooks/useLoanData";
import LoanGradeTable from "./LoanGradeTable";

function Dashboard() {
  const { aggregatedData, loading, error } = useLoanData();

  if (loading) {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div>
      <LoanGradeTable aggregatedData={aggregatedData} />
    </div>
  );
}

export default Dashboard;
