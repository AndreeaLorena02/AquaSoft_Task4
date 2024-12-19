import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./UserPage.css";

const UserPage = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
      console.log("hotels: " , response.data)
      setHotels(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again later.");
    }
  };

  const bookHotel = async (hotelId) => {
    console.log("id: " , hotelId);
    const token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    console.log(user);// Retrieve and parse user data from localStorage

    if (!token) {
      setError("You need to be logged in to book a hotel.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/book-hotel`,
        { hotelId, user: user}, // Trimite hotelId și userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Successfully booked hotel with ID: ${hotelId}`);
    } catch (err) {
      setError("Failed to book hotel. Please try again later.");
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
          {/* <li><a href="#home">Home</a></li>
          <li><a href="#hotels">Hotels</a></li> */}
          <li><Link to="/userProfile">My Profile</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <section id="hotels">
          <h2>Available Hotels</h2>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          {hotels.length > 0 ? (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <li key={hotel._id} className="hotel-item">
                  <h3>{hotel.HotelName}</h3>
                  <button
                    className="book-button"
                    onClick={() =>bookHotel(hotel._id)}
                  >
                    Book Hotel
                  </button>
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
