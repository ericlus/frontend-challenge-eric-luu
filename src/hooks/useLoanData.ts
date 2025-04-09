import { useEffect, useMemo, useState } from "react";
import { getData, LoanRecord } from "../request/api";
import { aggregateLoanData } from "../utils/aggregateLoans";

export type Filters = {
  year?: string;
  quarter?: string;
  homeOwnership?: string;
  term?: string;
};

export type FilterOptions = {
  years: string[];
  quarters: string[];
  homeOwnerships: string[];
  terms: string[];
};

export const useLoanData = () => {
  const [data, setData] = useState<LoanRecord[]>([]);
  const [filters, setFilters] = useState<Filters>({});
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

  const { filteredData, filterOptions } = useMemo(() => {
    const filterSets = {
      years: new Set<string>(),
      quarters: new Set<string>(),
      homeOwnerships: new Set<string>(),
      terms: new Set<string>(),
    };

    const filtered: LoanRecord[] = [];

    for (const record of data) {
      const year = record.year;
      const quarter = record.quarter;
      const home = record.homeOwnership;
      const term = record.term;

      // Collect filter options
      filterSets.years.add(year);
      filterSets.quarters.add(quarter);
      filterSets.homeOwnerships.add(home);
      filterSets.terms.add(term);

      // Apply filters
      const matches =
        (!filters.year || filters.year === year) &&
        (!filters.quarter || filters.quarter === quarter) &&
        (!filters.homeOwnership || filters.homeOwnership === home) &&
        (!filters.term || filters.term === term);

      if (matches) {
        filtered.push(record);
      }
    }

    return {
      filteredData: filtered,
      filterOptions: {
        years: Array.from(filterSets.years).sort(),
        quarters: Array.from(filterSets.quarters).sort(),
        homeOwnerships: Array.from(filterSets.homeOwnerships).sort(),
        terms: Array.from(filterSets.terms).sort(),
      },
    };
  }, [data, filters]);

  // Aggregate balances by grade
  const aggregatedData = useMemo(
    () => aggregateLoanData(filteredData),
    [filteredData]
  );

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    data,
    filteredData,
    aggregatedData,
    loading,
    error,
    applyFilters,
    resetFilters,
    filterOptions,
    currentFilters: filters,
  };
};
