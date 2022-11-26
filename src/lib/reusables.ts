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
  UPDATE_EXPENSE = "UPDATE_EXPENSE",
  ADD_EXPENSE_TO_LIST = "ADD_EXPENSE_TO_LIST",
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

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};
