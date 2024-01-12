import AdminNav from "../components/AdminNav";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminForms.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddStaff() {

  const rFirstName = useRef();
  const rLastName = useRef();
  const rDOB = useRef();
  const rHireDate = useRef();
  const rMail = useRef();
  const rPhone = useRef();
  const rEmerNo = useRef();
  const rAddress = useRef();
  const rEmpId = useRef();
  const rManageId = useRef();
  const rSalary = useRef();
  const rBonus = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const [isUpdate, setIsUpdate] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "Admin authenticated successfully.") {
      alert("Access Denied");
      navigate("/");
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const empIdParam = params.get("empId");
    if (empIdParam) {
      setIsUpdate(true);
      // setFormData.empId(empIdParam);
      fetchStaffDetails(empIdParam);
    }
  }, [location.search]);

  const validateFirstName = (firstName) => {
    const regex = /^[A-Za-z'-]+$/; // Allows alphabetic characters, hyphens, and apostrophes
    return regex.test(firstName);
  };

  const validateLastName = (lastName) => {
    const regex = /^[A-Za-z'-]+$/; // Allows alphabetic characters, hyphens, and apostrophes
    return regex.test(lastName);
  };

  const fetchStaffDetails = async (empIdParam) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getStaffDetails/${empIdParam}`
      );
      const staffData = response.data; 
      setFormData({
        ...staffData, // Set the form data with the retrieved staff details
      });
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
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

  // Validation function to check if gender is selected
  const validateGender = (gender) => {
    return gender !== ""; // Check if the gender value is not empty
  };

  // Function to validate email format using regular expression
  const validateEmail = (email) => {
    // Regular expression for basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email); // Check if the email matches the pattern
  };

  const validatePhoneNumber = (phoneNumber) => {
    const numericPhone = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    return numericPhone.length === 10; // Check if the length is 10 digits
  };

  const validateAddress = (address) => {
    // Presence validation
    if (address.trim() === "") {
      return false; // Address is empty
    }

    if (address.length > 150) {
      return false; // Address is too long
    }

    // Character validation (allow alphanumeric, spaces, commas, hyphens, periods, etc.)
    const addressPattern = /^[a-zA-Z0-9\s,-./]+$/;
    return addressPattern.test(address);
  };

  const validateHireDate = (hireDate) => {
    const today = new Date();
    const selectedDate = new Date(hireDate);

    if (selectedDate > today) {
      return false; // Hire date is in the future
    }
    return true; // Valid hire date
  };

  const validateSalary = (salary) => {
    // Check if salary is a positive number
    return !isNaN(salary) && salary > 0;
  };

  const validateBonus = (bonus) => {
    // Check if bonus is a positive number
    return !isNaN(bonus) && bonus >= 0; // Allow zero or positive values
  };

  const validateEmpId = (empId) => {
    const regex = /^[A-Za-z0-9_-]+$/; // Allows alphabets, numbers, hyphens, and underscores
    return regex.test(empId);
  };

  const validateManagerId = (managerID) => {
    const regex = /^[A-Za-z0-9_-]+$/; // Allows alphabets, numbers, hyphens, and underscores
    return regex.test(managerID);
  };

  const addStaff = async (event) => {
    event.preventDefault();

    // Access form data from formData object
    let data = { ...formData };

    if (!validateFirstName(formData.fName)) {
      alert("First name is not valid");
      rFirstName.current.focus();
      return;
    }

    if (!validateLastName(formData.lName)) {
      alert("Last name is not valid");
      rLastName.current.focus();
      return;
    }

    if (!validateGender(formData.gender)) {
      alert("Please select a gender.");
      return; // Prevent form submission if validation fails
    }

    if (!validateEmail(formData.mail)) {
      alert("Please enter a valid email address.");
      rMail.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateAddress(formData.address)) {
      alert("Please enter a valid address.");
      rAddress.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateHireDate(formData.hireDate)) {
      alert("Please enter a valid hire date.");
      rHireDate.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateSalary(formData.salary)) {
      alert("Please enter a valid salary (positive number).");
      rSalary.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateBonus(formData.bonus)) {
      alert("Please enter a valid bonus (positive number or zero).");
      rBonus.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateEmpId(formData.empId)) {
      alert(
        "Please enter a valid Employee ID (alphabets, numbers, hyphens, and underscores)."
      );
      rEmpId.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateManagerId(formData.managerID)) {
      alert(
        "Please enter a valid Manager ID (alphabets, numbers, hyphens, and underscores)."
      );
      rManageId.current.focus();
      return; // Prevent form submission if validation fails
    }
    if (!validatePhoneNumber(formData.phone)) {
      alert("Enter correct mobile number");
      rPhone.current.focus();
      return;
    }
    if (!validatePhoneNumber(formData.emergencyNo)) {
      alert("Enter correct mobile number");
      rEmerNo.current.focus();
      return;
    }

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

  const updateStaff = async (event) => {
    event.preventDefault();

    let data = { ...formData };

    
    if (!validateGender(formData.gender)) {
      alert("Please select a gender.");
      return; // Prevent form submission if validation fails
    }

    if (!validateEmail(formData.mail)) {
      alert("Please enter a valid email address.");
      rMail.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateAddress(formData.address)) {
      alert("Please enter a valid address.");
      rAddress.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateHireDate(formData.hireDate)) {
      alert("Please enter a valid hire date.");
      rHireDate.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateSalary(formData.salary)) {
      alert("Please enter a valid salary (positive number).");
      rSalary.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateBonus(formData.bonus)) {
      alert("Please enter a valid bonus (positive number or zero).");
      rBonus.current.focus();
      return; // Prevent form submission if validation fails
    }

    if (!validateManagerId(formData.managerID)) {
      alert(
        "Please enter a valid Manager ID (alphabets, numbers, hyphens, and underscores)."
      );
      rManageId.current.focus();
      return; // Prevent form submission if validation fails
    }
    if (!validatePhoneNumber(formData.phone)) {
      alert("Enter correct mobile number");
      rPhone.current.focus();
      return;
    }
    if (!validatePhoneNumber(formData.emergencyNo)) {
      alert("Enter correct mobile number");
      rEmerNo.current.focus();
      return;
    }

    try {
      const response = await axios.put("http://localhost:9000/updateStaff", data);
      alert("Staff details updated successfully!");
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
          <form onSubmit={isUpdate ? updateStaff : addStaff}>
            <p className="form-title">Add Staff</p>
            <fieldset className="per-info">
              <legend>Personal Information</legend>
              <div className="col-1">
                <label>First Name : </label>
                <input
                  type="text"
                  name="fName"
                  value={formData.fName}
                  ref={rFirstName}
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
                  ref={rDOB}
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
                  ref={rLastName}
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
                  ref={rMail}
                  onChange={handleInputChange}
                  required
                />
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  ref={rAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-2">
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  ref={rPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
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
                  ref={rEmpId}
                  value={formData.empId}
                  onChange={handleInputChange}
                  disabled={isUpdate} // Disable the field if it's an update
                  required
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
                  ref={rHireDate}
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  required
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
                  ref={rSalary}
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
                  ref={rBonus}
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
                  ref={rManageId}
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
                  ref={rEmerNo}
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
