import React from 'react'
import { useAuth } from './AuthContext';

const DashBoard = () => {
    const {logout} = useAuth();
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>  
        <div className='text-center mb-4'>Welcome to the Dashboard! Only authenticated users can see this.</div>

        <button
            onClick={() => {
                logout()
            }}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
            Logout
        </button>
        </div>
      </div>    
    </div>

  )
}

export default DashBoard