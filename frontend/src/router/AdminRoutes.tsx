import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type AdminRouteProps = PropsWithChildren;

const AdminRoutes = ({children}:AdminRouteProps) =>{
    const {isLoggedIn, user} = useAuth();
    const navigate = useNavigate();
    const isAdmin = user.role === "administrator";

    useEffect(() => {
        if (!isAdmin && !isLoggedIn) {
          navigate("/administrator/login", { replace: true }); 
        }else if(!isAdmin && isLoggedIn)
          navigate("/", { replace: true }); 

      }, [isAdmin, navigate]); 
    
     return <>{children}</>;
}
export default AdminRoutes;