import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import RoutesConfig from './routes/RoutesConfig'

function App() {

  return (
    <>
      <div className='bg-blue-50'>

        <Navbar />
        <RoutesConfig />
      </div>
    </>
  )
}

export default App
