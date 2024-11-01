import { JwtPayload } from "jwt-decode";
import { ReactNode } from "react";

export interface AuthContextType {
    handleLogin: (data: { token: string }) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
    loadUser: () => void;
    user:User,
    role:string;
    
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface LoginUserType {
    email: string;
    password: string;
  }

export interface LoginAdminType{
    username:string;
    password:string;
}
export interface RegisterUserType {
    email: string;
    password: string;
    forename: string;
    surename: string;
    postalAddress: string;
    phoneNumber: string;
  }
export interface User{
    identity:string;
    role:string;
}

export interface TokenPayload extends JwtPayload {
    id?: string;
    username?: string;
    identity?: string;
    role?:string;
  }
