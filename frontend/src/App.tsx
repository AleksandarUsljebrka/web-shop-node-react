import "./App.css";
import "tailwindcss/tailwind.css"
import Navbar from "./components/navbar/Navbar";
import LoginUser from "./pages/auth/LoginUser";
import React from 'react';

function App() {
  return (
   <div className="bg-gray-500">
      <Navbar/>
      <LoginUser/>
   </div>
   
  );
}

export default App;
