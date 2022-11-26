import { Timestamp } from "firebase/firestore";
import React, { Component } from "react";
import { expensesAction, expense_t, generateUUID } from "../lib/reusables";

interface expenseForm_t {
  name: string;
  cost: number;
  date: string;
}
export class AddExpenseForm extends Component<
  {
    addExpense: (
      expense: expense_t,
      dispatchExpenses: React.Dispatch<expensesAction>
    ) => void;
    dispatchExpenses: React.Dispatch<expensesAction>;
  },
  expenseForm_t
> {
  constructor(props: {
    addExpense: (
      expense: expense_t,
      dispatchExpenses: React.Dispatch<expensesAction>
    ) => void;
    dispatchExpenses: React.Dispatch<expensesAction>;
  }) {
    super(props);
    this.state = {
      name: "",
      cost: 0,
      date: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expense: expense_t = {
      id: generateUUID(),
      name: this.state.name,
      cost: this.state.cost,
      date: Timestamp.fromDate(new Date(this.state.date)),
    };
    this.props.addExpense(expense, this.props.dispatchExpenses);
    this.setState({
      name: "",
      cost: 0,
      date: "",
    });
  }

  handleImport(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log("import form open");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-sm">
            <label htmlFor="name">Name</label>
            <input
              required={true}
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="col-sm">
            <label htmlFor="cost">Cost</label>
            <input
              required={true}
              type="text"
              className="form-control"
              id="cost"
              value={this.state.cost}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="col-sm">
            <label htmlFor="date">Date</label>
            <input
              required={true}
              type="date"
              className="form-control"
              id="date"
              value={this.state.date}
              onChange={this.handleInputChange}
            ></input>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-auto me-auto">
            <button type="submit" className="btn btn-primary mt-3">
              Save
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-warning mt-3"
              id="importFormOpen"
              data-bs-toggle="modal"
              data-bs-target="#importForm"
            >
              Import from txt {"(iglu specific)"}
            </button>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddExpenseForm;
