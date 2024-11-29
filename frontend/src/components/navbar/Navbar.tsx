import React from "react";
import shopImage from "../../images/online-shop.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
    <nav className="bg-gray-400 fixed top-0 left-0 w-screen flex justify-between items-center">
      <div className="flex ml-10">
        <img
          src={shopImage}
          alt="Logo"
          className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-3"
        />
        <h2 className="text-sm md:text-xl lg:text-2xl pointer-events-none">
          WebShop
        </h2>
      </div>
      <ul className="flex justify-around w-1/2 text-gray-800 h-20 items-center lg:text-2xl md:text-xl text-sm relative">
        {isLoggedIn && (
          <li className="relative group">
            <a
              href="/"
              className="hover:text-gray-700 transition duration-300"
            >
              Home
            </a>
            <span className="absolute left-0 bottom-0 h-[2px] bg-gray-600 w-0 transition-width duration-300 group-hover:w-full"></span>
          </li>
        )}
        <li className="relative group">
          <a
            href="/contact"
            className="hover:text-gray-700 transition duration-300"
          >
            Contact
          </a>
          <span className="absolute left-0 bottom-0  h-[2px] bg-gray-600 w-0 transition-width duration-300 group-hover:w-full"></span>
        </li>
        {!isLoggedIn && (
          <li className="relative group">
            <a
              href="/login"
              className="hover:text-gray-700 transition duration-300"
            >
              Log in
            </a>
            <span className="absolute left-0 bottom-0 h-[2px] bg-gray-600 w-0 transition-width duration-300 group-hover:w-full"></span>
          </li>
        )}
        {isLoggedIn && user.role === "administrator" && (
          <li className="relative group">
            <a
              href="/administrator/createAdmin"
              className="hover:text-gray-600 transition duration-300"
            >
              New Admin
            </a>
            <span className="absolute left-0 bottom-0  h-[2px] bg-gray-600 w-0 transition-width duration-300 group-hover:w-full"></span>
          </li>
        )}
        {isLoggedIn && (
          <li className="relative group">
            <button
              onClick={handleLogout}
              className="hover:text-gray-600 transition duration-300"
            >
              Logout
            </button>
            <span className="absolute left-0 bottom-0 h-[2px] bg-gray-600 w-0 transition-width duration-300 group-hover:w-full"></span>
          </li>
        )}
      </ul>
    </nav>
  </>
  
  );
};

export default Navbar;
