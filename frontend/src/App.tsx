import "./App.css";
import "tailwindcss/tailwind.css"
import Navbar from "./components/navbar/Navbar";
import LoginUser from "./pages/auth/LoginUser";
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/auth/RegisterUser";

function App() {
  return (
   <div className="bg-gray-500">
    <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginUser/>}/>
          <Route path="/register" element={<RegisterUser/>}/>

        </Routes>
      </BrowserRouter>
   </div>
   
  );
}

export default App;
