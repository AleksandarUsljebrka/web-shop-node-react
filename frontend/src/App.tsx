import "./App.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/navbar/Navbar";
import LoginUser from "./pages/auth/LoginUser";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/auth/RegisterUser";
import { useAuth } from "./context/AuthContext";
import LoginAdmin from "./pages/auth/LoginAdmin";
import CreateAdmin from "./pages/admin/CreateAdmin";
import Loading from "./components/Loading";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const { loadUser, isLoggedIn, user, isLoading } = useAuth();

  const isAdmin = user.role === "administrator" && isLoggedIn;
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      loadUser();
    };

    checkUser();
  }, [loadUser, location]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" bg-gray-500">
      <div className=" pl-5 pr-5   ">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginUser /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <RegisterUser /> : <Navigate to="/" />}
          />
          <Route
            path="/administrator/login"
            element={!isAdmin ? <LoginAdmin /> : <Navigate to="/" />}
          />
          <Route
            path="/administrator/createAdmin"
            element={
              isAdmin ? <CreateAdmin /> : <Navigate to="/administrator/login" />
            }
          />

          <Route
            path="/category/:categoryId"
            element={isLoggedIn ? <CategoryPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
