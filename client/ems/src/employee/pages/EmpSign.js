import React, { useState, useRef } from "react";
import "../styles/EmpSign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmpSign() {
  const navigate = useNavigate();

  const rId = useRef();
  const rPassword = useRef();
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const hEmpId = (e) => {
    setEmpId(e.target.value);
  };
  const hPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empIdRegex = /^[a-zA-Z0-9_-]+$/;
    if (empId === "" || password === "") {
      alert("Id and password cannot be empty");
      if (empId === "") rId.current.focus();
      else rPassword.current.focus();
      return;
    }
    if (empId.includes(" ")) {
      alert("Invalid ID format. Spaces not allowed in ID.");
      return;
    }
    if (!empIdRegex.test(empId)) {
      alert("Invalid ID format.");
      return;
    }
    const url = "http://localhost:9000/login/employee";
    axios
      .post(url, { empId, password })
      .then((res) => {
        if (res.data.message === "Login successful") {
          const { fName, lName, empId, department} = res.data.user;
          localStorage.setItem("name", `${fName} ${lName}`);
          localStorage.setItem("empId", `${empId}`);
          localStorage.setItem("department", `${department}`);
          navigate("/emp-dashboard");
        } else {
          // alert("Invalid credentials. Please try again.");
          if (res.data.message === 'Invalid credentials'){
            alert('Invalid UserID or Password');
            setPassword('');
            rPassword.current.focus();
            return;
          }
          alert(`${res.data.message}`);
          setEmpId("");
          setPassword("");
          rId.current.focus();
        }
      })
      .catch((err) => {
        console.log("An error has occurred.\nError Description: " + err);
        alert("Server not reachable. Please try again later.");
      });
  };
  

  function getGreetingMessage() {
    const currentTime = new Date().getHours();
    let greeting = "";
    if (currentTime < 12) {
      greeting = "Good Morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    return greeting;
  }

  return (
    <>
      <div className="signin-wrapper">
        <div className="container">
          <div className="login-box">
            <h2 className="sign-title">{getGreetingMessage()}</h2>
            <div className="instruct">
              <p>Please login and continue</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  id="empId"
                  ref={rId}
                  onChange={hEmpId}
                  value={empId}
                  className={empId ? "valid" : ""}
                />
                <label htmlFor="empId" className={empId ? "valid-label" : ""}>
                  Id
                </label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  ref={rPassword}
                  onChange={hPassword}
                  value={password}
                  className={password ? "valid" : ""}
                />
                <label
                  htmlFor="password"
                  className={password ? "valid-label" : ""}
                >
                  Password
                </label>
              </div>
              <button type="submit" className="btn">
                Continue
              </button>
            </form>
          </div>
          <div className="animation-spans">
            {[...Array(50)].map((_, index) => (
              <span key={index} style={{ "--i": index }}></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
