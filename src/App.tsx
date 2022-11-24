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
  const { getExpenses, getBudget, budget, setBudget } = DB();
  const { monthYear, dispatchMonthYear } = State();

  const [totalSpent, setTotalSpent] = useState<number>(0);
  // const [month, setMonth] = useState<number>(0);
  // const [year, setYear] = useState<number>(0);

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

      getBudget("user", monthYear);

      dispatchMonthYear({
        type: monthYearActionKind.SET_BUDGET,
        payload: budget,
      });

      getExpenses(monthYear);
      setTotalSpent(1000);
    }
  }, [user]);

  useEffect(() => {
    try {
      getBudget("user", monthYear);
      getExpenses(monthYear);
      setTotalSpent(1000);
    } catch (error) {
      console.log(error);
    }
  }, [monthYear]);

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
          <BudgetBar
            budget={budget}
            total={totalSpent}
            rem={budget - totalSpent}
          />
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
