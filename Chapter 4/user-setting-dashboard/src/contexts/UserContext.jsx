import { createContext , useContext, useState, useEffect } from "react";
import translations from "../translations";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          userName: "user",
          profilePic:
            "https://tse3.mm.bing.net/th/id/OIP.bylQsr5qEADLgK6xlNGL2QHaE1",
          theme: "light",
          language: "English",
        };
  });
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    
    const root = document.documentElement;
    
    root.classList.remove("dark");
    
    if (user.theme === "dark") {
      root.classList.add("dark");
    }
  }, [user]);

  useEffect(() => {
    const root = document.documentElement

     root.classList.remove("dark")
    if (user.theme === "dark") {
      root.classList.add("dark")
    }
  }, [])

  const t = translations[user.language] || translations["English"]
  const value = {
    user,
    setUser,
    t
  }


  return (
    <UserContext.Provider value={value}>
      
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
