import axios from "axios";
import EmpNav from "../components/EmpNav";
import EmpNavbar from "../components/EmpNavbar";
import "../styles/ApplyLeave.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const name = localStorage.getItem("name");
  const empId = localStorage.getItem("empId");
  const department = localStorage.getItem("department");
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const rReason = useRef();
  const rFrom = useRef();

  const hReason = (event) => {
    setReason(event.target.value);
  };
  const hFrom = (event) => {
    setFrom(event.target.value);
  };
  const hTo = (event) => {
    setTo(event.target.value);
  };
  const hDescription = (event) => {
    setDescription(event.target.value);
  };

  const navigate = useNavigate();
  const handleViewLeave = () => {
    navigate("/view-leave");
  };

  const applyLeave = (event) => {
    event.preventDefault();
    if (!reason || !from || !to || description === "") {
      alert("Please fill all the fields!");
    } else if (new Date(from).getTime() > new Date(to).getTime()) {
      alert("Invalid date range! From date should be less than To date.");
      setFrom("");
      setTo("");
      rFrom.current.focus();
    } else {
      let leaveData = {
        reason: reason,
        from: from,
        to: to,
        description: description,
        empId: empId,
        name: name,
        status: 'Processing',
        appliedOn : new Date(),
        department : department,
      };
      const url = 'http://localhost:9000/apply-leave';
      axios.post(url, leaveData)
      .then((res) => {
        alert('Leave Applied');
        setReason('');
        setFrom('');
        setTo('');
        setDescription('');
        navigate('/view-leave');
      })
      .catch((err) =>{
        console.log('ERROR OCCURED : ' + err);
      })
    }
  };

  return (
    <>
      <EmpNavbar />
      <EmpNav />
      <div className="main-container">
        <p className="category-title new-title">Leave Management</p>
        <div className="form-container leave-container">
          <form onSubmit={applyLeave}>
            <p className="form-title">Apply Leave</p>
            <div className="per-info">
              <div className="col-1">
                <label>Reason</label>
                <input
                  type="text"
                  name="reason"
                  placeholder="Enter Reason"
                  value={reason}
                  onChange={hReason}
                  ref={rReason}
                  required
                />
                <label>Leave To</label>
                <input
                  type="date"
                  name="leaveTo"
                  value={to}
                  onChange={hTo}
                  required
                />
              </div>
              <div className="col-2">
                <label>Leave From</label>
                <input
                  type="date"
                  name="leaveFrom"
                  value={from}
                  onChange={hFrom}
                  ref={rFrom}
                  required
                />
                <label>Description</label>
                <textarea
                  className="leave-desc"
                  value={description}
                  onChange={hDescription}
                  // required
                ></textarea>
                <button type="submit" className="submit-btn apply-btn">
                  Apply
                </button>
                <button
                  className="submit-btn view-btn"
                  onClick={handleViewLeave}
                >
                  View Leave
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
