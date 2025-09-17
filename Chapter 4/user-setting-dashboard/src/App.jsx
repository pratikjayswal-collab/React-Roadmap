import { useState } from 'react'
import './App.css'
import { UserProvider } from './contexts/UserContext'
import UserDashboard from './UserDashBoard'

function App() {

  return (
    <>
      <UserProvider>
        <UserDashboard />
      </UserProvider>
    </>
  )
}

export default App
