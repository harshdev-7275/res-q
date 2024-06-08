import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrafficDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notifications");
    }
  };

  const handleResponse = async (notificationId, status) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notification/response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationId, status }),
        }
      );

      if (response.ok) {
        toast.info(`Notification ${status}`);
        fetchNotifications(); // Refresh the list of notifications
      } else {
        throw new Error("Failed to update notification status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update notification status");
    }
  };

  return (
    <div>
      <h1>Traffic Dashboard</h1>
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <p>{notification.message}</p>
          <button
            onClick={() => handleResponse(notification.id, "accepted")}
            className="mr-2 p-2 bg-green-500 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleResponse(notification.id, "denied")}
            className="p-2 bg-red-500 text-white rounded"
          >
            Deny
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrafficDashboard;
