import React, { useState, useEffect } from "react";
import EmpNav from "../components/EmpNav";
import EmpNavbar from "../components/EmpNavbar";
import "../styles/EmpProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmpProfile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const empId = localStorage.getItem("empId");
  useEffect(() => {
    if (!name === "") navigate("emp-signin");
  }, [name, navigate]);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/getStaffDetails/${empId}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(`ERROR : ${err}`);
      });
  }, [empId]);

  return (
    <div>
      <EmpNavbar />
      <EmpNav />
      <div className="main-container ">
        <div className="prodile-container">
          <div className="profile-content">
            <h3>Welcome, {name}</h3>
            <div className="profile-details">
              <p className="emp-de">
                <strong>Employee ID:</strong> {userData.empId}
              </p>
              <p className="emp-de">
                <strong>Department:</strong> {userData.department}
              </p>
              <p className="emp-de">
                <strong>Position:</strong> {userData.position}
              </p>
              <p className="emp-de">
                <strong>Date of Birth:</strong> {userData.dob}
              </p>
              <p className="emp-de">
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p className="emp-de">
                <strong>Email:</strong> {userData.mail}
              </p>
              <p className="emp-de">
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p className="emp-de">
                <strong>Address:</strong> {userData.address}
              </p>
              <p className="emp-de">
                <strong>Hire Date:</strong> {userData.hireDate}
              </p>
              <p className="emp-de">
                <strong>Salary:</strong> {userData.salary}
              </p>
              <p className="emp-de">
                <strong>Bonus:</strong> {userData.bonus || "N/A"}
              </p>
              <p className="emp-de">
                <strong>Pay Method:</strong> {userData.payMethod}
              </p>
              <p className="emp-de">
                <strong>Manager ID:</strong> {userData.managerID}
              </p>
              <p className="emp-de">
                <strong>Status:</strong> {userData.status}
              </p>
              <p className="emp-de">
                <strong>Emergency Contact:</strong> {userData.emergencyNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
