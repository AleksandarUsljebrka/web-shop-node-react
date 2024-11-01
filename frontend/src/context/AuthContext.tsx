import React, { createContext, useState, useContext, useCallback } from "react";
import tokenHelper from "../helpers/tokenHelper";
import { useNavigate } from "react-router-dom";
import {
  AuthContextProviderProps,
  AuthContextType,
  User,
} from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
let initialUser: User = {
  identity: "",
  role: "",
  token:''
};
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(initialUser);

  const navigate = useNavigate();

  const handleLogin = async (response: { token: string }) => {
    try {
      tokenHelper.saveToken(response.token);
      setIsLoggedIn(true);
      console.log("ident", tokenHelper.getTokenIdentity());

      const userData = tokenHelper.getUser();
      if (userData) setUser(userData);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const logout = async (navigateRoute?: string) => {
    tokenHelper.removeToken();

    setIsLoggedIn(false);
    navigate(navigateRoute ? navigateRoute : "/login");
  };

  const loadUser = useCallback(async() => {
    setIsLoading(false);
    if (!tokenHelper.isLoggedin()) {
      setUser(initialUser);
      return;
    }
    if (tokenHelper.isTokenExpired()) {
      tokenHelper.removeToken();
      setUser(initialUser);
      return;
    }
    setIsLoggedIn(tokenHelper.isLoggedin());
    const userData = tokenHelper.getUser();
    if (userData) setUser(userData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        logout: logout,
        loadUser: loadUser,
        isLoggedIn: isLoggedIn,
        user: user,
        isLoading:isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  return context;
};
