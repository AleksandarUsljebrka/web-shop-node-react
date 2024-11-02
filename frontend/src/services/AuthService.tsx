import axios from "axios";

import { baseUrl } from "../config/Config";
interface UserCredentials {
    email: string;
    password: string;
  }
interface AdminCredentials{
    username:string;
    password:string;
}
  interface RegisterData  {
    email: string;
    password: string;
    forename: string;
    surename: string;
    postalAddress: string;
    phoneNumber: string;
  }
  
export const authService = {
    login:async (data:UserCredentials) =>{  
        try{
            const response = await axios.post(`${baseUrl}/auth/user/login`,data);
            console.log(response);
            
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },
    register:async (data:RegisterData) =>{
        try{
            const response = await axios.post(`${baseUrl}/auth/user/register`,data);
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Register failed');
        }
    },
    loginAdmin:async (data:AdminCredentials) =>{  
        try{
            const response = await axios.post(`${baseUrl}/auth/administrator/login`,data);
            console.log(response);
            
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },
    createAdmin:async (data:AdminCredentials, token:string|null) =>{
        try{
            const response = await axios.post(`${baseUrl}/api/administrator`,data,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Creating admin failed');
        }
    },
}