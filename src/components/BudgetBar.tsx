import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import $ from "jquery";
import { DB } from "../lib/Firebase/DBContext";
import { monthYear_t } from "../lib/reusables";
import { State } from "../lib/States";

interface props {
  monthYear: monthYear_t;
  total: number;
  userID: string
}

const BudgetBar = (props: props) => {
  const { dispatchMonthYear } = State();
  const { updateCurrentBudget } = DB();

  const [editBudget, setEditBudget] = useState<boolean>(false);
  const [placeholderBudget, setPlaceholderBudget] = useState<number>(
    props.monthYear.budget
  );

  useEffect(() => {
    if (editBudget) {
      (document.getElementById("budgetForm") as HTMLInputElement).focus();
    }
  }, [editBudget]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCurrentBudget(
      props.userID,
      {
        ...props.monthYear,
        budget: placeholderBudget,
      },
      dispatchMonthYear
    );
    setEditBudget(false);
  };

  return (
    <section>
      <div className="row mt-3 p-2">
        <div className="col-sm alert alert-secondary m-1 d-flex justify-content-between align-items-center">
          {!editBudget ? (
            <span>Budget: {props.monthYear.budget}</span>
          ) : (
            <form
              onSubmit={onSubmit}
              className="d-flex justify-content-between align-items-center"
            >
              Budget:
              <input
                type="number"
                className="form-control editField"
                id="budgetForm"
                onChange={(e) => {
                  setPlaceholderBudget(Number(e.target.value));
                }}
                // placeholder={placeholderBudget.toString()}
                value={placeholderBudget}
              />
            </form>
          )}
          {/* <span>Budget: {props.budget}</span> */}
          <MdEdit
            onClick={() => {
              setPlaceholderBudget(props.monthYear.budget);
              setEditBudget((prev) => {
                return !prev;
              });
            }}
            size="1.2em"
          ></MdEdit>
        </div>
        <div className="col-sm alert alert-success  m-1">
          <span>Remaining: {props.monthYear.budget - props.total}</span>
        </div>
        <div className="col-sm alert alert-primary  m-1">
          <span>Spent so far: {props.total}</span>
        </div>
      </div>
    </section>
  );
};

export default BudgetBar;
