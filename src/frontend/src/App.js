import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from './components/RegisterPage';
import Login from "./components/LoginPage";
import UserPage from "./components/UserPage";
import UserProfile from "./components/UserProfile";
import AdminPage from "./components/AdminPage";
import "./App.css";

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


      </Routes>
    </Router>
  );
}

export default App;
