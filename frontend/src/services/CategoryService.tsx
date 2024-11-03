import axios from "axios";
import { baseUrl } from "../config/Config";

export const CategoryService = {
    getAllCategories:async (token:string|null) =>{  
        try{
            const response = await axios.get(`${baseUrl}/api/category`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
        );
            console.log(response);
            
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },
    getCategoryById:async (id:number,token:string|null) =>{  
        try{
            const response = await axios.get(`${baseUrl}/api/category/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
        );
            
            
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },
    getArticle:async (token:string|null) =>{  
        try{
            const response = await axios.get(`${baseUrl}/api/category`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
        );
            console.log(response);
            
            return response;
        }catch(error:any){
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}