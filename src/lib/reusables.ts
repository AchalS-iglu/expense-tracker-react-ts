import { DocumentData, Timestamp } from "firebase/firestore";

export type monthYear_t = {
  month: number;
  year: number;
  budget: number;
};

export enum monthYearActionKind {
  SET_YEAR = "SET_YEAR",
  SET_MONTH = "SET_MONTH",
  SET_BUDGET = "SET_BUDGET",
}
export interface monthYearAction {
  type: monthYearActionKind;
  payload: number;
}

export enum expensesActionKind {
  ADD_EXPENSE = "ADD_EXPENSE",
  REMOVE_EXPENSE = "REMOVE_EXPENSE",
  UPDATE_EXPENSE = "UPDATE_EXPENSE"
}

export interface expensesAction {
  type: expensesActionKind;
  payload: expense_t;
}

export const initialMonthYear = () => {
  const today = new Date();
  return {
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    budget: 0,
  };
};
export type expense_t = {
  id: string;
  name: string;
  cost: number;
  date: Timestamp;
};

export var month_ed: { [month: number]: number } = {
  1: 31,
  2: 30,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
