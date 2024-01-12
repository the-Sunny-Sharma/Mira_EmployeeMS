import "./App.css";
import AdminSign from "./admin/pages/AdminSign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpSign from "./employee/pages/EmpSign";
import Landing from "./Landing";
import EmpDashboard from "./employee/pages/EmpDashboard";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AddDepartment from "./admin/pages/AddDepartment";
import AddStaff from "./admin/pages/AddStaff";
import ManageDepartment from "./admin/pages/ManageDepartment";
import ManageUsers from "./admin/pages/ManageUsers";
import EmpProfile from "./employee/pages/EmpProfile";
import ApplyLeave from "./employee/pages/ApplyLeave";
import ViewLeave from "./employee/pages/ViewLeave";
import ManageLeave from './admin/pages/ManageLeave';
import Page404 from "./Page404";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/emp-signin" element={<EmpSign />} />
          <Route path='/emp-dashboard' element={<EmpDashboard />} />
          <Route path='/emp-profile' element={<EmpProfile />} />
          <Route path='/emp-leave' element={<ApplyLeave />} />
          <Route path='/view-leave' element={<ViewLeave />} />
          <Route path="/admin-signin" element={<AdminSign />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-add-department" element={<AddDepartment />} />
          <Route path="/admin-manage-department" element={<ManageDepartment />} />
          <Route path="/admin-add-staff" element={<AddStaff />} />
          <Route path="/admin-manage-staff" element={<ManageUsers />} />
          <Route path="/admin-manage-leave" element={<ManageLeave />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

