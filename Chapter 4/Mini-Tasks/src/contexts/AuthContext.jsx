import { createContext, useContext , useState} from "react";

export const TaskAContext = createContext({
        isLoggedIn: false,
        setIsLoggedIn: () => { }
})

export const TaskAProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <TaskAContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </TaskAContext.Provider>
  )
}

export const useTaskA = () => useContext(TaskAContext)