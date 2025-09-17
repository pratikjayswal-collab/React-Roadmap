import React from 'react'

const TaskE = () => {
    
  let arr = ["pratik", "saral", "harsh", "dhrumil"]
  return (
    <div>
      <ul>
        {arr.map((item, index)=>(
            <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default TaskE
