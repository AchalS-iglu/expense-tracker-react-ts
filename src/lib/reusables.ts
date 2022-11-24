export type monthYear_t = {
  month: number;
  year: number;
  budget?: number;
};

export enum monthYearActionKind {
  SET_YEAR = "SET_YEAR",
  SET_MONTH = "SET_MONTH",
  SET_BUDGET = "SET_BUDGET",
}

export const initialMonthYear = () => {
  const today = new Date();
  return {
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
};
