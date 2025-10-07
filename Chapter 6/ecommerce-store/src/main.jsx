import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router'
import { LocalContextProvider } from './contexts/LocalStorageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LocalContextProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </LocalContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
