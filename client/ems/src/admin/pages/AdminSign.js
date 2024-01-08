import "../../styles/Signin.css";
import { useNavigate } from "react-router-dom";

export default function AdminSign() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate('/admin-dashboard')
  };
  return (
    <>

      <div className="signin-wrapper">
        <div className="container">
          <div className="login-box">
            <h2 className="sign-title">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input type="text" id="email" required />
                <label htmlFor="email">ID</label>
              </div>
              <div className="input-box">
                <input type="password" id="password" required />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="btn">
                Continue
              </button>
              {/* <div className="signup-link">
                <a href="#">Signup</a>
              </div> */}
            </form>
          </div>
          <div className="animation-spans">
            {[...Array(50)].map((_, index) => (
              <span key={index} style={{ '--i': index }}></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
