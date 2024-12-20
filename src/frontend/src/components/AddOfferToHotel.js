import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddOfferToHotel.css";

const AddOfferToHotelPage = () => {
  const { hotelId } = useParams(); 
  const [availableOffers, setAvailableOffers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const getAvailableOffers = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`http://localhost:3000/offers/${hotelId}/available-offers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableOffers(response.data); 
    } catch (error) {
      setError("Nu s-au putut încărca ofertele disponibile.");
    }
  };

  const handleAddOffer = async (offerId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `http://localhost:3000/offers/${hotelId}/addOffer`,
        { offerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Oferta a fost adăugată cu succes!");
      getAvailableOffers(); 
    } catch (error) {
      setError("Nu s-a putut adăuga oferta.");
    }
  };

  useEffect(() => {
    getAvailableOffers();
  }, [hotelId]);

  return (
    <div className="add-offer-to-hotel-page">
      <h1>Add Offer to Hotel</h1>
      {error && <p className="error-message">{error}</p>}
      {availableOffers.length > 0 ? (
        <ul className="offers-list">
          {availableOffers.map((offer) => (
            <li key={offer._id}>
              <h3>{offer.name}</h3>
              <p>Price: {offer.price} RON</p>
              <button onClick={() => handleAddOffer(offer._id)}>Adaugă Oferta</button>
            </li>
            
          ))}
        </ul>
        
      ) : (
        <p>No offers available!</p>
      )}
        <button className="back-button" onClick={() => navigate(-1)}>
                    Back
        </button>
    </div>
  );
};

export default AddOfferToHotelPage;
