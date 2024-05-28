  import React, { useState } from 'react';
  import axios from 'axios';
  import { adminApi } from '../helper/api';

const AddAmbulance = ({ setAddAmbulance }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !name || !password || !phoneNumber) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${adminApi}/create-ambulance`, {
        email,
        name,
        password,
        phoneNumber,
      });

      if (response.data.success) {
        setSuccess("Ambulance driver added successfully!");
        setEmail("");
        setName("");
        setPassword("");
        setPhoneNumber("");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the ambulance driver.");
    }finally{
      setAddAmbulance(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Ambulance Driver</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#54399b]"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="flex items-center flex-col gap-3 justify-between">
            <button type="submit" className="bg-[#54399b] text-white px-4 py-2 rounded-md hover:bg-[#3e2d7a] transition-colors">
              Add Ambulance Driver
            </button>
            <button className='bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors' onClick={() => setAddAmbulance(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAmbulance;
