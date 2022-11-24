import React, { useState } from "react";

interface props {
  year: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

const MonthSelector = (props: props) => {
  const changeMonth = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    month: number
  ) => {
    e.preventDefault();
    console.log(month);
    props.setMonth(month);
    return undefined;
  };
  return (
    <div className="container p-2 align-items-center">
      <div>
        <button className="btn subyear" style={{ width: "25%" }}>
          {"<"}
        </button>
        <span className="btn year" style={{ width: "50%" }}>
          {props.year}
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
              onClick={(e) => changeMonth(e, 1)}
            >
              January
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 2)}
            >
              February
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 3)}
            >
              March
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 4)}
            >
              April
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 5)}
            >
              May
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 6)}
            >
              June
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 7)}
            >
              July
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 8)}
            >
              August
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 9)}
            >
              September
            </button>
          </td>
          <td>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 10)}
            >
              October
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 11)}
            >
              November
            </button>
            <button
              className="btn border-dark m-1 btn-outline month-btn"
              onClick={(e) => changeMonth(e, 12)}
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
