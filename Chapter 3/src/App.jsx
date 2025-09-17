import { useState, useCallback } from 'react'
import './App.css'
import TaskA from './components/TaskA'
import TaskB from './components/TaskB'
import TaskC from './components/TaskC'
import TaskD from './components/TaskD'
import TaskE from './components/TaskE'
import TaskF from './components/TaskF'
import TaskG from './components/TaskG'
import TaskH from './components/TaskH'
import Project from './components/Project'
import { CartProvider } from './context/CartContext'
import { LanguageContext } from './context/LanguageContext'

function App() {

  const [language, setLanguage] = useState('en')

  return (
    <>
      {/* <TaskA /> */}
      {/* <TaskB /> */}

    <LanguageContext.Provider value={{language, setLanguage}}>
      {/* <div className='min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-800 p-6'>
        <h1 className='text-3xl font-bold mb-6'>🌍 Multi-language Website</h1>
        <div className="space-x-4 mb-10">
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
              ${language === "en" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("es")}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition 
              ${language === "es" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Español
          </button>
        </div>
      <TaskC />
      </div> */}
    </LanguageContext.Provider>

        {/* <TaskD /> */}

        {/* <TaskE /> */}
        {/* <TaskF /> */}
        {/* <TaskG /> */}

        <CartProvider>
        {/* <TaskH /> */}
        </CartProvider>

        <Project />

    </>
  )
}

export default App

