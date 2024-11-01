import { useContext, useEffect, useState } from "react";
import React from "react";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import { LoginAdminType } from "../../types/AuthTypes";
import Button from "../../components/Button";
import LoginForm from "../../components/LoginFormComponent";

let initialAdmin: LoginAdminType = {
  username: "",
  password: "",
};
const LoginAdmin = () => {
  const [admin, setAdmin] = useState<LoginAdminType>(initialAdmin);
  const [error, setError] = useState<string>("");

  const { loginAdmin } = authService;

  const { handleLogin, logout, isLoggedIn, user: userContextData } = useAuth();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    try {
      const response = await loginAdmin(admin);
      if(response.status < 200 || response.status >=300 || response.data.status ==='error'){
        setError(response.data.message);
        throw new Error(response.data.message);
    }
      await handleLogin(response.data);
    } catch (error: any) {
      setError(error?.message || "Login failed");
    }
  };
  useEffect(()=>{
    async function checkAndLogout(){
        if(isLoggedIn)
            await logout("/administrator/login");
    }
    checkAndLogout();
  },[])
  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      title="Administrator Login"
      identity="username"
      admin={admin}
      buttonText="Log in"
    />
  );
};

export default LoginAdmin;
