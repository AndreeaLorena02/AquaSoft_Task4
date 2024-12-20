import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddOffer.css";

const AddOfferPage = () => {
  const { hotelId } = useParams(); 
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState({
    name: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOffer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Trebuie să fii autentificat pentru a adăuga o ofertă.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/offers/add`,
        {
          name: offerData.name,
          price: offerData.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Oferta a fost adăugată cu succes!");
      setTimeout(() => navigate(`/allOffers`), 2000);
    } catch (err) {
      console.error("Eroare la adăugarea ofertei:", err);
      setError("Nu s-a putut adăuga oferta. Te rog să încerci din nou.");
    }
  };

  return (
    <div className="add-offer-page">
      <h1>Add Offer</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="offer-form" onSubmit={handleAddOffer}>
        <div className="form-group">
          <label htmlFor="name">Nume Ofertă:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={offerData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={offerData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddOfferPage;
