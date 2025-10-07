import { createContext, useContext , useEffect, useState} from "react";
import axios from "axios";

export const ProductContext = createContext()

export const ProductProvider = ({children}) => {
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => { 
      setLoading(true)

      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setdata(response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
   
    }

    const getProductById = (id) => {
      const cleanId = id.toString().replace(':', '')
    return data.find(product => product.id.toString() === cleanId)
    }
    
  useEffect(() => {
    try {
     fetchData()
    } catch (error) {
      console.log(error)
    } finally{
    }
  }, [])

  return(
    <ProductContext.Provider value={{data, loading, getProductById}}>
        {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
