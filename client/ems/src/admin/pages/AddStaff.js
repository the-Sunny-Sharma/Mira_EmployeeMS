import AdminNav from "../components/AdminNav";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminForms.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function AddStaff() {
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const empIdParam = params.get("empId");
    if (empIdParam) {
      setIsUpdate(true);
      // setFormData.empId(empIdParam);
      fetchStaffDetails(empIdParam);
    }
  }, [location.search]);
  const fetchStaffDetails = async (empIdParam) => {
    try {
      // Fetch staff details based on empIdParam from the backend API
      const response = await axios.get(
        `http://localhost:9000/getStaffDetails/${empIdParam}`
      );
      const staffData = response.data; // Assuming the retrieved data is an object with staff details
      setFormData({
        ...staffData, // Set the form data with the retrieved staff details
      });
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
  };
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    dob: "",
    gender: "",
    mail: "",
    phone: "",
    address: "",
    empId: "",
    department: "",
    position: "",
    hireDate: "",
    salary: "",
    bonus: "",
    payMethod: "",
    managerID: "",
    status: "",
    emergencyNo: "",
    comment: "",
  });

  const [departmentList, setDepartmentList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone" && (value.length < 10 || value.length > 10)) {
      alert("Enter correct mobile number");
      return;
    }
    if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        alert("Must be at least 18 years old.");
        return; // Prevent further processing
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch department names from the database
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/getDepartments"
        );
        setDepartmentList(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const addStaff = async (event) => {
    event.preventDefault();
    // Access form data from formData object
    let data = { ...formData };

    try {
      const response = await axios.post("http://localhost:9000/addStaff", data);
      alert("Staff details added successfully!");
      setFormData({
        fName: "",
        lName: "",
        dob: "",
        gender: "",
        mail: "",
        phone: "",
        address: "",
        empId: "",
        department: "",
        position: "",
        hireDate: "",
        salary: "",
        bonus: "",
        payMethod: "",
        managerID: "",
        status: "",
        emergencyNo: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminNav />
      <div className="main-container ">
        <p className="category-title">Staff Management</p>
        <div className="form-container staff-form">
          <form onSubmit={addStaff}>
            <p className="form-title">Add Staff</p>
            <fieldset className="per-info">
              <legend>Personal Information</legend>
              <div className="col-1">
                <label>First Name : </label>
                <input
                  type="text"
                  name="fName"
                  value={formData.fName}
                  onChange={(e) =>
                    setFormData({ ...formData, fName: e.target.value })
                  }
                  disabled={isUpdate} // Disable the field if it's an update
                  required
                />
                <label>Date of Birth : </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-2">
                <label>Last Name : </label>
                <input
                  type="text"
                  name="lName"
                  value={formData.lName}
                  onChange={handleInputChange}
                  disabled={isUpdate} // Disable the field if it's an update
                  required
                />
                <label>Gender : </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="notSpecified">Rather not to say</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="per-info">
              <legend>Contact Info</legend>
              <div className="col-1">
                <label>Email</label>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                />
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </fieldset>

            <fieldset className="per-info">
              <legend>Employment Details</legend>
              <div className="col-1">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  disabled={isUpdate} // Disable the field if it's an update
                />
                <label>Position / Job Title</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {departmentList.map((department) => (
                    <option
                      key={department._id}
                      value={department.departmentName}
                    >
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                <label>Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <fieldset className="per-info">
              <legend>Salary and Compensation</legend>
              <div className="col-1">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
                <label>Payment Method</label>
                <select
                  name="payMethod"
                  value={formData.payMethod}
                  onChange={handleInputChange}
                >
                  <option value="">Select the payment method</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Cheque">Cheque</option>
                  <option value="In Hand">In Hand</option>
                </select>
              </div>
              <div className="col-2">
                <label>Bonus / Incentives</label>
                <input
                  type="number"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <fieldset className="per-info">
              <legend>Work-related Info</legend>
              <div className="col-1">
                <label>Manager ID</label>
                <input
                  type="text"
                  name="managerID"
                  value={formData.managerID}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="per-info">
              <legend>Additional Information</legend>
              <div className="col-1">
                <label>Emergency contact</label>
                <input
                  type="number"
                  name="emergencyNo"
                  value={formData.emergencyNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <label>Note / Comments</label>
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <button type="submit" className="submit-btn">
              {isUpdate ? "Update Staff" : "Add Staff"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
