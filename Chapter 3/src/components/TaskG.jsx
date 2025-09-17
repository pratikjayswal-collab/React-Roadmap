import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


const TaskG = () => {

    const [name, setName, removeName] = useLocalStorage("name", "Guest")


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Hello, {name}</h2>
      <input
        type="text"
        placeholder="Enter your name"
        className="border px-2 py-1 mr-2"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => removeName()}
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Remove
      </button> 
    </div>
  )
}

export default TaskG
