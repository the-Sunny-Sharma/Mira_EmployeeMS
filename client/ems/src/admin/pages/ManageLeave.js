import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AdminNavbar from "../components/AdminNavbar";
import AdminNav from "../components/AdminNav";

export default function ManageLeave() {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/leaveData`);
        const sortedData = response.data.sort(
          (a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)
        );
        setLeaveData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminNav />
      <div className="main-container">
        <p className="category-title new-title">Leave Management</p>
        <button
          className="submit-btn view-btn view-back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="st_viewport department-list leave-list">
          <div className="st_wrap_table">
            <header className="st_table_header">
              <h2 className="head-table">View Leave</h2>
              <div className="st_row flex-row">
                <div className="st_column _name">Sr. No.</div>
                <div className="st_column _name">Staff</div>
                <div className="st_column _name">Department</div>
                <div className="st_column _name">Reason</div>
                <div className="st_column _name">From</div>
                <div className="st_column _name">To</div>
                <div className="st_column _name">Description</div>
                <div className="st_column _name">Applied On</div>
                <div className="st_column _name">Actions</div>
              </div>
            </header>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              leaveData.map((leave, index) => (
                <div className="st_row flex-row new-row" key={index}>
                  <div className="st_column _name">{index + 1}</div>
                  <div className="st_column _name">{leave.name}</div>
                  <div className="st_column _name">{leave.department}</div>
                  <div className="st_column _name">{leave.reason}</div>
                  <div className="st_column _name">
                    {format(new Date(leave.from), "dd/MM/yyyy")}
                  </div>
                  <div className="st_column _name">
                    {format(new Date(leave.to), "dd/MM/yyyy")}
                  </div>
                  <div className="st_column _name">{leave.description}</div>
                  <div className="st_column _name">
                    {format(new Date(leave.appliedOn), "dd/MM/yyyy")}
                  </div>
                  <div className="st_column _name">
                    <button>Approve</button>
                    <button>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
