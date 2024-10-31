import "./App.css";
import "tailwindcss/tailwind.css"
import Navbar from "./components/navbar/Navbar";
import LoginUser from "./pages/auth/LoginUser";
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/auth/RegisterUser";
import { useAuth } from "./context/AuthContext";

function App() {
  const {loadUser, isLoggedIn} = useAuth();

  const location = useLocation();

  useEffect(()=>{
    loadUser();
  },[loadUser, location])

  return (
   <div className="bg-gray-500">
    <Navbar/>
    
        <Routes>
          <Route path="/" element={isLoggedIn? <Home/>:<Navigate to='/login'/>}/>
          <Route path="/login" element={!isLoggedIn ? <LoginUser/> : <Navigate to='/'/>}/>
          <Route path="/register" element={!isLoggedIn? <RegisterUser/>:<Navigate to='/'/>}/>

        </Routes>
    
   </div>
   
  );
}

export default App;
