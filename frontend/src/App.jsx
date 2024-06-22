import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AmbulanceDashboard from "./pages/AmbulanceDashboard";
import TrafficDashboard from "./pages/TrafficDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/ambulance" element={<AmbulanceDashboard />} /> 
        <Route path="/traffic" element={<TrafficDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
