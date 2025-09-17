import { createContext, useContext , useState} from "react";

export const ThemeContext = createContext({
  theme : "light",
  setTheme : ()=>{ }
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

