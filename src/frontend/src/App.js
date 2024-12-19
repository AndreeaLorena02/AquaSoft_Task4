import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from './components/RegisterPage';
import Login from "./components/LoginPage";
import UserPage from "./components/UserPage";
import UserProfile from "./components/UserProfile";
import AdminPage from "./components/AdminPage";
import "./App.css";
import HotelOffers from "./components/HotelOffers";
import AllOffersPage from "./components/AllOffers";
import AddOfferPage from "./components/AddOffer";
import UpdateOffer from "./components/UpdateOffer";
import AddOfferToHotel from "./components/AddOfferToHotel";
import HotelManager from "./components/HotelManagerPage";
import HotelUsers from "./components/HotelUsersPage";
import GroupManagersPage from "./components/GroupManagersPage";
import HotelPage from "./components/HotelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userMainPage" element={<UserPage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/hotels/:hotelId/offers" element={<HotelOffers />} />
        <Route path="/allOffers" element={<AllOffersPage />} />
        <Route path="/offers/add" element={<AddOfferPage />} />
        <Route path="/offers/addOfferToHotel/:hotelId" element={<AddOfferToHotel />} />
        <Route path="/offers/updateOffer/:offerId" element={<UpdateOffer />} />
        <Route path="/hotelManagerPage" element={<HotelManager />} />
        <Route path="/hotelUsersPage" element={<HotelUsers />} />
        <Route path="/groupManagersPage" element={<GroupManagersPage />} />
        <Route path="/hotelPage" element={<HotelPage />} />

      </Routes>
    </Router>
  );
}

export default App;
