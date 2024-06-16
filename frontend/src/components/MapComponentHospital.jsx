import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import "./style.css"
const MapComponentHospital = () => {
  const mapContainerRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
 const[accepted,setAccepted] = useState(false);
 const[ambulance,setAmbulance] = useState({});

 const userInfo = localStorage.getItem('userInfo');
 const { lat, lng } = JSON.parse(userInfo);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1Ymg5NDYyNyIsImEiOiJjbHd0bGtrbTYwNWlrMmxzZ3Y1Y3Nwa20wIn0.xJTRixHgpG1bCGt_3IASew';

    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);
    if (userInfo) {
      const { lat, lng } = JSON.parse(userInfo);
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 14,
      });

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    
      // Fetch notifications for the hospital
      const fetchNotifications = async () => {
        try {
          const response = await axios.post('http://localhost:5005/api/general/get/notifications', {
            lat,
            lng
          });
          console.log(response.data);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      

      fetchNotifications();

      return () => map.remove();
    }
  }, []);
  useEffect(() => {
    if (Object.keys(ambulance).length !== 0) {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 14,
          });
      new mapboxgl.Marker().setLngLat([ambulance.lng, ambulance.lat]).addTo(map);
    }
  }, [ambulance]);
  

    const handleAccept = async (id,ind) => {
      try {
        await axios.post('http://localhost:5005/api/general/change/notification/status', {
          id,
          status: true,
          ToLat: lat,
          Tolng: lng
        });
    
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(ind, 1);
        setNotifications(updatedNotifications);
        alert("Ambulance request Accepted");
      } catch (error) {
        console.error('Error declining notification:', error);
      }
      };
      
      // Function to handle declining a notification
      const handleDecline = async (id,ind) => {
        try {
          await axios.post('http://localhost:5005/api/general/change/notification/status', {
            id,
            status: false,
            ToLat: lat,
            Tolng: lng
          });
      
          const updatedNotifications = [...notifications];
          updatedNotifications.splice(ind, 1);
          setNotifications(updatedNotifications);
          alert("Ambulance request Declined");
        } catch (error) {
          console.error('Error declining notification:', error);
        }
      };
      

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
      <div style={{marginTop:"5px",padding:"5px"}}>
  <table className="notifications-table">
    <thead>
      <tr>
        <th>Message</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {notifications.map((notification,id) => (
        <tr key={id}>
          <td>An ambulance is trying to approach you . Kindly respond to the message as per your availability Immediately......</td>
          <td>
            <button className="accept-btn" onClick={() => handleAccept(notification?.id,id)}>Accept</button>
            <button className="decline-btn" onClick={() => handleDecline(notification?.id,id)}>Decline</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default MapComponentHospital;
