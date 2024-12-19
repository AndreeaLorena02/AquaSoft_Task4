import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importăm useNavigate
import "./AllOffers.css"; // Importă stilul

const AllOffers = () => {
  const [offers, setOffers] = useState([]); // Stochează ofertele
  const [error, setError] = useState(""); // Mesaj de eroare
  const [loading, setLoading] = useState(true); // Indicator de încărcare
  const navigate = useNavigate(); // Folosim navigate pentru redirecționare

  const getAllOffers = async () => {
    const token = localStorage.getItem("access_token"); // Token-ul JWT

    if (!token) {
      setError("Trebuie să te autentifici pentru a vedea ofertele.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/offers/all", {
        headers: {
          Authorization: `Bearer ${token}`, // Trimite token-ul pentru autorizare
        },
      });

      setOffers(response.data); // Setează ofertele în state
      setLoading(false); // Termină încărcarea
    } catch (err) {
      setError("Nu s-au putut încărca ofertele. Încearcă din nou.");
      setLoading(false);
    }
  };

  const handleModifyOffer = (offerId) => {
    console.log(`Modifying offer with ID: ${offerId}`);
    navigate(`/offers/updateOffer/${offerId}`); // Redirecționează către pagina de modificare ofertă
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
      setError("Nu s-a putut șterge oferta.");
    }
  };

  const handleAddOffer = () => {
    console.log("Adding new offer");
    navigate("/offers/add"); // Redirecționează către pagina de adăugare ofertă
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  return (
    <div className="all-offers-page">
      <h1>Toate Ofertele</h1>
      <button className="add-offer-button" onClick={handleAddOffer}>
        Adaugă Ofertă
      </button>

      {loading && <p>Se încarcă ofertele...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && offers.length > 0 ? (
        <ul className="offers-list">
          {offers.map((offer) => (
            <li key={offer._id} className="offer-item">
              <h3>Name: {offer.name}</h3>
              <p><strong>Preț:</strong> {offer.price} RON</p>
              <div className="button-group">
                <button
                  className="modify-button"
                  onClick={() => handleModifyOffer(offer._id)}
                >
                  Modifică
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteOffer(offer._id)}
                >
                  Șterge
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Nu există oferte disponibile.</p>
      )}

        <button className="back-button" onClick={() => navigate(-1)}>
                    Back
        </button>
    </div>
  );
};

export default AllOffers;
