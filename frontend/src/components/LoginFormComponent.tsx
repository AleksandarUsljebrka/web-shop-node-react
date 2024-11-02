import React from 'react'
import Button from './Button'
import { LoginAdminType, LoginUserType } from '../types/AuthTypes';
import { title } from 'process';

interface LoginFormProps{
    onSubmit:React.FormEventHandler<HTMLFormElement>;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    user?:LoginUserType,
    admin?:LoginAdminType
    title:string;
    identity:string;
    buttonText:string;
}
const LoginForm:React.FC<LoginFormProps> = ({onSubmit, onChange,buttonText, user,admin,title, identity}) => {
  let isAdmin = admin!==null && admin!==undefined;

  if(isAdmin)
    identity = 'Username';
  else
    identity = 'Email';
  return (
    <div className="flex items-start justify-center min-h-screen">
    <div className="border pt-3 mt-28 rounded-md bg-gray-700  border-gray-900 w-1/2 h-fit shadow-2xl">
      <h2 className="justify-self-center text-sm md:text-xl lg:text-3xl text-white">
        {title}
      </h2>
      <form
          onSubmit={onSubmit} 
          className="flex flex-col  pt-5 text-white text-sm md:text-xl lg:text-2xl w-4/6 justify-self-center">
        <label className="mb-2">
          {identity}
        </label>
        <input
          className="text-black p-2"
          type={isAdmin? "text":"email"}
          name={isAdmin? "username":"email"}
          value={isAdmin? admin?.username:user?.email}
          onChange={(e) => onChange(e)}
        />

        <label className="mb-2 mt-5">
          Password
        </label>
        <input
          className="text-black p-2"
          type="password"
          name="password"
          value={isAdmin? admin?.password:user?.password}
          onChange={(e) => onChange(e)}
        />
        
       <Button buttonText={buttonText} className='mt-6'/>
      </form>
     {!isAdmin && <div className="mt-10 mb-10 justify-self-center pl-3 pr-3 text-white text-sm md:text-xl lg:text-2xl">
          Don't have an account? Register <a href="/register" className="text-blue-400 hover:text-blue-500 transition duration-200">here.</a>
      </div>}

      <div className="mt-10 mb-10 justify-self-center pl-3 pr-3 text-white text-sm md:text-xl lg:text-2xl">
           <a href={!isAdmin? "/administrator/login":"/login"} className="text-blue-400 hover:text-blue-500 transition duration-200">
           {
            (isAdmin && buttonText ==='Create')?"":
            isAdmin?"Log in as an user":
            "Log in as an administrator"
           }</a>
      </div>
    </div>
  </div>
  )
}

export default LoginForm