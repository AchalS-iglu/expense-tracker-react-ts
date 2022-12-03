import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
  expense_t,
} from "../reusables";
interface IContext {
  getExpenses: (
    userID: string,
    monthYear: monthYear_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    cancelled: React.MutableRefObject<boolean>
  ) => void;
  addExpense: (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    selectedMonthYear: monthYear_t
  ) => void;
  updateExpense: (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => void;
  delExpense: (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => void;
  getBudget: (
    userID: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>,
    cancelled: React.MutableRefObject<boolean>
  ) => void;
  updateCurrentBudget: (
    userID: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => void;
}

const DBContext = createContext<IContext>({
  getExpenses: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  delExpense: () => {},
  getBudget: () => {},
  updateCurrentBudget: () => {},
});

const DBContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getExpenses = (
    userID: string,
    monthYear: monthYear_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    cancelled: {
      current: boolean;
    }
  ) => {
    let month = monthYear.month;
    let year = monthYear.year;

    const expensesCollectionRef = collection(
      Firestore,
      `/expenses/${userID}/expenses/`
    );

    const s_d = new Date(`${year.toString()}-${month.toString()}-01`);
    const e_d = new Date(s_d);
    e_d.setMonth(s_d.getMonth() + 1);

    const s_dt = new Timestamp(s_d.getTime() / 1000, 0);
    const e_dt = new Timestamp(e_d.getTime() / 1000, 0);

    const q = query(
      expensesCollectionRef,
      where("date", ">=", s_dt),
      where("date", "<", e_dt)
    );
    getDocs(q)
      .then((result) => {
        const r_expenses = result.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          cost: doc.data().cost,
          date: doc.data().date,
        }));
        if (!cancelled.current) {
          dispatchExpenses({
            type: expensesActionKind.CLEAR_LIST,
            payload: {
              id: "",
              name: "",
              cost: 0,
              date: Timestamp.fromDate(new Date()),
            },
          });
          for (let expense of r_expenses) {
            dispatchExpenses({
              type: expensesActionKind.ADD_EXPENSE,
              payload: expense,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addExpense = (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    selectedMonthYear: monthYear_t
  ) => {
    const expensesCollectionRef = collection(
      Firestore,
      `/expenses/${userID}/expenses/`
    );
    addDoc(expensesCollectionRef, expense)
      .then(() => {
        if (
          expense.date.toDate().getMonth() === selectedMonthYear.month &&
          expense.date.toDate().getFullYear() === selectedMonthYear.year
        ) {
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

  const updateExpense = (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => {
    const expenseRef = doc(
      Firestore,
      `/expenses/${userID}/expenses/`,
      expense.id
    );
    updateDoc(expenseRef, {
      name: expense.name,
      cost: expense.cost,
      date: expense.date,
    })
      .then(() => {
        dispatchExpenses({
          type: expensesActionKind.UPDATE_EXPENSE,
          payload: expense,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const delExpense = (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>
  ) => {
    const expenseRef = doc(
      Firestore,
      `/expenses/${userID}/expenses/${expense.id}`
    );
    deleteDoc(expenseRef)
      .then(() => {
        dispatchExpenses({
          type: expensesActionKind.REMOVE_EXPENSE,
          payload: expense,
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const getBudget = (
    userID: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>,
    cancelled: {
      current: boolean;
    }
  ) => {
    const expensesCollectionRef = doc(Firestore, `/expenses/${userID}`);

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
              if (!cancelled.current) {
                dispatchMonthYear({
                  type: monthYearActionKind.SET_BUDGET,
                  payload: tempMonthYear.budget,
                });
              }
              finished = true;
            }
          }
          if (!finished) {
            if (data.def_budget) {
              if (!cancelled.current) {
                dispatchMonthYear({
                  type: monthYearActionKind.SET_BUDGET,
                  payload: data.def_budget,
                });
              }
            } else {
              if (!cancelled.current) {
                dispatchMonthYear({
                  type: monthYearActionKind.SET_BUDGET,
                  payload: 5000,
                });
              }
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCurrentBudget = async (
    userID: string,
    monthYear: monthYear_t,
    dispatchMonthYear: React.Dispatch<monthYearAction>
  ) => {
    dispatchMonthYear({
      type: monthYearActionKind.SET_BUDGET,
      payload: monthYear.budget,
    });

    const expensesCollectionRef = doc(Firestore, `/expenses/${userID}`);
    let operatingMonthList: monthYear_t[] = [];

    getDoc(expensesCollectionRef)
      .then((result) => {
        const data = result.data();
        console.log(data);
        if (data) {
          if (data?.months.length !== 0 && data?.months) {
            let tempMonthsList = [...data.months];
            operatingMonthList = [];
            let pushed = false;
            for (let tempMonthYear of tempMonthsList) {
              console.log(tempMonthYear);
              if (
                tempMonthYear.month === monthYear.month &&
                tempMonthYear.year === monthYear.year
              ) {
                operatingMonthList.push(monthYear);
                pushed = true;
                break;
              } else {
                operatingMonthList.push(tempMonthYear);
              }
            }
            if (!pushed) {
              operatingMonthList.push(monthYear);
            }
            updateDoc(expensesCollectionRef, {
              months: operatingMonthList,
            });
          }
        } else {
          console.log("test1");

          setDoc(expensesCollectionRef, {
            months: [monthYear],
          });
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
        addExpense,
        updateExpense,
        delExpense,
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
