import { Timestamp } from "firebase/firestore";
import React from "react";
import { TiDelete } from "react-icons/ti";

interface props {
  id: string;
  name: string;
  cost: number;
  date: Timestamp;
}

const ExpenseItem = (props: props) => {
  const date = props.date.toDate().toDateString();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}
      <div>
        <span className="badge badge-primary badge-pill mr-3 text-dark">
          {date}
        </span>
        <span className="badge badge-primary badge-pill mr-3 text-dark">
          ₹{props.cost}
        </span>
        <TiDelete size="1.5em"></TiDelete>
      </div>
    </li>
  );
};

export default ExpenseItem;
