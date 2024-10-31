import { useState } from "react";
import React from "react";
import { authService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { RegisterUserType } from "../../types/AuthTypes";

let initialUser: RegisterUserType = {
  email: "",
  password: "",
  forename: "",
  surename: "",
  postalAddress: "",
  phoneNumber: "",
};
const RegisterUser = () => {
  const [user, setUser] = useState<RegisterUserType>(initialUser);
  const {register} = authService;
  const [error,setError] = useState<string>('');
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    try{
        setError('');
        const response = await register(user);

        if(response.status < 200 || response.status >=300 || response.data.status ==='error'){
            setError(response.data.message);
            throw new Error(response.data.message);
        }
        
        navigate('/login')
    }catch(error:any){
        setError(error?.message || "Registration failed");
    }
  }
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="border pt-3 mt-28 rounded-md bg-gray-700  border-gray-900 w-3/5 h-fit shadow-2xl">
        <h2 className="justify-self-center text-sm md:text-xl lg:text-3xl text-white">
          Registration
        </h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center pt-5 text-white text-sm md:text-xl lg:text-2xl w-11/12 justify-self-center"
        >
          <div className="flex justify-around w-full">
            <div className="flex flex-col justify-center w-2/5">
              <label className="">Email</label>
              <input
                className="text-black p-2"
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="flex flex-col justify-center w-2/5">
              <label className="">Password</label>
              <input
                className="text-black p-2"
                type="password"
                name="password"
                value={user.password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="flex justify-around">
            <div className="flex flex-col justify-center w-2/5">
              <label className="">Forename</label>
              <input
                className="text-black p-2"
                type="text"
                name="forename"
                value={user.forename}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="flex flex-col justify-center w-2/5">
              <label className="">Surename</label>
              <input
                className="text-black p-2"
                type="text"
                name="surename"
                value={user.surename}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="flex justify-around">
            <div className="flex flex-col justify-center w-2/5">
              <label className="mb-2">Postal  Addres</label>
              <input
                className="text-black p-2"
                type="text"
                name="postalAddress"
                value={user.postalAddress}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="flex flex-col justify-center w-2/5">
              <label className="mb-2">Phone Number</label>
              <input
                className="text-black p-2"
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="m-auto border rounded-md w-16 text-sm lg:w-40 lg:text-2xl mt-6 p-2 bg-gray-600 hover:bg-gray-400 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-10 mb-10 justify-self-center text-white text-sm md:text-xl lg:text-2xl">
          Already have an account? Log in {" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            here.
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
