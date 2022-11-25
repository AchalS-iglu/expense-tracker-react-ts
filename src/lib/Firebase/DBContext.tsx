import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { Firestore } from "./initFirebase";
import {
  monthYear_t,
  monthYearAction,
  monthYearActionKind,
  expensesAction,
  expensesActionKind,
} from "../reusables";
interface IContext {
  getExpenses: (
    monthYear: monthYear_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => void;
  getBudget: (
    user: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => void;
  updateCurrentBudget: (
    user: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => void;
}

const DBContext = createContext<IContext>({
  getExpenses: () => {},
  getBudget: () => {},
  updateCurrentBudget: () => {},
});

const DBContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const getExpenses = (
    monthYear: monthYear_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => {
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
          name: doc.data().name,
          cost: doc.data().cost,
          date: doc.data().timestamp,
        }));
        for (let expense of r_expenses) {
          dispatchExpenses({
            type: expensesActionKind.ADD_EXPENSE,
            payload: expense,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const getBudget = (
    user: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => {
    const expensesCollectionRef = doc(Firestore, `/expenses/${user}`);

    getDoc(expensesCollectionRef)
      .then((result) => {
        const data = result.data();
        if (data) {
          let finished = false;
          let tempMonthsList = [...data.months];
          for (let tempMonthYear of tempMonthsList) {
            if (
              tempMonthYear.month === monthYear.month &&
              tempMonthYear.year === monthYear.year &&
              tempMonthYear.budget
            ) {
              dispatchMonthYear({
                type: monthYearActionKind.SET_BUDGET,
                payload: tempMonthYear.budget,
              });
              finished = true;
            }
          }
          if (!finished) {
            if (data.def_budget) {
              dispatchMonthYear({
                type: monthYearActionKind.SET_BUDGET,
                payload: data.def_budget,
              });
            } else {
              dispatchMonthYear({
                type: monthYearActionKind.SET_BUDGET,
                payload: 5000,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCurrentBudget = async (
    user: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => {
    dispatchMonthYear({
      type: monthYearActionKind.SET_BUDGET,
      payload: monthYear.budget,
    });

    const expensesCollectionRef = doc(Firestore, `/expenses/${user}`);
    let operatingMonthList: monthYear_t[] = [];

    getDoc(expensesCollectionRef)
      .then((result) => {
        const data = result.data();
        if (data) {
          if (data.months.length !== 0 && data.months) {
            let tempMonthsList = [...data.months];
            operatingMonthList = [];
            for (let tempMonthYear of tempMonthsList) {
              if (
                tempMonthYear.month === monthYear.month &&
                tempMonthYear.year === monthYear.year
              ) {
                operatingMonthList.push(monthYear);
              } else {
                operatingMonthList.push(tempMonthYear);
              }
            }
            updateDoc(expensesCollectionRef, {
              months: operatingMonthList,
            });
          } else {
            updateDoc(expensesCollectionRef, {
              months: [monthYear],
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DBContext.Provider
      value={{
        getBudget,
        getExpenses,
        updateCurrentBudget,
      }}
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