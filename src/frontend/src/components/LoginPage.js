import React, { useState } from "react";
import api from "./Api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      console.log("user: " , response.data.user)
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");
      if(response.data.user.permissionId === '67619bfec4f9801638af23af'){
        navigate("/adminPage");
      }else if(response.data.user.permissionId === '676173e713e3328961b2ed9e'){
        navigate("/userMainPage");
      }
      else if(response.data.user.permissionId === '676173a613e3328961b2ed9d'){
        navigate("/hotelManagerPage");
      }
      else if(response.data.user.permissionId === '676174e313e3328961b2eda0'){
        navigate("/groupManagersPage");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="button-container">
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <button
          type="button" 
          className="btn"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
