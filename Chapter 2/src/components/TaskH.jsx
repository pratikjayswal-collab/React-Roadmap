import React from 'react'

const TaskH = ({variant= "primary", children}) => {
  return (
    <div>
      <button className={`btn ${variant}`}>{children}</button>
    </div>
  )
}

export default TaskH
