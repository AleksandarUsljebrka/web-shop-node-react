import { ReactNode } from "react";

export interface AuthContextType {
    handleLogin: (data: { token: string }) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
    loadUser: () => void;
    
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface LoginUserType {
    email: string;
    password: string;
  }

  
export interface RegisterUserType {
    email: string;
    password: string;
    forename: string;
    surename: string;
    postalAddress: string;
    phoneNumber: string;
  }