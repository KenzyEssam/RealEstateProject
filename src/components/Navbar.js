import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="sidebar-header">
        <h2>الرواد العقاريون</h2>
      </div>
      <div className="navbar-icons">
        <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
        <FontAwesomeIcon icon={faUser} className="navbar-icon" title="User Profile" />
        <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" title="Logout" />
      </div>
    </nav>
  );
}

export default Navbar;
