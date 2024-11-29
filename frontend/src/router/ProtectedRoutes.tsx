import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoutes = ({children}:ProtectedRouteProps) =>{
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
          navigate("/login", { replace: true }); 
        }
      }, [isLoggedIn, navigate]); 
    
     return <>{children}</>;
}
export default ProtectedRoutes;