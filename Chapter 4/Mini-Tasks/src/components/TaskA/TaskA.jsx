import { useTaskA } from "../../contexts/AuthContext"
const TaskA = () => {
    const {isLoggedIn, setIsLoggedIn} = useTaskA()
      const handleLogIn = () => {
        setIsLoggedIn(!isLoggedIn)
      }
  return (
    <div className="pt-32">
      <div className='flex'>
      {isLoggedIn ? (<div className='m-auto text-center'>
      
              <button className='border px-2 py-1 rounded-2xl bg-red-500 mt-2' onClick={handleLogIn}>LogOut</button>
              <p>Hello, you are logged in now</p>
              </div>
            ): (<div className='m-auto text-center'>
            <button className='border px-2 py-1 rounded-2xl bg-green-500 mt-2' onClick={handleLogIn}>LogIn</button>
              <p>Please login to view dashboard</p>
            </div>

          )
             }
    </div>
    </div>
  )
}

export default TaskA
