import { useLoanData } from "../hooks/useLoanData";
import LoanGradeTable from "./LoanGradeTable";
import LoanFilters from "./LoanFilters";

function Dashboard() {
  const {
    aggregatedData,
    loading,
    error,
    applyFilters,
    resetFilters,
    filterOptions,
    currentFilters,
  } = useLoanData();
  if (loading) {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="px-6 pb-6 max-w-6xl mx-auto">
      <LoanGradeTable aggregatedData={aggregatedData} />
      <LoanFilters
        filters={currentFilters}
        onChange={applyFilters}
        options={filterOptions}
        resetFilters={resetFilters}
      />
    </div>
  );
}

export default Dashboard;
