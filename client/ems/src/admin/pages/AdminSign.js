import "../../styles/Signin.css";
import { useNavigate } from "react-router-dom";
import React, {useState, useRef} from "react";
import axios from "axios";

export default function AdminSign() {

  const navigate = useNavigate();
  const rId = useRef();
  const rPassword = useRef();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const hId=(event)=>{
    setId(event.target.value);
  }

  const hPassword = (event) => {
    setPassword(event.target.value);
  }

  const adminLogin = (event) => {
    event.preventDefault();
    if(id === '' || password === ""){
      alert("Username and password cannot be empty")
      if(id==="")
        rId.current.focus();
      else
        rPassword.current.focus();
      return;
    }
    const url = "http://localhost:9000/admin/login";
    axios
      .post(url, {id, password})
      .then((response) => {
        console.log(response);
        if(response.data === "Admin authenticated successfully."){
          localStorage.setItem("token", response.data);
          navigate('/admin-dashboard')
        }
        else
          alert("Invalid Credentials");
      })
      .catch((error) =>{
        console.log(error)
        alert("Server down.\nPlease try again later.")
      });
  };

  return (
    <>

      <div className="signin-wrapper">
        <div className="container">
          <div className="login-box">
            <h2 className="sign-title">Login</h2>
            <form onSubmit={adminLogin}>
              <div className="input-box">
                <input type="text" id="email" value={id} onChange={hId} ref={rId} />
                <label htmlFor="email">ID</label>
              </div>
              <div className="input-box">
                <input type="password" id="password" value={password} onChange={hPassword} ref={rPassword}/>
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="btn">
                Continue
              </button>
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
