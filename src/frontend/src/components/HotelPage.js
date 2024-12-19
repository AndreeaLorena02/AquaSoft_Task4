import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import "./HotelPage.css";

const HotelPage = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // Hotel selectat
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const getHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/hotels/magic-link", {});
      console.log("hotels: ", response.data);
      setHotels(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again later.");
    }
  };

  const viewHotel = async (groupId, hotelId) => {
    console.log("am apsasat")
    const user = JSON.parse(localStorage.getItem("user")); // Preia utilizatorul din localStorage
    console.log("user: " , user , "groupId: " , groupId , "hotelId: " , hotelId)

    if (!user || !user.groupId) {
      setError("Nu ai acces la acest hotel.");
      return;
    }

    if (user.groupId !== groupId) {
      setError("Nu ai acces la acest hotel.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/admin/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response: " , response.data)

      setSelectedHotel(response.data); // Setează hotelul selectat pentru afișare
    } catch (err) {
      setError("Failed to fetch hotel details.");
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hotelPage?token=${token}`);
        setMessage(response.data.message);
      } catch (err) {
        setError("Token invalid sau expirat.");
      }
    };

    validateToken();
    getHotels();
  }, [token]);

  return (
    <div className="user-page">
      <main className="main-content">
        <section id="hotels">
          <h2>Available Hotels</h2>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          {selectedHotel ? (
            <div className="selected-hotel">
              <h3>Name: {selectedHotel.HotelName}</h3>
              <p>Group ID: {selectedHotel.group_id}</p>
              <button onClick={() => setSelectedHotel(null)}>Back</button>
            </div>
          ) : hotels.length > 0 ? (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <li key={hotel._id} className="hotel-item">
                  <h3>{hotel.HotelName}</h3>
                  <button
                    className="view-button"
                    onClick={() => viewHotel(hotel.group_id, hotel._id)}
                  >
                    View Hotel
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading hotels...</p>
          )}
        </section>
      </main>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default HotelPage;
