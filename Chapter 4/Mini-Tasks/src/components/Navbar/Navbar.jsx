import React from "react";
import { NavLink } from "react-router";
import { useTheme } from "../../contexts/ThemeContext";

const links = [
  { id: "a", label: "Task A", to: "/task-a" },
  { id: "b", label: "Task B,C,D", to: "/task-bcd" },
  { id: "e", label: "Task E,F", to: "/task-ef" },
]

const Navbar = () => {
  const { theme } = useTheme()

  const getNavbarStyles = () => {
    switch(theme) {
      case 'dark':
        return 'bg-gray-800 shadow-lg'
      case 'blue':
        return 'bg-blue-600 shadow-lg'
      case 'red':
        return 'bg-red-600 shadow-lg'
      default:
        return 'bg-white shadow-md'
    }
  };

  const getBrandStyles = () => {
    switch(theme) {
      case 'dark':
        return 'text-blue-400 hover:text-blue-300'
      case 'blue':
        return 'text-white hover:text-blue-100'
      case 'red':
        return 'text-white hover:text-red-100'
      default:
        return 'text-blue-600 hover:text-blue-800'
    }
  }

  const getLinkStyles = (isActive) => {
    const baseStyles = 'px-3 py-2 rounded-lg font-medium transition duration-200';
    
    switch(theme) {
      case 'dark':
        return isActive 
          ? `${baseStyles} bg-blue-600 text-white`
          : `${baseStyles} text-gray-300 hover:bg-gray-700`;
      case 'blue':
        return isActive 
          ? `${baseStyles} bg-white text-blue-600`
          : `${baseStyles} text-blue-100 hover:bg-blue-500`;
      case 'red':
        return isActive 
          ? `${baseStyles} bg-white text-red-600`
          : `${baseStyles} text-red-100 hover:bg-red-500`;
      default:
        return isActive 
          ? `${baseStyles} bg-blue-600 text-white`
          : `${baseStyles} text-gray-700 hover:bg-gray-200`;
    }
  }

  return (
    <nav className={`${getNavbarStyles()} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <NavLink
          to="/"
          className={`text-2xl font-bold ${getBrandStyles()}`}
        >
          My Tasks
        </NavLink>

        <div className="flex gap-6">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) => getLinkStyles(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar