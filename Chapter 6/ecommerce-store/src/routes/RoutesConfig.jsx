import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import ProductDetails from '../components/ProductDetails'
const RoutesConfig = () => {

    const ProtectedRoute = ({children}) => {
      const {user} = useAuth()
      if (!user) {
        return <Navigate to="/login" replace />
      }

      return children
    }

    const AuthRoute = ({ children }) => {
  const { user } = useAuth()
  
  if (user) {
    return <Navigate to="/" replace />
  }
  
  return children
}
    
  return (
    <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/product/:id' element={<ProductDetails />}/> 
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>}/>
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default RoutesConfig