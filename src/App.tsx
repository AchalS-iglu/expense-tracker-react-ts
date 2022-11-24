import React, { useEffect, useState } from "react";
import "./App.css";

import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";

import { UserAuth } from "./lib/Firebase/AuthContext";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import BudgetBar from "./components/BudgetBar";
import { DB } from "./lib/Firebase/DBContext";

const App = () => {
  const { user } = UserAuth();
  const { getExpenses, getUserData, budget } = DB();

  const [total, setTotal] = useState<number>(0);
  const [rem, setRem] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    if (user) {
      getUserData("user");
      const today = new Date();

      setMonth(today.getMonth() + 1);
      setYear(today.getFullYear());

      getExpenses(today.getMonth() + 1, today.getFullYear());
      setTotal(1000);
      setRem(budget - total);
    }
  }, [user]);

  useEffect(() => {
    console.log(month);
    try {
      getExpenses(month, year);
      setTotal(1000);
      setRem(budget - total);
    } catch (error) {
      console.log(error);
      const today = new Date();

      setMonth(today.getMonth() + 1);
      setYear(today.getFullYear());

      getExpenses(today.getMonth() + 1, today.getFullYear());
      setTotal(1000);
      setRem(budget - total);
    }
  }, [month]);

  if (!user)
    return (
      <div>
        <SignIn />
      </div>
    );

  return (
    <div>
      <div className="container">
        <NavBar year={year} setYear={setYear} setMonth={setMonth} />
        <div className="container">
          <div className="row mt-3 gap-2">
            <div className="col-sm rounded border border-primary border border-info">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Month</li>
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
          <BudgetBar budget={budget} total={total} rem={rem} />
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
