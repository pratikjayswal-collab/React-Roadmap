import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Home from './components/Home'
import "./App.css"

const AppContent = () => {
  const {user, loading} = useAuth()

  if (loading) {
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  return user ? <Home /> : <Login />;
}


function App() {


  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <AppContent />
      </div>
          
    </>
  )
}

export default App

// json-server --watch db.json --port 3001