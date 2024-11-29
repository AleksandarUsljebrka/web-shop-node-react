import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CategoryNavbar from '../components/navbar/CategoryNavbar'

const Main = () => {
    const {isLoggedIn} = useAuth();
    return (
    <div>
    <Navbar/>
    {isLoggedIn && <CategoryNavbar/>}
    <Outlet/>
    </div>
  )
}

export default Main