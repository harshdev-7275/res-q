

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'


        

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App