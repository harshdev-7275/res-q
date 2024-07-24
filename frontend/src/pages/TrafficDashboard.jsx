import React, { useState, useEffect } from "react";
import axios from "axios";

const TrafficDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notifications"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="traffic-dashboard">
      <h2>Notifications</h2>
      <ul>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index}>
              <p>Area: {notification.area}</p>
              <p>Message: {notification.message}</p>
            </li>
          ))
        ) : (
          <p>No notifications found.</p>
        )}
      </ul>
    </div>
  );
};

export default TrafficDashboard;
