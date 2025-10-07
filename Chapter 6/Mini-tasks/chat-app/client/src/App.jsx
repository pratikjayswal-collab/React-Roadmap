import { useState, useEffect } from 'react'
import './App.css'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000/")

function App() {

  const [msg, setMsg] = useState("")
  const [serverMsg, setServerMsg] = useState([])
  const [room, setRoom] = useState("")

  const sendMessage = () => {
    socket.emit("send_message", {
      message: msg,
      room: room
    })
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

 useEffect(() => {
  socket.on("receive_message", (data) => {
    setServerMsg((prev)=> [...prev, data]); 
  }

 )

  return () => {
    socket.off("receive_message")
  }
}, [])

  return (
    <>
      <div>
        <input onChange={(e)=> {setRoom(e.target.value)}} type="text" placeholder='Room code...' />
        <button onClick={joinRoom}>Join room</button>

        <input onChange={(e)=> setMsg(e.target.value)} type="text" placeholder='Message...' />
        <button onClick={sendMessage}>Send message</button>

<div>
        {serverMsg.map((m, i) => (
          <p key={i}>{m.message}</p>
        ))}
      </div>
      </div>
    </>
  )
}

export default App
