
import React, { useState } from "react";
import { adminApi } from "../helper/api";
import axios from "axios";

const EditTraffic = ({traffic}) => {
    const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState(traffic.email);
  const [name, setName] = useState(traffic.name);
  const [phoneNumber, setPhoneNumber] = useState(traffic.trafficProfile.phoneNumber);
  const [location, setLocation] = useState(traffic.trafficProfile.location);
  const [status, setStatus] = useState(traffic.trafficProfile.status);


  const handleSave = async () => {
    if (!name || !email || !phoneNumber || !location) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.put(`${adminApi}/update-traffic-byId/${traffic.id}`, {
        name,
        email,
        trafficProfile: {
          phoneNumber,
          location,
          status: Boolean(status), // Ensure status is a boolean
        },
      });
      alert("Traffic updated successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
    setTimeout(() => {
      setIsEdit(false);
      window.location.reload();
    }, 500);
  };


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this traffic police?")) {
      try {
        const res = await axios.delete(`${adminApi}/delete-traffic-byId/${traffic.id}`);
        alert("Traffic deleted successfully");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-between max-w-[1000px] bg-[#baa3f3] px-3 py-2 rounded-md hover:bg-[#af94f6] transition-transform cursor-pointer">
      <div>
        <p>{traffic.name}</p>
        <p>{traffic.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-white px-2 py-1 rounded-md" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {isEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-md max-w-sm w-full transform transition-transform scale-95 animate-slide-up">
            <h2 className="text-lg font-bold mb-4">Edit Traffic Police</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
              <input
                type="checkbox"
                id="status"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="mr-2 leading-tight"
              />
              Active
            </div>
            <div className="flex justify-end gap-3">
              <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors" onClick={() => setIsEdit(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditTraffic