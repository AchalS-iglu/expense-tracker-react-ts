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
import { monthYearActionKind } from "./lib/reusables";

const App = () => {
  const { user } = UserAuth();
  const { getExpenses, getBudget } = DB();
  const { monthYear, dispatchMonthYear, expenses, dispatchExpenses } = State();
  const [totalSpent, setTotalSpent] = useState<number>(0);

  const getTotalSpent = () => {
    let total = 0;
    for (let expense of expenses) {
      total += expense.cost;
    }
    setTotalSpent(total);
  };

  useEffect(() => {
    getTotalSpent();
    console.log(expenses)
  });

  useEffect(() => {
    if (user) {
      const today = new Date();

      dispatchMonthYear({
        type: monthYearActionKind.SET_MONTH,
        payload: today.getMonth() + 1,
      });

      dispatchMonthYear({
        type: monthYearActionKind.SET_YEAR,
        payload: today.getFullYear(),
      });

      getBudget("user", monthYear, dispatchMonthYear);

      dispatchMonthYear({
        type: monthYearActionKind.SET_BUDGET,
        payload: monthYear.budget,
      });

      getExpenses(monthYear, dispatchExpenses);
      getTotalSpent();
    }
  }, [user?.uid]);

  useEffect(() => {
    try {
      getBudget("user", monthYear, dispatchMonthYear);
      getExpenses(monthYear, dispatchExpenses);
      getTotalSpent();
    } catch (error) {
      console.log(error);
    }
  }, [monthYear.month, monthYear.year]);

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
        <div>
          <BudgetBar monthYear={monthYear} total={totalSpent} />
        </div>
        <h3 className="mt-3">Expenses</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>
        <h3 className="mt-3">Add Expense</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
