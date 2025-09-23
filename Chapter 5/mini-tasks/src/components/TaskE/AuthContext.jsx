import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"))

  const login = () => {
    const fakeToken = "12345abcde" 
    setToken(fakeToken)
    localStorage.setItem("token", fakeToken)
  };

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  const isAuthenticated = !!token   

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
