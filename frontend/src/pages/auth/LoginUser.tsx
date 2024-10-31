import { useContext, useState } from "react";
import React from 'react';
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import { LoginUserType } from "../../types/AuthTypes";


let initialUser: LoginUserType = {
  email: "",
  password: "",
};
const LoginUser = () => {
  const [user, setUser] = useState<LoginUserType>(initialUser);
  const [error, setError] = useState<string>('');
  const {login} = authService;
  
  const  {handleLogin} = useAuth();

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
      await handleLogin(response);
      console.log(response);
    }catch(error:any){
      setError(error?.message || "Login failed");
    }
    console.log(user)
  }
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="border pt-3 mt-28 rounded-md bg-gray-700  border-gray-900 w-1/2 h-fit shadow-2xl">
        <h2 className="justify-self-center text-sm md:text-xl lg:text-3xl text-white">
          User Login
        </h2>
        <form
            onSubmit={onSubmit} 
            className="flex flex-col  pt-5 text-white text-sm md:text-xl lg:text-2xl w-4/6 justify-self-center">
          <label className="mb-2">
            Email
          </label>
          <input
            className="text-black p-2"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => onChange(e)}
          />

          <label className="mb-2 mt-5">
            Password
          </label>
          <input
            className="text-black p-2"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => onChange(e)}
          />

          <button
            type="submit" 
            className="border rounded-md w-16 text-sm lg:w-32 lg:text-2xl mt-6 p-2 bg-gray-600 hover:bg-gray-400 transition duration-300">
            Log in
          </button>
        </form>
        <div className="mt-10 mb-10 justify-self-center pl-3 pr-3 text-white text-sm md:text-xl lg:text-2xl">
            Don't have an account? Register <a href="/register" className="text-blue-400 hover:text-blue-500 transition duration-200">here.</a>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
