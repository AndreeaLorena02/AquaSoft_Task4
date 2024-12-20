import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
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
      console.log("hotels: ", response.data);
      setHotels(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again later.");
    }
  };

  const viewOffers = (hotelId) => {
    console.log(`Viewing offers for hotel ID: ${hotelId}`);
    navigate(`/hotels/${hotelId}/offers`);
  };

  const addOffer = (hotelId) => {
    console.log(`Adding offer for hotel ID: ${hotelId}`);
    navigate(`/offers/addOfferToHotel/${hotelId}`);
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
          <li><Link to="/userProfile">My Profile</Link></li>
          <li><Link to="/allOffers">All Availabale Offers</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <section id="hotels">
          <h2>Admin</h2>
          <h2>Available Hotels</h2>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          {hotels.length > 0 ? (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <li key={hotel._id} className="hotel-item">
                  <h3>{hotel.HotelName}</h3>
                  <div className="button-group">
                    <button
                      className="view-button"
                      onClick={() => viewOffers(hotel._id)}
                    >
                      View Offers
                    </button>
                    <button
                      className="add-button"
                      onClick={() => addOffer(hotel._id)}
                    >
                      Add Offer
                    </button>
                  </div>
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

export default AdminPage;
