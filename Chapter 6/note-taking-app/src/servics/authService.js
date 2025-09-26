import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider()

export const authService ={

    signUp: async (email, password, displayName) =>{
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
                if (displayName) {
                    await updateProfile(userCredentials.user, {displayName})
                }
                return userCredentials.user
            } catch (error) {
                throw error
            }
    },

    signIn : async (email, password) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            return userCredentials.user
        } catch (error) {
            throw error
        }
    }, 

    signInWithGoogle : async () =>{
        try {
            const result = await signInWithPopup(auth, googleProvider)
            return result.user
        } catch (error) {
            throw error
        }
    },

    signOut : async () =>{
        try {
            await signOut(auth)
        } catch (error) {
            throw error
        }
    },

     onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
}