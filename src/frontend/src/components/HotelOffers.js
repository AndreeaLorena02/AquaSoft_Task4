import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./HotelOffers.css";


const HotelOffers = () => {
  const { hotelId } = useParams(); // Extract hotelId from the URL
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getOffers = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("You need to be logged in to view offers.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/hotel-offers/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Offers fetched: ", response.data);
      setOffers(response.data.offers);
    } catch (err) {
      console.error(err);
      setError("Failed to load offers. Please try again later.");
    }
  };





  const handleRemoveOffer = async (offerId) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("offerId: " , offerId)
      await axios.delete(`http://localhost:3000/hotel-offers/${hotelId}/removeOffer/${offerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Oferta a fost eliminată cu succes!");
      getOffers(); // Actualizează lista după ștergere
    } catch (error) {
      setError("Nu s-a putut elimina oferta.");
    }
  };

  useEffect(() => {
    getOffers();
  }, [hotelId]);

  return (
    <div className="view-offers-page">
      <h1>Offers for Hotel ID: {hotelId}</h1>
      {error && <p className="error-message">{error}</p>}

      {offers.length > 0 ? (
        <ul className="offers-list">
          {offers.map((offer) => (
            <li key={offer._id} className="offer-item">
              <h3>Name: {offer.name}</h3>
              <p>Price: {offer.price}</p>
              <button onClick={() => handleRemoveOffer(offer._id)}>Șterge Oferta</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No offers available for this hotel.</p>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default HotelOffers;
