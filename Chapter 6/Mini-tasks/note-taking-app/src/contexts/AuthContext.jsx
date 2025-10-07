import React, {useState, useEffect, useContext, createContext} from "react";
import { authService } from "../services/authService";

const AuthContext = createContext()

export const useAuth = () => {
  const context =  useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user)=>{
        setUser(user)
        setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (email, password, displayName) => {
    setLoading(true)
    try {
        const user = await authService.signUp(email, password, displayName)
        return user
    } catch (error) {
        throw error
    } finally{
        setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
        const user = await authService.signIn(email, password)
        return user
    } catch (error) {
        throw error
    } finally{
        setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
        const user = await authService.signInWithGoogle()
        return user
    } catch (error) {
        throw error
    } finally{
        setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
        await authService.signOut()
    } catch (error) {
        throw error
    } finally{
        setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signUp, 
    signIn,
    logout,
    signInWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  ) 
}
