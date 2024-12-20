import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateOffer.css";
import { useNavigate } from "react-router-dom"; 



const UpdateOffer = () => {
  const { offerId } = useParams(); 
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  console.log("oferta: " , offerId)

  const getOfferDetails = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://localhost:3000/offers/getById/${offerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffer(response.data); 
      setLoading(false);
    } catch (err) {
      setError("Nu s-au putut încărca detaliile ofertei.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getOfferDetails();
  }, [offerId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://localhost:3000/offers/update/${offerId}`,
        { name: offer.name, price: offer.price }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Oferta a fost actualizată cu succes!");
      navigate('/allOffers')
    } catch (err) {
      setError("Nu s-a putut actualiza oferta.");
    }
  };

  return (
    <div className="update-offer-container">
      <h1>Modifică Oferta</h1>
      {loading && <p>Se încarcă detaliile ofertei...</p>}
      {error && <p className="error-message">{error}</p>}
      {offer && (
        <div>
          <label>
            Nume ofertă:
            <input
              type="text"
              value={offer.name}
              onChange={(e) => setOffer({ ...offer, name: e.target.value })}
            />
          </label>
          <label>
            Preț:
            <input
              type="number"
              value={offer.price}
              onChange={(e) => setOffer({ ...offer, price: e.target.value })}
            />
          </label>
          <button onClick={handleUpdate}>Actualizează Oferta</button>
        </div>
      )}
    </div>
  );
};

export default UpdateOffer;
