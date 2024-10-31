import React, { createContext, useState, useContext } from "react";
import tokenHelper, { removeToken, saveToken } from "../helpers/tokenHelper";
import { useNavigate } from "react-router-dom";
import { AuthContextProviderProps, AuthContextType } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (response: { token: string }) => {
    try {
      saveToken(response.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {
    removeToken();

    setIsLoggedIn(false);
    navigate("/login");
  };

  const loadUser = () => {
    if (!tokenHelper.isLoggedin()) return;
    if (tokenHelper.isTokenExpired()) {
      removeToken();
      return;
    }

    setIsLoggedIn(tokenHelper.isLoggedin());
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        logout: logout,
        loadUser: loadUser,
        isLoggedIn: isLoggedIn,
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
