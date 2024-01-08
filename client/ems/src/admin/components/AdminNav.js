import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

export default function AdminNav() {
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [showStaffOptions, setShowStaffOptions] = useState(false);

  const toggleDepartmentOptions = () => {
    setShowDepartmentOptions(!showDepartmentOptions);
    setShowStaffOptions(false); // Hide other dropdowns when this one is active
  };

  const toggleStaffOptions = () => {
    setShowStaffOptions(!showStaffOptions);
    setShowDepartmentOptions(false); // Hide other dropdowns when this one is active
  };
  return (
    <>
      <div className="navbar-left">
        <ul className="main-ul">
          <li className="li-option">
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <hr />
          <li className="li-option" onClick={toggleDepartmentOptions}>
            Department
          </li>
          {showDepartmentOptions && (
            <ul className="dropdown">
              <hr className="drop-hr" />
              <li className="drop-option">
                <Link to="/admin-add-department">Add Department</Link>
              </li>
              <li className="drop-option">
                <Link to="/admin-manage-department">Manage Department</Link>
              </li>
            </ul>
          )}
          <hr />
          <li className="li-option" onClick={toggleStaffOptions}>
            Staff
          </li>
          {showStaffOptions && (
            <ul className="dropdown">
              <hr className="drop-hr" />
              <li className="drop-option">
                <Link to="/admin-add-staff">Add Staff</Link>
              </li>
              <li className="drop-option">
                <Link to="/admin-manage-staff">Manage Staff</Link>
              </li>
              {/* Add more staff options here */}
            </ul>
          )}
          <hr />
          <li className="li-option">
            <Link to="#">Salary</Link>
          </li>
          <hr />
          <li className="li-option">
            <Link to="#">Leave</Link>
          </li>
          <hr />
          <li className="logout li-option">
            <Link to="#">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
