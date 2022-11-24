import React from "react";
import { DB } from "../lib/Firebase/DBContext";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  // const expenses = [
  //   { id: 12, name: "shopping", cost: 40 },
  //   { id: 13, name: "holiday", cost: 400 },
  //   { id: 14, name: "car service", cost: 50 },
  // ];

  const { expenses } = DB();

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem
          id={expense.id}
          name={expense.name}
          cost={expense.cost}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
