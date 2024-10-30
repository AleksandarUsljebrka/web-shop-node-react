import axios from "axios";

const baseUrl = 'http://localhost:3000';

interface UserCredentials {
    email: string;
    password: string;
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
            
            return response.data;
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
    }
}