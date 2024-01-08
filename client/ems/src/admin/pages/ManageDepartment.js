import AdminNav from "../components/AdminNav";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/ManageDepartment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageDepartment() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch department names from the database
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/getDepartments"
        );
        const sortedDepartments = response.data.sort((a, b) =>
        a.departmentName.localeCompare(b.departmentName)
      );
      setDepartments(sortedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
    fetchDepartments();
  }, []);

  const handleEditDepartment = (departmentName) => {
    // Navigate to the Add Department screen with the department name parameter
    navigate(`/admin-add-department?name=${departmentName}`);
  };

  const handleDeleteDepartment = async (departmentName) => {
    const confirmation = window.confirm("Are you sure you want to delete " + departmentName + "?");

    if (!confirmation) {
      return; // User clicked "Cancel"
    }
    try {
      await axios.delete("http://localhost:9000/deleteDepartment", {
        data: { departmentName },
      });
      // Refresh the department list after deletion
      const response = await axios.get("http://localhost:9000/getDepartments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  return (
    <>
      <AdminNavbar />
      <AdminNav />
      <div className="main-container">
        <p className="category-title">Departments</p>
        <div class="st_viewport department-list">
          <div class="st_wrap_table" data-table_id="0">
            <header class="st_table_header">
              <h2 className="head-table">Manage Departments</h2>
              <div class="st_row flex-row">
                <div class="st_column _name">Sr. No.</div>
                <div class="st_column _name">Department Name</div>
                <div class="st_column _name">Action</div>
              </div>
            </header>
            {departments.map((department, index) => (
              <div class="st_row flex-row" key={department._id}>
                <div class="st_column _name">{index + 1}</div>
                <div class="st_column _name">{department.departmentName}</div>
                <div class="st_column _name">
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEditDepartment(department.departmentName)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteDepartment(department.departmentName)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
