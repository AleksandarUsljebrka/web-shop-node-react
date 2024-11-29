import { createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import LoginUser from "../pages/auth/LoginUser";
import RegisterUser from "../pages/auth/RegisterUser";
import LoginAdmin from "../pages/auth/LoginAdmin";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CategoryNavbar from "../components/navbar/CategoryNavbar";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";
import App from "../App";
import Main from "../layouts/Main";

// interface RouterProps{
//     isLoggedIn:boolean,
//     isAdmin:boolean
// }
// const createRouter = (isLoggedIn:boolean, isAdmin:boolean) => {

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectIfLoggedIn>
            <LoginUser />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "/register",
        element: (
          <RedirectIfLoggedIn>
            <RegisterUser />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "/administrator/login",
        element: (
          <RedirectIfLoggedIn>
            <LoginAdmin />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "/administrator/createAdmin",
        element: (
          <AdminRoutes>
            <CreateAdmin />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <CategoryNavbar />
      </ProtectedRoutes>
    ),
  },
]);
//   return router
// }
export default router;
