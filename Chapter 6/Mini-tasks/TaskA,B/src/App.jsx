import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchData = async () => {
    try {
      setLoading(true)
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    if (response.status !== 200) {
      throw new Error('Network response was not ok')
    } else {
      setData(response.data) 
    }
  } catch (error) {
    setError(error.message)
    setLoading(false)
    console.error('There has been a problem with your fetch operation:', error)
  } finally {
    setLoading(false)
  }

  }

  useEffect(() => {
    fetchData()
  }, [])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <>
    <div className='flex flex-col gap-4 p-4 w-[80vw] m-auto'>

    {data.map((item) => (
      <div className='border p-2 bg-gray-200' key={item.id}>
        
        <h2 className='font-semibold text-2xl'>{item.title}</h2>
        <p>{item.body}</p>
      </div>
    ))}
    </div>
      
    </>
  )
}

export default App
