import { Link, useNavigate } from "react-router-dom";

export default function EmpNav(){
    const navigate = useNavigate();
    const logoutEmp = () => {
        const confirmation = window.confirm("Are you sure you want to logout?");
        if (!confirmation) {
          return;
        }
        localStorage.clear();
        navigate("/");
      };
    return(
        <>
            <div className="main-ui">
        <div className="navbar-left">
          <ul className="main-ul">
            <li className="li-option">
              <Link to="/emp-dashboard">Dashboard</Link>
            </li>

            <hr />
            <li className="li-option">
              <Link to="/emp-leave">Leave</Link>
            </li>
            <hr />
            <li className="li-option">
              <Link to="/emp-profile">My Profile</Link>
            </li>
            <hr />
            <li className="logout li-option">
              <button className="logout-btn" onClick={() => logoutEmp()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard-wrapper">
          <h2>Welcome, Sunny</h2>
        </div>
      </div>
        </>
    );
}