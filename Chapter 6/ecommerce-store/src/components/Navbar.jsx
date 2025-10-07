import React, { useRef, useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router'
import { ShoppingCart, User, LogOut, X, Package } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocalStorage } from '../contexts/LocalStorageContext'
import SlidingCart from './SlidingCart'
import OrderHistory from './OrderHistory'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const { getCartCount, cart } = useLocalStorage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log("failed to logout : " + error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const cartCount = getCartCount()

  return (
    <>
      <nav className="bg-blue-100 shadow-md">
        <div className="">
          <div className="flex justify-between px-8 items-center h-16">
            <NavLink to="/" className="text-2xl font-bold text-gray-800">
              ShopEase
            </NavLink>

            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                    <span className="hidden sm:inline">Cart</span>
                  </button>

                  <button
                    onClick={() => setIsOrderHistoryOpen(true)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <Package size={20} />
                    <span className="hidden sm:inline">Orders</span>
                  </button>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition cursor-pointer"
                    >
                      <User size={20} />
                      <span className="hidden sm:inline">{user.email}</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Cart Panel */}
      <SlidingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Order History Panel */}
      <OrderHistory isOpen={isOrderHistoryOpen} onClose={() => setIsOrderHistoryOpen(false)} />
    </>
  )
}

export default Navbar