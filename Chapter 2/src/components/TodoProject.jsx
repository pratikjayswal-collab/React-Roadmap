import React, { useEffect, useState } from 'react'

const Project = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : [];
  })
  const [taskStatus, settaskStatus] = useState("todo")

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleStatusChange = (e) => {
    settaskStatus(e.target.value)
  }
  const handleCheckBox = (index, newStatus) => {
    const updatedTodos = todos.map((item, i) => {
      if (i === index) {
        return { ...item, taskStatus: newStatus };
      }
      return item;
    });
    setTodos(updatedTodos);
  }

  const deleteTodo = (index) => {
    let delConfirm = confirm("Are you sure, that you want to delete this task?")
    if(delConfirm){
      let newTodos = todos.filter((item, i) => {
        return i !== index
      }
    )
    setTodos(newTodos)
  }}

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const handleSubmit = (e) => {
    setTodos([...todos, { todo, taskStatus }])
    setTodo("")
    settaskStatus("todo")
  }


  return (
    <div className='flex flex-col bg-blue-100 h-[100vh]'>
      <form onSubmit={handleSubmit} className='m-10 flex flex-col gap-5 ' action="">
        <div className='flex gap-3'>
          <label className='text-blue-800 font-bold' htmlFor="todo">Enter Todo : </label>
          <input onChange={handleChange} className='px-2 py-1 rounded-2xl border-2 border-blue-300 focus:outline-blue-500' type="text" name='todo' placeholder='Enter the task' />
          <select onChange={handleStatusChange} className='bg-blue-200 rounded-2xl px-2 py-1 outline-blue-400' name="taskStatus" value={taskStatus} id="">
            <option value="todo">todo</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button disabled={todo.length <= 3} className='bg-blue-300 px-2 py-1 rounded-2xl disabled:bg-blue-200' type='submit'>Add Task</button>
      </form>

      {todos.length == 0 && <div className='m-5'>No Tasks to display.</div>}

      {todos.length > 0 && (
        <div className='mx-10 mb-10 w-[70vw]'>
          <table className='w-full bg-blue-200 rounded-xl overflow-hidden'>
            <thead>
              <tr className='bg-blue-300'>
                <th className='py-4 px-4 text-center font-bold border-r border-blue-400'>Task Name</th>
                <th className='py-4 px-4 text-center font-bold border-r border-blue-400 w-36'>Todo</th>
                <th className='py-4 px-4 text-center font-bold border-r border-blue-400 w-36'>In Progress</th>
                <th className='py-4 px-4 text-center font-bold border-r border-blue-400 w-36'>Done</th>
                <th className='py-4 px-4 text-center font-bold w-36'>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((item, index) => (
                <tr key={index} className='border-t border-blue-300'>
                  <td className='py-3 px-4 text-center border-r border-blue-300'>{item.todo}</td>
                  <td className='py-3 px-4 text-center border-r border-blue-300'>
                    <input
                      type="checkbox"
                      checked={item.taskStatus === "todo"}
                      onChange={() => handleCheckBox(index, "todo")}
                    />
                  </td>
                  <td className='py-3 px-4 text-center border-r border-blue-300'>
                    <input
                      type="checkbox"
                      checked={item.taskStatus === "inProgress"}
                      onChange={() => handleCheckBox(index, "inProgress")}
                    />
                  </td>
                  <td className='py-3 px-4 text-center border-r border-blue-300'>
                    <input
                      type="checkbox"
                      checked={item.taskStatus === "done"}
                      onChange={() => handleCheckBox(index, "done")}
                    />
                  </td>
                  <td className='py-3 px-4 text-center '>
                    <button onClick={() => deleteTodo(index)} className="text-red-500 hover:text-red-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Project
