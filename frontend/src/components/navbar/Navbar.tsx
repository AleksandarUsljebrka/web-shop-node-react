import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className=' bg-gray-800 fixed top-0 left-0 w-screen flex justify-between items-center  '>
            <h2 className='text-white text-sm md:text-xl lg:text-2xl ml-16 pointer-events-none'>WebShop</h2>
            <ul className='flex justify-around w-1/2 text-white h-20 items-center lg:text-2xl md:text-xl text-sm ' >
                <li><a href='/' className='hover:text-gray-400 transition duration-300'>Home</a></li>
                <li><a href='/contact' className='hover:text-gray-400 transition duration-300'>Contact</a></li>
                <li><a href='/login' className='hover:text-gray-400 transition duration-300'>Log in</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar