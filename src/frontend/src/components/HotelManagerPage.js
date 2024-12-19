import React from "react";
import "./HotelManager.css";
import { useNavigate } from "react-router-dom";

export default function HotelManager() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="hotel-manager-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li onClick={() => handleNavigation("/hotelUsersPage")}>
            List Users
          </li>
          <li onClick={() => handleNavigation("/hotelPage")}>
            View Hotels
          </li>
          <li onClick={() => handleNavigation("/userProfile")}>Profile</li>
        </ul>
      </nav>
      <div className="main-content">
        <h1>Welcome to the Hotel Manager Dashboard</h1>
      </div>
    </div>
  );
}
