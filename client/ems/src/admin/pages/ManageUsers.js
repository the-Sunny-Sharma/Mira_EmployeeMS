import AdminNav from "../components/AdminNav";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/ManageUsers.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const [emplData, setEmpData] = useState({});
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch department names from the database
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/getDepartments"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching Departments:", error);
      }
    };
    fetchDepartments();
    console.log(departments);
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        let urlDepart = `http://localhost:9000/getStaffData`;
        const data = {};
        for (const department of departments) {
          let departmentNamex = department.departmentName;
          const response = await axios.get(urlDepart, {
            params: { departmentNamex },
          });
          data[department.departmentName] = response.data;
        }
        setEmpData(data);
      } catch (error) {
        console.error("Error fetching Employee Data:", error);
      }
    };

    if (departments.length > 0) {
      fetchEmployeeData();
    }
  }, [departments]);

  const handleEditUser = (empId) => {
    // console.log(empId)
    navigate(`/admin-add-staff?empId=${empId}`);
  };

  const handleDeleteUser = async (empId) => {
    const confirmation = window.confirm("Are you sure you want to delete " + empId + "?");

    if (!confirmation) {
      return; // User clicked "Cancel"
    }
    try {
      await axios.delete("http://localhost:9000/deleteStaff", {
        data: { empId },
      });
      // Refresh the department list after deletion
      const response = await axios.get(
        "http://localhost:9000/getDepartments"
      );
      setEmpData(response.data);
    } catch (error) {
      console.error("Error deleting Staff :", error);
    }
  }
 

  return (
    <>
      <AdminNavbar />
      <AdminNav />
      <div className="main-container">
        <div className="st_viewport">
          {departments.map((department, index) => (
            <table key={index} className="st_wrap_table" data-table_id={index}>
              <thead className="st_table_header">
                <h2>{department.departmentName}</h2>
                <tr className="st_row">
                  <th className="st_column _rank">#</th>
                  <th className="st_column _id">ID</th>
                  <th className="st_column _name">Name</th>
                  <th className="st_column _gender">Gender</th>
                  <th className="st_column _mail">Mail</th>
                  <th className="st_column _phone">Phone</th>
                  <th className="st_column _salary">Salary</th>
                  <th className="st_column _action">Actions</th>
                </tr>
              </thead>
              <tbody className="st_table">
                {emplData[department.departmentName]?.map((employee, index) => (
                  <tr key={index} className="st_row">
                    <td className="st_column _rank">{index + 1}</td>
                    <td className="st_column _id">{employee.empId}</td>
                    <td className="st_column _name">
                      {employee.fName} {employee.lName}
                    </td>
                    <td className="st_column _gender">{employee.gender}</td>
                    <td className="st_column _mail">{employee.mail}</td>
                    <td className="st_column _phone">{employee.phone}</td>
                    <td className="st_column _salary">{employee.salary}</td>
                    <td className="st_column _action">
                      <button
                        className="edit-button"
                        onClick={() => handleEditUser(employee.empId)}
                      >
                        Edit
                      </button>
                      <button className="delete-button"
                      onClick={() => handleDeleteUser(employee.empId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </>
  );
}
