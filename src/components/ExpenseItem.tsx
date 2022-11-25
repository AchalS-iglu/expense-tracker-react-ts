import { Timestamp } from "firebase/firestore";
import React from "react";
import { TiDelete } from "react-icons/ti";
import { expensesActionKind, expense_t } from "../lib/reusables";
import { State } from "../lib/States";

interface props {
  expense: expense_t;
}

const ExpenseItem = (props: props) => {
  const date = props.expense.date.toDate().toDateString();

  const { dispatchExpenses } = State();

  const handleDelete = () => {
    dispatchExpenses({
      type: expensesActionKind.REMOVE_EXPENSE,
      payload: props.expense,
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.expense.name}
      <div>
        <span className="badge badge-primary badge-pill mr-3 text-dark">
          {date}
        </span>
        <span className="badge badge-primary badge-pill mr-3 text-dark">
          ₹{props.expense.cost}
        </span>
        <TiDelete
          size="1.5em"
          onClick={() => {
            handleDelete();
          }}
        ></TiDelete>
      </div>
    </li>
  );
};

export default ExpenseItem;
