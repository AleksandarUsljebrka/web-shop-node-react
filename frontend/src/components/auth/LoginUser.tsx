import { useState } from "react";

interface User {
  email: string;
  password: string;
}
let initialUser: User = {
  email: "",
  password: "",
};
const LoginUser = () => {
  const [user, setUser] = useState<User>(initialUser);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(user );
  }
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="border pt-3 mt-28 rounded-md bg-gray-700  border-gray-900 w-1/2 h-fit shadow shadow-2xl">
        <h2 className="justify-self-center text-sm md:text-xl lg:text-3xl text-white">
          User Login
        </h2>
        <form
            onSubmit={onSubmit} 
            className="flex flex-col pb-20 pt-5 text-white text-sm md:text-xl lg:text-2xl w-4/6 justify-self-center">
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
      </div>
    </div>
  );
};

export default LoginUser;
