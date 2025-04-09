import { Filters, FilterOptions } from "../hooks/useLoanData";

type LoanFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  options: FilterOptions;
  resetFilters: () => void;
};

function LoanFilters({
  filters,
  onChange,
  options,
  resetFilters,
}: LoanFiltersProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end">
      <Select
        label="Year"
        value={filters.year ?? ""}
        options={options.years}
        onChange={(val) => handleChange("year", val)}
      />
      <Select
        label="Quarter"
        value={filters.quarter ?? ""}
        options={options.quarters}
        onChange={(val) => handleChange("quarter", val)}
      />
      <Select
        label="Home Ownership"
        value={filters.homeOwnership ?? ""}
        options={options.homeOwnerships}
        onChange={(val) => handleChange("homeOwnership", val)}
      />
      <Select
        label="Term"
        value={filters.term ?? ""}
        options={options.terms}
        onChange={(val) => handleChange("term", val)}
      />
      <div className="flex-shrink-0">
        <button
          onClick={resetFilters}
          className="px-4 py-2 cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const Select = ({ label, value, options, onChange }: SelectProps) => (
  <div className="flex-grow">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm px-3 py-2 bg-white text-gray-800"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default LoanFilters;
