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
    rawData.push({
      year: v_year,
      quarter: v_quarter,
      grade: grade_2,
      homeOwnership: home_ownership,
      term,
      currentBalance: V1,
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
