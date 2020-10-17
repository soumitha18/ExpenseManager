import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h4 style={{ color: "#0AC76F" }}>EXPENSE MANAGER</h4>
      </Link>
      <div className="sidebarDivItems">
        <ul style={{ listStyle: "none" }}>
          <Link to="/dashboard">
            <li>
              <i className="fas fa-th-large"></i>Dashboard
            </li>
          </Link>
          <Link to="/dashboard/ledger">
            <li>
              <i className="fas fa-copy"></i>Ledger
            </li>
          </Link>
          <li>
            <button onClick={() => props.handleLogout()}>
              <i className="fas fa-sign-out-alt"></i>Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
