import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";

import { UserAuth } from "./Firebase/AuthContext";

const App = () => {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn;
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                My Budget Planner
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button">
                    Month
                  </span>
                </li>
              </ul>
              <div className="navbar-nav">
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={handleGoogleSignIn}
                >
                  Login
                </button>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row mt-3 gap-2">
              <div className="col-sm rounded border border-primary border border-info">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Month</li>
                </ul>
              </div>
              <div className="col-sm rounded border border-primary border border-info">
                <ul className="list-group list-group-flush text-end">
                  <li className="list-group-item">Logged in as:</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <h1 className="mt-3">My Budget Planner</h1> */}
          <div className="row mt-3">
            <div className="col-sm">
              <Budget />
            </div>
            <div className="col-sm">
              <Remaining />
            </div>
            <div className="col-sm">
              <ExpenseTotal />
            </div>
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
  );
};

export default App;
