import React from "react";
import { UserAuth } from "../lib/Firebase/AuthContext";

const NavBar = () => {
  const { logOut } = UserAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          My Budget Planner
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" role="button">
              Month
            </span>
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
