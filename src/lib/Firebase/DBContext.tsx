import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { Firestore } from "./initFirebase";
import { t_expenses, month_year, user, month_ed } from "../models";

interface IContext {
  add: () => void;
}

const DBContext = createContext<IContext>({
  add: () => {},
});

const DBContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<t_expenses[]>([]);

  useEffect(() => {
    getExpenses(11, 2022);
    console.log(expenses);
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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
        // console.log(
        //   result.docs.map((doc) => ({ doc: doc.data(), id: doc.id }))
        // );
        const r_expenses = result.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // console.log(r_expenses);
        setExpenses(r_expenses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const add = () => null;

  return <DBContext.Provider value={{ add }}> {children}</DBContext.Provider>;
};

export { DBContextProvider };
