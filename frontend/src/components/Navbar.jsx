import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-gray-500 p-4 flex justify-between items-center'>
        <Link to="/" className='text-2xl font-bold'>Home</Link>
        <Link to="/login" className='text-2xl font-bold'>Login</Link>
        <Link to="/register" className='text-2xl font-bold'>Register</Link>
        <Link to="/dashboard" className='text-2xl font-bold'>Dashboard</Link>
    </div>
  )
}

export default Navbar;