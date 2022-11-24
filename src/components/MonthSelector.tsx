import React, { useState } from "react";

interface props {
  DYear: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

const MonthSelector = (props: props) => {
  const changeMonth = (month: number) => {
    props.setMonth(month);
    props.setYear(props.DYear);
    return undefined;
  };

  return (
    <div className="container p-2 align-items-center">
      <div>
        <button className="btn subyear" style={{ width: "25%" }}>
          {"<"}
        </button>
        <span className="btn year" style={{ width: "50%" }}>
          {props.DYear}
        </span>
        <button className="btn addyear" style={{ width: "25%" }}>
          {">"}
        </button>
      </div>
      <table className="vertical-align: middle text-center border-dark">
        <tbody>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(1)}
            >
              January
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(2)}
            >
              February
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(3)}
            >
              March
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(4)}
            >
              April
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(5)}
            >
              May
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(6)}
            >
              June
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(7)}
            >
              July
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(8)}
            >
              August
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(9)}
            >
              September
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(10)}
            >
              October
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(11)}
            >
              November
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(12)}
            >
              December
            </button>
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default MonthSelector;
