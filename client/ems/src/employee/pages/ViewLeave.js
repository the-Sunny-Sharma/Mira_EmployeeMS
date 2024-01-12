import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/ApplyLeave.css";
import EmpNav from "../components/EmpNav";
import EmpNavbar from "../components/EmpNavbar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ViewLeave() {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const empId = localStorage.getItem("empId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/viewLeave?empId=${empId}`
        );
        const sortedData = response.data.sort(
          (a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)
        );
        setLeaveData(sortedData);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchData();
  }, [empId]);

  return (
    <>
      <EmpNavbar />
      <EmpNav />
      <div className="main-container">
        <p className="category-title new-title">Leave Management</p>
        <button
          className="submit-btn view-btn view-back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div class="st_viewport department-list leave-list">
          <div class="st_wrap_table">
            <header class="st_table_header">
              <h2 className="head-table">View Leave</h2>
              <div class="st_row flex-row">
                <div class="st_column _rank">Sr. No.</div>
                <div class="st_column _name">Reason</div>
                <div class="st_column _name">From</div>
                <div class="st_column _name">To</div>
                <div class="st_column _name">Status</div>
                <div class="st_column _description">Description</div>
                <div class="st_column _name">Applied On</div>
              </div>
            </header>
            {leaveData.map((leave, index) => (
              <div class="st_row flex-row new-row">
                <div class="st_column _rank">{index + 1}</div>
                <div class="st_column _name">{leave.reason}</div>
                <div class="st_column _name">
                  {format(new Date(leave.from), "dd/MM/yyyy")}
                </div>
                <div class="st_column _name">
                  {format(new Date(leave.to), "dd/MM/yyyy")}
                </div>
                <div class="st_column _name">
                  {/* <div className="edit-button status-btn rejected"> */}
                  <div
                    className={`edit-button status-btn ${
                      leave.status ? leave.status.toLowerCase() : ""
                    }`}
                  >
                    {leave.status}
                  </div>
                </div>
                <div class="st_column _description">{leave.description}</div>
                <div className="st_column _name">
                  {format(new Date(leave.appliedOn), "dd/MM/yyyy")}
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
