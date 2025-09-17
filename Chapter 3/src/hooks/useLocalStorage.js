import { useState, useEffect } from "react";

function useLocalStorage(key, initialVal) {
  const [stored, setStored] = useState(()=> {
    const item = window.localStorage.getItem(key)
    return item? JSON.parse(item) : initialVal
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(stored))
  }, [key, stored])
  
   const removeValue = () => {
      window.localStorage.removeItem(key)
      setStoredValue(null)
  };
  
  return [stored, setStored, removeValue]
}

export default useLocalStorage