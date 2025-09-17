import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import Layout from './Layout.jsx'
import { RouterProvider } from 'react-router'
import { TaskA, ThemeSwitcher, Cart, Products} from './components'
import { TaskAProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route
        path="task-a"
        element={
          <TaskAProvider>
            <TaskA />
          </TaskAProvider>
        } />
      <Route
        path="task-bcd"
        element={
          <ThemeSwitcher />
        }
      />

      <Route 
      path="task-ef" 
      element={
        <CartProvider>
        <div className='flex justify-between px-64 py-8 font-bold text-2xl text-blue-600'> 
          <Products className=""/>
          <Cart className="" />
        </div>
        </CartProvider>
      } />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
