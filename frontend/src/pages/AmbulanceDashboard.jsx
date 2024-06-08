// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
// import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"; // Import Mapbox Directions CSS

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoic2h1YmhhbTMwNDMiLCJhIjoiY2x4NTNhd2cxMWgzcTJpczl3NTdzcDZraCJ9.iwgxWFFJ1emZVMaXjrN7ZA"; // Replace with your Mapbox access token

// const AmbulanceDashboard = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const directionsRef = useRef(null);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [selectedDestination, setSelectedDestination] = useState(null);

//   useEffect(() => {
//     const getUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userLng = position.coords.longitude;
//             const userLat = position.coords.latitude;
//             setCurrentPosition([userLng, userLat]);

//             const map = new mapboxgl.Map({
//               container: mapContainerRef.current,
//               style: "mapbox://styles/mapbox/streets-v11",
//               center: [userLng, userLat], // Center the map at user's location
//               zoom: 13.5,
//             });

//             const directions = new MapboxDirections({
//               accessToken: mapboxgl.accessToken,
//               unit: "metric",
//               profile: "mapbox/driving",
//               controls: {
//                 inputs: true, // Enable inputs to select destination
//               },
//             });

//             map.addControl(directions, "top-left");

//             map.on("load", () => {
//               map.resize();
//               mapRef.current = map;
//               directionsRef.current = directions;

//               // Fetch nearby hospitals
//               fetchNearbyHospitals(userLng, userLat);

//               // Add marker for user's current location
//               const userMarker = new mapboxgl.Marker({ color: "blue" })
//                 .setLngLat([userLng, userLat])
//                 .addTo(mapRef.current);
//             });

//             map.on("click", (e) => {
//               // Store selected destination
//               setSelectedDestination(e.lngLat.toArray());
//             });
//           },
//           (error) => {
//             console.error("Error getting user location:", error);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//     };

//     getUserLocation();

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Update directions when selected destination changes
//     if (directionsRef.current && selectedDestination) {
//       directionsRef.current.setDestination(selectedDestination);
//     }
//   }, [selectedDestination]);

//   const fetchNearbyHospitals = (userLng, userLat) => {
//     const geocodingClient = mapboxSdk({
//       accessToken: mapboxgl.accessToken,
//     });

//     geocodingClient
//       .forwardGeocode({
//         query: "hospital",
//         proximity: [userLng, userLat],
//         types: ["poi"],
//         limit: 10,
//       })
//       .send()
//       .then((response) => {
//         const hospitals = response.body.features.filter((hospital) => {
//           const distance = getDistanceFromLatLonInKm(
//             userLat,
//             userLng,
//             hospital.geometry.coordinates[1],
//             hospital.geometry.coordinates[0]
//           );
//           return distance <= 20; // Filter hospitals within 10 km range
//         });

//         hospitals.forEach((hospital) => {
//           // Create a custom "H" marker
//           const el = document.createElement("div");
//           el.className = "hospital-marker";
//           el.innerHTML = "H";
//           el.style.color = "white";
//           el.style.backgroundColor = "green";
//           el.style.padding = "8px";
//           el.style.borderRadius = "90%";
//           el.style.textAlign = "center";

//           const marker = new mapboxgl.Marker(el)
//             .setLngLat(hospital.geometry.coordinates)
//             .setPopup(
//               new mapboxgl.Popup({ offset: 25 }).setText(hospital.place_name)
//             )
//             .addTo(mapRef.current);

//           marker.getElement().addEventListener("click", () => {
//             setSelectedDestination(hospital.geometry.coordinates);
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching nearby hospitals:", error);
//       });
//   };

//   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1); // deg2rad below
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) *
//         Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in km
//     return distance;
//   }

//   function deg2rad(deg) {
//     return deg * (Math.PI / 180);
//   }

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div
//         ref={mapContainerRef}
//         style={{ width: "80%", height: "500px", margin: "20px" }}
//       />
//     </div>
//   );
// };

// export default AmbulanceDashboard;



import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const areas = [
  { value: "ADUGODI", label: "ADUGODI" },
  { value: "AIRPORT", label: "AIRPORT" },
  // Add other areas...
];
const AmbulanceDashboard = () => {
  const [area, setArea] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/ambulance/notifications"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      // console.error(error);
      toast.error("Failed to fetch notifications");
    }
  };

  const handleNotification = async () => {
    if (area) {
      try {
        const response = await fetch("/api/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            area: area.value,
            message: `Notification for area ${area.label}`,
          }),
        });

        if (response.ok) {
          toast.info(`Notification sent to traffic profiles in ${area.label}`);
        } else {
          toast.error("Failed to send notification");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">Area</label>
      <Select
        options={areas}
        onChange={(selectedOption) => setArea(selectedOption)}
        placeholder="Select an area"
        value={area}
        isSearchable
      />
      <button
        onClick={handleNotification}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Notify
      </button>

      <div>
        <h2>Notifications Status</h2>
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-status">
            <p>
              {notification.message} - {notification.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceDashboard;
