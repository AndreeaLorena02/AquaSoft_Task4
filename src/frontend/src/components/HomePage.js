import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="background-overlay">
        <h1 className="homepage-title">Hotel Management</h1>
        <div className="button-container">
          <button onClick={() => navigate("/register")} className="btn">
            Create Account
          </button>
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
