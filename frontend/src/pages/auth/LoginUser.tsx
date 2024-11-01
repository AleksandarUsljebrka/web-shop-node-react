import { useContext, useEffect, useState } from "react";
import React from 'react';
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import { LoginUserType } from "../../types/AuthTypes";
import Button from "../../components/Button";
import LoginForm from "../../components/LoginFormComponent";


let initialUser: LoginUserType = {
  email: "",
  password: "",
};
const LoginUser = () => {
  const [user, setUser] = useState<LoginUserType>(initialUser);
  const [error, setError] = useState<string>('');

  const {login} = authService;
  
  const  {handleLogin, isLoggedIn, user:userContextData} = useAuth();

  

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    
    setError('');
    try{
      const response = await login(user);
      await handleLogin(response.data);
      console.log("role",userContextData.role);
      console.log("LOGG", isLoggedIn);
      
    }catch(error:any){
      setError(error?.message || "Login failed");
    }
  
  }
  
  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      title="User Login"
      identity="email"
      user={user}
      buttonText="Log in"
    />
  );
};

export default LoginUser;
