import React from 'react'
import shopImage from '../../images/online-shop.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const {isLoggedIn, logout, user} = useAuth();

    const handleLogout = ()=>{
        logout();
    }
    return (
    <>
        <nav className=' bg-gray-800 fixed top-0 left-0 w-screen flex justify-between items-center  '>
            <div className='flex ml-10'>
                <img src={shopImage} alt="Logo" className='w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-3'/>
                <h2 className='text-white text-sm md:text-xl lg:text-2xl  pointer-events-none'>WebShop</h2>
            </div>
            <ul className='flex justify-around w-1/2 text-white h-20 items-center lg:text-2xl md:text-xl text-sm ' >
                {isLoggedIn && <li><a href='/' className='hover:text-gray-400 transition duration-300'>Home</a></li>}
                <li><a href='/contact' className='hover:text-gray-400 transition duration-300'>Contact</a></li>
                {
                    !isLoggedIn &&
                    <li><a href='/login' className='hover:text-gray-400 transition duration-300'>Log in</a></li>
                    
                }
                {(isLoggedIn && user.role==='administrator') && <li><a href="/administrator/createAdmin" className='hover:text-gray-400 transition duration-300'>New Admin</a></li>}

                {isLoggedIn && <li><button onClick={handleLogout} className='hover:text-gray-400 transition duration-300'>Logout</button></li>}

            </ul>
        </nav>
    </>
  )
}

export default Navbar