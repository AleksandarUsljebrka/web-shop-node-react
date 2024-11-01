import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const {user} = useAuth();

  return (
    <div className='w-screen h-screen'>
        <div className='pt-20 h-screen'>
            {user.identity} ---- {user.role}</div>
        </div>
  )
}

export default Home