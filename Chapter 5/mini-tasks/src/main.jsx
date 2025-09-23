import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { About, Contact, Home, ProfileLayout, Profile, Posts, Friends, NotFound, DashBoard, ProtectedRoute, Login, Users } from './components/index.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import { AuthProvider } from './components/TaskE/AuthContext.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path="profile" element={<ProfileLayout />} />
      <Route path="profile/:userid" element={<Profile />} >
        <Route index element={<Posts />} />
        <Route path="friends" element={<Friends />} />
      </Route>

      <Route path='dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      <Route path='404' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
      <Route path='users' element={<Users />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)