import { useEffect, useState } from "react";
import { getData, LoanRecord } from "../request/api";

export const useLoanData = () => {
  const [data, setData] = useState<LoanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Aggregate balances by grade
  const aggregateByGrade = () => {
    const aggregation: Record<string, number> = {};

    data.forEach(({ grade, currentBalance}) => {
      if (!aggregation[grade]) {
        aggregation[grade] = 0
      }
      aggregation[grade] += parseFloat(currentBalance);
    });

    return Object.entries(aggregation).map(([grade, totalBalance]) => ({
      grade,
      totalBalance: totalBalance.toFixed(2),
    }));
  };

  return {
    aggregatedData: aggregateByGrade(),
    loading,
    error,
  };
};