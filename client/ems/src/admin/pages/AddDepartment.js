import AdminNav from "../components/AdminNav";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminForms.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [updateDName, setUpdateDName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const hDepartmentName = (event) => {
    setDepartmentName(event.target.value);
  };
  const rDepartmentName = useRef("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token !== 'Admin authenticated successfully.')
    {
        alert("Access Denied")
        navigate("/");}
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const departmentNameParam = params.get("name");
    if (departmentNameParam) {
      setDepartmentName(departmentNameParam);
      setUpdateDName(departmentNameParam);
      setIsUpdate(true); // Set the flag to indicate an update
    }
  }, [location.search]);

  const hAddOrUpdateDepartment = async (event) => {
    event.preventDefault();

    if (!departmentName || departmentName.trim() === "") {
      alert("Please enter a department name");
      setDepartmentName("");
      rDepartmentName.current.focus();
      return;
    }

    // Trim extra spaces from the department name
    const trimmedDepartmentName = departmentName.replace(/\s+/g, " ").trim();

    const departmentNameRegex = /^[a-zA-Z&\s]+$/; // Regex to allow only letters and spaces
    if (!departmentNameRegex.test(trimmedDepartmentName)) {
      alert("Department name should only contain letters and spaces");
      return;
    }

    try {
      const existingDepartments = await axios.get(
        "http://localhost:9000/getDepartments"
      );
      const departmentExists = existingDepartments.data.some(
        (existingDepartment) =>
          existingDepartment.departmentName.toLowerCase() ===
          trimmedDepartmentName.toLowerCase()
      );

      if (departmentExists) {
        alert(`Department '${trimmedDepartmentName}' already exists`);
        setDepartmentName("");
        return;
      }

      if (isUpdate) {
        const data = {
          oldDepartmentName: updateDName, // Include the old department name for update
          newDepartmentName: trimmedDepartmentName, // Include the updated department name
        };

        let url = "http://localhost:9000/updateDepartment";
        axios
          .put(url, data)
          .then((res) => {
            alert(
              `Department '${trimmedDepartmentName}' updated successfully!`
            );
            setDepartmentName("");
          })
          .catch((err) => console.log("Issue: " + err));
      } else {
        const dData = {
          departmentName: trimmedDepartmentName,
        };
        const response = await axios.post(
          "http://localhost:9000/addDepartment",
          dData
        );
        alert(`${trimmedDepartmentName} added successfully!`);
        setDepartmentName("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <AdminNavbar />
      <AdminNav />
      <div className="main-container">
        <p className="category-title">Departments</p>
        <div className="form-container">
          <form onSubmit={hAddOrUpdateDepartment}>
            <p className="form-title">Add Department</p>
            <input
              type="text"
              placeholder="Ex. Human Resource"
              className="form-input-text"
              value={departmentName}
              onChange={hDepartmentName}
              ref={rDepartmentName}
            />
            <button type="submit" className="submit-btn">
              {isUpdate ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
