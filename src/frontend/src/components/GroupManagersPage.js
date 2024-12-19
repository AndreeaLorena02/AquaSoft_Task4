import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GroupManagersPage.css";

const GroupManagersPage = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const groupId = loggedInUser?.groupId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You need to be logged in to view hotel managers.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users/managers-by-group/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setManagers(response.data);
      } catch (err) {
        setError("Error fetching hotel managers: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchManagers();
    } else {
      setError("No group ID found for this user.");
      setLoading(false);
    }
  }, [groupId]);

  const handleSelectManager = (managerId) => {
    setSelectedManagers((prevSelected) =>
      prevSelected.includes(managerId)
        ? prevSelected.filter((id) => id !== managerId)
        : [...prevSelected, managerId]
    );
  };

  console.log("manageri: " ,  selectedManagers)


  const handleSendInvitations = async () => {
    const token = localStorage.getItem("access_token");

    if (!token || selectedManagers.length === 0) {
      setError("Please select at least one manager to send the invitation.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/group-manager/send-invitations",  
        { managerIds: selectedManagers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Invitations sent successfully!");
    } catch (err) {
      setError("Error sending invitations: " + err.message);
    }
  };

  if (loading) {
    return <p>Loading hotel managers...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (managers.length === 0) {
    return <p>No hotel managers found for this group.</p>;
  }

  return (
    <div className="group-managers-container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/groupManagersPage">Group Managers</a>
          </li>
          <li>
            <a href="/userProfile">Profile</a>
          </li>
        </ul>
      </nav>

      <h1>Hotel Managers in Your Group</h1>
      <table className="managers-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Hotel</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelectManager(manager._id)}
                  checked={selectedManagers.includes(manager._id)}
                />
              </td>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.hotelId ? manager.hotelId : "N/A"}</td>
              <td>{manager.permissionId || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSendInvitations} className="btn-send-invites">
      {/* <button className="btn-send-invites"> */}
        Send Invitations
      </button>
    </div>
  );
};

export default GroupManagersPage;
