import React from 'react'
import { useState } from 'react'

const Task1 = () => {
  let submit = "Submit"
  const [name, setname] = useState("")

  const handleChange = (e) => {
    setname(e.target.value)
    console.log(e.target.value)
  }
  
  return (
    <div>
       <form>
      <input onChange={handleChange} type="text" placeholder="Enter your name" />
      <button type="submit">{submit}</button>
    </form>
    </div>
  )
}

export default Task1
