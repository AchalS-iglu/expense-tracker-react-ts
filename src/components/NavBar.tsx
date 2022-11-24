import React, { useState } from "react";
import { UserAuth } from "../lib/Firebase/AuthContext";
import MonthSelector from "./MonthSelector";
import $ from "jquery";
interface props {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar = (props: props) => {
  const [DYear, setDYear] = useState(props.year);

  const { logOut } = UserAuth();

  $(".addyear").click(function (e) {
    setDYear(DYear + 1);
    e.stopPropagation();
  });

  $(".subyear").click(function (e) {
    setDYear(DYear - 1);
    e.stopPropagation();
  });

  $(".year").click(function (e) {
    e.stopPropagation();
  });

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          My Budget Planner
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              onClick={(e) => {
                setDYear(props.year);
              }}
            >
              Month
            </span>
            <div className="container text-center dropdown-menu">
              <MonthSelector
                DYear={DYear}
                setMonth={props.setMonth}
                setYear={props.setYear}
              />
            </div>
          </li>
        </ul>
        <div className="navbar-nav">
          <button
            className="btn btn-outline-danger"
            type="submit"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
