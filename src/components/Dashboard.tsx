import { useLoanData } from "../hooks/useLoanData";
import LoanGradeTable from "./LoanGradeTable";
import LoanFilters from "./LoanFilters";
import LoanGradeBarChart from "./LoanGradeBarChart";

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight text-center">
            Loan Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-sm text-center">
            View and filter loan balances aggregated by grade
          </p>
        </header>
        <LoanGradeTable aggregatedData={aggregatedData} />
        <LoanFilters
          filters={currentFilters}
          onChange={applyFilters}
          options={filterOptions}
          resetFilters={resetFilters}
        />
        <LoanGradeBarChart aggregatedData={aggregatedData} />
      </div>
    </div>
  );
}

export default Dashboard;
