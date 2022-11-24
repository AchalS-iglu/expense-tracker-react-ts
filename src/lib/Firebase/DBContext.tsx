import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Firestore } from "./initFirebase";
import { t_expenses, month_year, user, month_ed } from "../models";
import { monthYear_t, initialMonthYear } from "../reusables";

function formatMonthsList(monthsListData: Array<string>) {
  let monthsList = [];
  for (let data of monthsListData) {
    let data_split = data.split("-");
    monthsList.push({
      month: Number(data_split[0]),
      year: Number(data_split[1]),
      budget: Number(data_split[2]),
    });
  }
  return monthsList;
}

interface IContext {
  getExpenses: (monthYear_t: monthYear_t) => void;
  getBudget: (user: string, monthYear: monthYear_t) => void;
  expenses: t_expenses[];
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const DBContext = createContext<IContext>({
  getExpenses: () => {},
  getBudget: () => {},
  expenses: [],
  budget: 0,
  setBudget: () => {},
});

const DBContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<t_expenses[]>([]);
  // const [monthsList, setMonthsList] = useState<Array<monthYear_t>>([
  //   initialMonthYear(),
  // ]);
  const [budget, setBudget] = useState<number>(0);

  const getExpenses = (monthYear: monthYear_t) => {
    let month = monthYear.month;
    let year = monthYear.year;

    const expensesCollectionRef = collection(
      Firestore,
      "/expenses/user/expenses/"
    );

    const s_d = new Date(`${year.toString()}-${month.toString()}-01`);
    const e_d = new Date(s_d);
    e_d.setMonth(s_d.getMonth() + 1);

    const s_dt = new Timestamp(s_d.getTime() / 1000, 0);
    const e_dt = new Timestamp(e_d.getTime() / 1000, 0);

    const q = query(
      expensesCollectionRef,
      where("timestamp", ">=", s_dt),
      where("timestamp", "<", e_dt)
    );
    getDocs(q)
      .then((result) => {
        const r_expenses = result.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setExpenses(r_expenses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBudget = (user: string, monthYear: monthYear_t) => {
    const expensesCollectionRef = doc(Firestore, `/expenses/${user}`);

    getDoc(expensesCollectionRef)
      .then((result) => {
        const data = result.data();
        if (data) {
          let tempMonthsList = formatMonthsList(data.months);
          for (let tempMonthYear of tempMonthsList) {
            if (
              tempMonthYear.month === monthYear.month &&
              tempMonthYear.year === monthYear.year &&
              tempMonthYear.budget
            ) {
              setBudget(tempMonthYear.budget);
            } else {
              setBudget(data.def_budget);
            }
          }
          // setMonthsList(tempMonthsList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DBContext.Provider
      value={{ getExpenses, getBudget, expenses, budget, setBudget }}
    >
      {" "}
      {children}
    </DBContext.Provider>
  );
};

const DB = () => {
  return useContext(DBContext);
};

export { DBContextProvider, DB };
