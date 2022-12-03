import { Timestamp } from "firebase/firestore";
import React, { Component } from "react";
import {
  expensesAction,
  expense_t,
  generateUUID,
  monthYear_t,
} from "../lib/reusables";

interface expenseForm_t {
  name: string;
  cost: number;
  date: string;
  importText: string;
  loadingImports: boolean;
}

interface props {
  addExpense: (
    userID: string,
    expense: expense_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    selectedMonthYear: monthYear_t
  ) => void;
  dispatchExpenses: React.Dispatch<expensesAction>;
  userID: string;
  currentMonthYear: monthYear_t;
  getExpenses: (
    userID: string,
    monthYear: monthYear_t,
    dispatchExpenses: React.Dispatch<expensesAction>,
    cancelled: React.MutableRefObject<boolean>
  ) => void;
}
export class AddExpenseForm extends Component<props, expenseForm_t> {
  constructor(props: props) {
    super(props);
    this.state = {
      name: "",
      cost: 0,
      date: "",
      importText: "",
      loadingImports: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
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
    this.props.addExpense(
      this.props.userID,
      expense,
      this.props.dispatchExpenses,
      this.props.currentMonthYear
    );
    this.setState({
      name: "",
      cost: 0,
      date: "",
    });
    this.props.getExpenses(
      this.props.userID,
      this.props.currentMonthYear,
      this.props.dispatchExpenses,
      {
        current: false,
      }
    );
  }

  handleImport() {
    this.setState({
      ...this.state,
      loadingImports: true,
    });

    function isDate(dateStr: string) {
      return !isNaN(new Date(dateStr).getDate());
    }

    const lines = this.state.importText.split("\n");
    let budget = 0;
    let date = "";

    for (let line of lines) {
      let lineData = line.trim().split(" ");

      try {
        let temp =
          lineData[0].substring(0, lineData[0].length - 2) +
          " " +
          lineData[1].toLowerCase() +
          ", 2022";
        if (isDate(temp)) {
          date = temp;
        }
      } catch {}

      if (lineData[0][0] === "+") {
        budget += Number(lineData[0].slice(1));
      } else if (lineData[0][0] === "-") {
        const expense: expense_t = {
          id: generateUUID(),
          name: lineData.slice(1).join(" "),
          cost: Number(lineData[0].slice(1)),
          date: Timestamp.fromDate(new Date(date)),
        };
        this.props.addExpense(
          this.props.userID,
          expense,
          this.props.dispatchExpenses,
          this.props.currentMonthYear
        );
      }
    }
    console.log(budget);

    this.props.getExpenses(
      this.props.userID,
      this.props.currentMonthYear,
      this.props.dispatchExpenses,
      {
        current: false,
      }
    );
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
              type="number"
              pattern="[0-9]"
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
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#importForm"
              data-bs-keyboard="false"
            >
              Import from txt {"(iglu specific)"}
            </button>
          </div>
        </div>
        <div
          className="modal fade"
          id="importForm"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Import from text
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {this.state.loadingImports ? (
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      Kindly input the text to be parsed
                    </div>
                    <textarea
                      // type="text"
                      className="form-control"
                      id="importText"
                      value={this.state.importText}
                      onChange={this.handleInputChange}
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleImport}
                  data-bs-dismiss="modal"
                >
                  Import
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
