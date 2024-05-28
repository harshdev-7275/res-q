import React, { useState } from 'react';
import axios from 'axios';
import { adminApi } from '../helper/api';

const AddHospital = ({ setAddHospital }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !name || !password || !phoneNumber || !location) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${adminApi}/create-hospital`, {
        email,
        name,
        password,
        phoneNumber,
        location,
        status,
      });

      if (response.data.success) {
        setSuccess("Hospital added successfully!");
        setEmail("");
        setName("");
        setPassword("");
        setPhoneNumber("");
        setLocation("");
        setStatus(true);
        alert("Hospital added successfully!");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the hospital.");
    } finally {
      setAddHospital(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="bg-white p-4 rounded-md shadow-md max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Add Hospital</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === 'true')}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex items-center flex-col gap-2 justify-between">
            <button type="submit" className="bg-[#54399b] text-white px-4 py-1 rounded-md hover:bg-[#3e2d7a] transition-colors">
              Add Hospital
            </button>
            <button type="button" className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition-colors" onClick={() => setAddHospital(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
