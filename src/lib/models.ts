import { DocumentData, Timestamp } from "firebase/firestore";

export type t_expenses = {
  id: string;
  data: DocumentData;
};

export type month_year = {
  id: string;
  budget: number;
  month: number;
  year: number;
  expenses: [];
};

export type user = {
  id: string;
  def_budget: number;
  months: [];
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
