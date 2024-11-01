import React, { useState } from 'react'
import LoginForm from '../../components/LoginFormComponent'
import { LoginAdminType } from '../../types/AuthTypes'
import { authService } from '../../services/AuthService'
import { useAuth } from '../../context/AuthContext'

let initialAdmin:LoginAdminType = {
    username:'',
    password:''
} 
const CreateAdmin = () => {
    const [admin, setAdmin] = useState<LoginAdminType>(initialAdmin)
    const [error, setError] = useState<string>('');
    const {user} = useAuth();

    const {createAdmin} = authService;
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try{
            const response = await createAdmin(admin,user.token);

        }catch(error:any){
            setError(error?.message || "Creating admin failed");
            alert(error);
        }
    }
  return (
    <LoginForm
        onSubmit={onSubmit}
        onChange={onChange}
        identity='username'
        admin={admin}
        title='Create New Admin'
        buttonText='Create'
    />
  )
}

export default CreateAdmin