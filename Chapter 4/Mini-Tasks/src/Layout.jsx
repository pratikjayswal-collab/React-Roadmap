import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'

const Layout = () => {
  console.log('🔄 App COMPONENT RE-RENDERED');
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />                    
        <main className="flex-1 flex flex-col">  
          <Outlet />                 
        </main>
        <Footer />                
      </div>
    </>
  )
}

export default Layout