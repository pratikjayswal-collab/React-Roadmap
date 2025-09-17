import { useState } from 'react'
import './App.css'
import TaskA from './components/TaskA'
import TaskB from './components/TaskB'
import TaskC from './components/TaskC'
import TaskD from './components/TaskD'
import TaskE from './components/TaskE'
import TaskF from './components/TaskF'
import TaskG from './components/TaskG'
import TaskH from './components/TaskH'
import TodoProject from './components/TodoProject'

function App() {

  let taskB = {
    name: "Pratik",
    bio: "Hello, i am web developer"
  }

  return (
    <>
      {/* <TaskA /> */}
      {/* <TaskB obj={taskB} /> */}
      {/* <TaskC /> */}
      {/* <TaskD /> */}
      {/* <TaskE /> */}
      {/* <TaskF/> */}
      {/* <TaskG title="Beautiful Scenery"><p>"The best way to predict the future is to invent it." – Alan Kay</p></TaskG> */}
      {/* <TaskH variant="danger">Click it</TaskH> */}
      <TodoProject />
    </>
  )
}

export default App
