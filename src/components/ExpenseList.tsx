import React from "react";
import { expense_t } from "../lib/reusables";
import { State } from "../lib/States";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props: { expenses: expense_t[] }) => {
   // const expenses = [
   //   { id: 12, name: "shopping", cost: 40 },
   //   { id: 13, name: "holiday", cost: 400 },
   //   { id: 14, name: "car service", cost: 50 },
   // ];

   return (
      <ul className="list-group">
         {props.expenses.map((expense) => (
            <ExpenseItem expense={expense} />
         ))}
      </ul>
   );
};

export default ExpenseList;
