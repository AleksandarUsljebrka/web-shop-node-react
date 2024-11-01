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

  const { handleLogin, isLoggedIn, user: userContextData, role } = useAuth();

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
      await handleLogin(response);
    } catch (error: any) {
      setError(error?.message || "Login failed");
    }
  };

  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      title="Administrator Log in"
      identity="username"
      admin={admin}
    />
  );
};

export default LoginAdmin;
