import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserPage.css"; 

const UserPage = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const getHotels = async () => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      setError("You need to be logged in to view this page.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users/hotels/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHotels(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again later.");
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="user-page">
      <nav className="navbar">
        <h1 className="navbar-title">Hotel Management</h1>
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#hotels">Hotels</a></li>
          <li><a href="#profile">Profile</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <section id="hotels">
          <h2>Available Hotels</h2>

          {error ? (
            <p className="error-message">{error}</p>
          ) : hotels.length > 0 ? (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <li key={hotel.id} className="hotel-item">
                  <h3>{hotel.HotelName}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading hotels...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserPage;
