import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./AllOffers.css"; 

const AllOffers = () => {
  const [offers, setOffers] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  const getAllOffers = async () => {
    const token = localStorage.getItem("access_token"); 

    if (!token) {
      setError("Trebuie să te autentifici pentru a vedea ofertele.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/offers/all", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setOffers(response.data); 
      setLoading(false); 
    } catch (err) {
      setError("Nu s-au putut încărca ofertele. Încearcă din nou.");
      setLoading(false);
    }
  };

  const handleModifyOffer = (offerId) => {
    console.log(`Modifying offer with ID: ${offerId}`);
    navigate(`/offers/updateOffer/${offerId}`); 
  };

  const handleDeleteOffer = async (offerId) => {
    console.log(`Deleting offer with ID: ${offerId}`);
    const token = localStorage.getItem("access_token");

    try {
      await axios.delete(`http://localhost:3000/offers/delete/${offerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
      window.alert(`Offer ID: ${offerId} deleted successfully!`);
    } catch (err) {
      console.error("Error deleting offer:", err);
      setError("Error deleting offer.");
    }
  };

  const handleAddOffer = () => {
    console.log("Adding new offer");
    navigate("/offers/add"); 
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  return (
    <div className="all-offers-page">
      <h1>All Offers</h1>
      <button className="add-offer-button" onClick={handleAddOffer}>
        ADD Offer
      </button>

      {loading && <p>Loading offers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && offers.length > 0 ? (
        <ul className="offers-list">
          {offers.map((offer) => (
            <li key={offer._id} className="offer-item">
              <h3>Name: {offer.name}</h3>
              <p><strong>Price:</strong> {offer.price} RON</p>
              <div className="button-group">
                <button
                  className="modify-button"
                  onClick={() => handleModifyOffer(offer._id)}
                >
                  Modify
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteOffer(offer._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No offers available!</p>
      )}

        <button className="back-button" onClick={() => navigate(-1)}>
                    Back
        </button>
    </div>
  );
};

export default AllOffers;
