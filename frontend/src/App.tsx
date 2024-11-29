import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/navbar/Navbar";
import LoginUser from "./pages/auth/LoginUser";
import { useAuth } from "./context/AuthContext";
import RegisterUser from "./pages/auth/RegisterUser";
import LoginAdmin from "./pages/auth/LoginAdmin";
import CreateAdmin from "./pages/admin/CreateAdmin";
import Loading from "./components/Loading";
import CategoryNavbar from "./components/navbar/CategoryNavbar";
import Home from "./pages/Home";
import createRouter from "./router/Router";
import router from "./router/Router";

// Funkcija koja renderuje Loading kada je aplikacija u fazi učitavanja
function App() {
  const { loadUser, isLoggedIn, user, isLoading } = useAuth();
  const isAdmin = user.role === "administrator" && isLoggedIn;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return <Loading />;
  }

  // Definisanje router-a
// const router = createRouter(isLoggedIn, isAdmin);

  return (

    <div>
      


    {/* <div className="bg-gray-500">
      <div className="pl-5 pr-5">
         */}
      <RouterProvider router={router} />

    {/* </div> */}
     {/* </div> */}
     </div>
  );
}

export default App;
