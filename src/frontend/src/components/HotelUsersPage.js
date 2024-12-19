import React, { useEffect, useState } from "react";
import "./HotelUsersPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HotelUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const hotelId = loggedInUser?.hotelId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You need to be logged in to view users.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users/getUsersByHotel/${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredUsers = response.data.filter(
          (user) => user._id !== loggedInUser._id
        );

        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchUsers();
    } else {
      setError("No hotel ID found");
      setLoading(false);
    }
  }, [hotelId]);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("You need to be logged in to perform this action.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/users/removeHotelId/${userId}`,
        { hotelId: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found for this hotel.</p>;
  }

  return (
    <div className="hotel-users-container">
      <h1>Users at Hotel</h1>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h2>{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Permission ID:</strong> {user.permissionId || "N/A"}
            </p>
            <p>
              <strong>Hotel ID:</strong> {user.hotelId || "N/A"}
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default HotelUsers;
