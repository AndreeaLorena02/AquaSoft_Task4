import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  console.log("user: ", user);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <p>User not logged in</p>; 
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Welcome, {user.name}!</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Permission ID:</strong> {user.permissionId || "N/A"}</p>
        <p><strong>Hotel ID:</strong> {user.hotelId || "N/A"}</p>
        <p><strong>Group ID:</strong> {user.groupId || "N/A"}</p>
        <div className="button-container">
          <button className="btn-back" onClick={() => navigate(-1)}> {/* Back Button */}
            Back
          </button>
          <button className="btn-logout" onClick={handleLogout}> {/* Logout Button */}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
