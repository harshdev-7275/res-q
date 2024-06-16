

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Ambulance from './pages/Ambulance'
import Hospital from './pages/Hospital'


        

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/admin" element={<AdminDashboard/>}/>
        <Route path ="/ambulance" element={<Ambulance/>}/>
        <Route path ="/hospital" element={<Hospital/>}/>


      </Routes>
    </BrowserRouter>
    
  )
}

export default App