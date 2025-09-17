import React from 'react'
import { useState } from 'react'

const TaskD = () => {

    const [counter, setcounter] = useState(0)

  return (
    <div>
        <div>{counter}</div>
      <button onClick={()=>setcounter(counter+1)}>+</button>
      <button onClick={()=>setcounter(counter-1)}>-</button>
      <button onClick={()=>setcounter(0)}>Reset</button>
    </div>
  )
}

export default TaskD
