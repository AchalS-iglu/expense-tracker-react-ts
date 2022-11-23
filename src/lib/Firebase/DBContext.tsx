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

interface IContext {
  getExpenses: (month: number, year: number) => void;
  getUserData: (user: string) => void;
  expenses: t_expenses[];
  budget: number;
}

const DBContext = createContext<IContext>({
  getExpenses: () => {},
  getUserData: () => {},
  expenses: [],
  budget: 0,
});

const DBContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<t_expenses[]>([]);
  const [monthsList, setMonthsList] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);

  // useEffect(() => {
  //   getUserData("user");
  // }, []);

  // useEffect(() => {
  //   console.log(budget);
  // }, [budget]);

  const getExpenses = (month: number, year: number) => {
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

  const getUserData = (user: string) => {
    const expensesCollectionRef = doc(Firestore, `/expenses/${user}`);

    getDoc(expensesCollectionRef)
      .then((result) => {
          const data = result.data();
        if (data) {
          setMonthsList(data.months);
          setBudget(data.def_budget);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DBContext.Provider value={{ getExpenses, getUserData, expenses, budget }}>
      {" "}
      {children}
    </DBContext.Provider>
  );
};

const DB = () => {
  return useContext(DBContext);
};

export { DBContextProvider, DB };
