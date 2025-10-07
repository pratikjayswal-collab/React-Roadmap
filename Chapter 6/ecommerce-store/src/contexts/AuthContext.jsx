import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
      return signOut(auth)
    }
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setLoading(false)
      })

      return unsubscribe
    }, [])
    
    const value = {
    user,
    signUp,
    logIn,
    logOut,
    loading
  }

  return(
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
