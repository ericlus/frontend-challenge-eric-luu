import Papa from "papaparse";
import rawData from "../assets/loansize.csv?url";

export type LoanRecord = {
  year: string;
  quarter: string;
  grade: string;
  homeOwnership: string;
  term: string;
  currentBalance: string;
};

const parseData = (
  result: Papa.ParseResult<{ [key: string]: string }>,
  rawData: LoanRecord[]
) => {
  for (const {
    v_year,
    v_quarter,
    grade_2,
    home_ownership,
    term,
    V1,
  } of result.data) {
    // Trim to normalize data
    rawData.push({
      year: v_year.trim(),
      quarter: v_quarter.trim(),
      grade: grade_2.trim(),
      homeOwnership: home_ownership.trim(),
      term: term.trim(),
      currentBalance: V1.trim(),
    });
  }

  return rawData;
};

export const getData = async () => {
  const csvData = await fetch(rawData).then((response) => {
    return response.text();
  });
  const data: LoanRecord[] = [];
  await Papa.parse<{ [key: string]: string }>(csvData, {
    header: true, // Tells Papa to treat the first row as headers
    skipEmptyLines: true, // Skip any empty lines
    complete: (result) => parseData(result, data),
  });

  return data;
};
