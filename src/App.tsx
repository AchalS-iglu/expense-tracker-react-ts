import React, { useEffect, useState } from "react";
import "./App.css";

import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";

import { UserAuth } from "./lib/Firebase/AuthContext";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import BudgetBar from "./components/BudgetBar";
import { DB } from "./lib/Firebase/DBContext";
import { State } from "./lib/States";
import { expense_t, monthYearActionKind } from "./lib/reusables";

const App = () => {
  const { user, loading } = UserAuth();
  const { getExpenses, getBudget, addExpense } = DB();
  const { monthYear, dispatchMonthYear, expenses, dispatchExpenses } = State();

  const getTotal = (expenses: expense_t[]) => {
    let total = expenses.map((expense) => expense.cost);
    return total.reduce((a, b) => Number(a) + Number(b), 0);
  };

  const [total, setTotal] = useState<number>(getTotal(expenses));

  useEffect(() => { 
    let isCancelled = false;
    if (user) {
      let total = getTotal(expenses);
      if (!isCancelled) {
        setTotal(total);
      }

      getBudget(user.uid, monthYear, dispatchMonthYear, {
        current: isCancelled,
      });
    }

    return () => {
      isCancelled = true;
    };
  });

  useEffect(() => {
    let isCancelled = false;
    if (user) {
      let total = getTotal(expenses);
      if (!isCancelled) {
        setTotal(total);
      }

      getBudget(user.uid, monthYear, dispatchMonthYear, {
        current: isCancelled,
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [expenses]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      try {
        if (
          monthYear.month !== 0 &&
          monthYear.year !== 0 &&
          user?.uid &&
          !isCancelled
        ) {
          getBudget(user.uid, monthYear, dispatchMonthYear, {
            current: isCancelled,
          });
          getExpenses(user.uid, monthYear, dispatchExpenses, {
            current: isCancelled,
          });
        } else if (user?.uid && !loading && !isCancelled) {
          const today = new Date();

          dispatchMonthYear({
            type: monthYearActionKind.SET_MONTH,
            payload: today.getMonth() + 1,
          });

          dispatchMonthYear({
            type: monthYearActionKind.SET_YEAR,
            payload: today.getFullYear(),
          });

          getBudget(user.uid, monthYear, dispatchMonthYear, {
            current: isCancelled,
          });

          dispatchMonthYear({
            type: monthYearActionKind.SET_BUDGET,
            payload: monthYear.budget,
          });

          getExpenses(user.uid, monthYear, dispatchExpenses, {
            current: isCancelled,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [monthYear.year, monthYear.month]);

  if (!user)
    return (
      <div>
        <SignIn />
      </div>
    );

  return (
    <div>
      <div className="container">
        <NavBar />
        <div className="container">
          <div className="row mt-3 gap-2">
            <div className="col-sm rounded border border-primary border border-info">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Month Selected: {monthYear.month}-{monthYear.year}
                </li>
              </ul>
            </div>
            <div className="col-sm rounded border border-primary border border-info">
              <ul className="list-group list-group-flush text-end">
                <li className="list-group-item">
                  Logged in as: {user?.displayName}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <h1 className="mt-3">My Budget Planner</h1> */}
        <>
          <div>
            <BudgetBar userID={user.uid} monthYear={monthYear} total={total} />
          </div>
          <h3 className="mt-3">Expenses</h3>
          <div className="row mt-3">
            <div className="col-sm">
              <ExpenseList expenses={expenses} />
            </div>
          </div>
          <h3 className="mt-3">Add Expense</h3>
          <div className="row mt-3">
            <div className="col-sm">
              <AddExpenseForm
                userID={user.uid}
                dispatchExpenses={dispatchExpenses}
                addExpense={addExpense}
                currentMonthYear={monthYear}
                getExpenses={getExpenses}
              />
            </div>
          </div>
        </>
        <br/>
      </div>
    </div>
  );
};

export default App;
