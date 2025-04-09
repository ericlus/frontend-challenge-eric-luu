import { useLoanData } from "../hooks/useLoanData";

function Dashboard() {
  const { aggregatedData, loading, error } = useLoanData();

  if (loading) {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
