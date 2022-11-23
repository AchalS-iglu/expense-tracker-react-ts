import React from "react";

interface props {
  budget: number;
  total: number;
  rem: number;
}

const BudgetBar = (props: props) => {
  return (
    <section>
      <div className="row mt-3 p-2">
        <div className="col-sm alert alert-secondary m-1">
          <span>Budget: {props.budget}</span>
        </div>
        <div className="col-sm alert alert-success  m-1">
          <span>Remaining: {props.rem}</span>
        </div>
        <div className="col-sm alert alert-primary  m-1">
          <span>Spent so far: {props.total}</span>
        </div>
      </div>
    </section>
  );
};

export default BudgetBar;
