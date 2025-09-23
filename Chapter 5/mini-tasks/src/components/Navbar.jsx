import React from 'react'
import { NavLink } from 'react-router'
const Navbar = () => {

  return (
    <nav className="bg-gray-100 p-2.5">
    <ul className="list-none flex gap-5 m-0 p-0">
        
        <NavLink to="/" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>
            <li>Home</li>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>            
            <li>About</li>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>
            <li>Contact</li>
        </NavLink>

         <NavLink to="/profile" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>
            <li>Profile</li>
        </NavLink>
        
        <NavLink to="/dashboard" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>
            <li>Dashboard</li>
        </NavLink>

        <NavLink to="/users" className={({ isActive }) =>
          `no-underline ${isActive ? "text-blue-500 font-bold" : "text-black font-normal"}`
        }>
            <li>Users</li>
        </NavLink>
    </ul>
</nav>

  )
}

export default Navbar