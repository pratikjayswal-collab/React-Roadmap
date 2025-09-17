import React, {useState} from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeSwitcher = () => {

  const {theme, setTheme} = useTheme()

  const themes = ["light", "dark", "blue", "red"]

  const getThemeStyles = () => {
    switch(theme) {
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'blue':
        return 'bg-blue-100 text-blue-900'
      case 'red':
        return 'bg-red-100 text-red-900'
      default:
        return 'bg-white text-black'
    }
  }

  console.log("hello")
  

  const getButtonStyles = (t) => {
    const isActive = theme === t;
    const baseStyles = 'px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md';
    
    if (isActive) {
      switch(t) {
        case 'dark':
          return `${baseStyles} bg-gray-800 text-white border-gray-600 font-bold`
        case 'blue':
          return `${baseStyles} bg-blue-600 text-white border-blue-600 font-bold`
        case 'red':
          return `${baseStyles} bg-red-600 text-white border-red-600 font-bold`
        default:
          return `${baseStyles} bg-gray-200 text-black border-gray-400 font-bold`
      }
    } else {
      return `${baseStyles} bg-transparent border-gray-300 hover:border-gray-400`
    }
  };
return (
    <div className={`flex-1 flex flex-col justify-center items-center p-8 ${getThemeStyles()}`}>
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Theme Switcher Demo</h2>
        <p className="mb-6">
          Current theme: <span className="font-bold text-lg">{theme}</span>
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={getButtonStyles(t)}
            >
              {t}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ThemeSwitcher