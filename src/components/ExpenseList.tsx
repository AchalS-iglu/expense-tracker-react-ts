import React from "react";
import { State } from "../lib/States";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  // const expenses = [
  //   { id: 12, name: "shopping", cost: 40 },
  //   { id: 13, name: "holiday", cost: 400 },
  //   { id: 14, name: "car service", cost: 50 },
  // ];

  const { expenses } = State();

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem expense={expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
