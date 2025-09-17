import React from 'react'

const TaskG = ({title, children}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}

export default TaskG
