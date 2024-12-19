import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./HotelPage.css";
import { useSearchParams } from 'react-router-dom';

const HotelPage = () => {
    const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const getHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/hotels/magic-link", {
      });
      console.log("hotels: ", response.data);
      setHotels(response.data);
    } catch (err) {
      setError("Failed to load hotels. Please try again later.");
    }
  };


  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/hotelPage?token=${token}`);
        setMessage(response.data.message);
      } catch (err) {
        setError('Token invalid sau expirat.');
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

          {hotels.length > 0 ? (
            <ul className="hotels-list">
              {hotels.map((hotel) => (
                <li key={hotel._id} className="hotel-item">
                  <h3>{hotel.HotelName}</h3>
                    <button
                      className="view-button"
                    //   onClick={() => addOffer(hotel._id)}
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
    </div>
  );
};

export default HotelPage;
