import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const RedirectIfLoggedIn = ({children}:ProtectedRouteProps) =>{
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/", { replace: true }); 
        }
      }, [isLoggedIn, navigate]); 
    
     return <>{children}</>;
}
export default RedirectIfLoggedIn;