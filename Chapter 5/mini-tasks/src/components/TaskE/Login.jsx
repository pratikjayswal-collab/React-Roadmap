import React, {useContext} from 'react'
import { useNavigate } from 'react-router';
import {useAuth} from './AuthContext';


const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
            onClick={() => {
                login()
                navigate('/dashboard')
            }}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
            Login
        </button>
      </div>
    </div>
    

  )
}

export default Login