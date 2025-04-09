import { LoanRecord } from "../request/api";

export type AggregatedResult = {
  grade: string;
  totalBalance: number;
};

export const aggregateLoanData = (data: LoanRecord[]): AggregatedResult[] => {
  const aggregation: Record<string, number> = {};

  data.forEach(({ grade, currentBalance }) => {
    if (!aggregation[grade]) {
      aggregation[grade] = 0;
    }
    aggregation[grade] += parseFloat(currentBalance);
  });

  return Object.entries(aggregation).map(([grade, totalBalance]) => ({
    grade,
    totalBalance: parseFloat(totalBalance.toFixed(2)),
  }));
};
