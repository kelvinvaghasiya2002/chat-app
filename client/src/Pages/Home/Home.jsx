import React, { useMemo, useState } from 'react'
import { io } from "socket.io-client"

function Home() {
  console.log("Hello World");
  const [msg, setMsg] = useState("");
  const [room , setRoom] = useState("");

  const server = import.meta.env.VITE_SERVER;
  const socket = useMemo(() => io(server), [])
  socket.on("connect", () => {
    console.log(`${socket.id} connected`);
  })

  socket.on("msg",(m)=>{
    console.log(m);
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message",{msg,room});
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={msg} name="msg" onChange={(e) => {
        setMsg(e.target.value);
      }} placeholder='msg' /><br /><br />

      <input value={room} name="room" onChange={(e) => {
        setRoom(e.target.value);
      }} placeholder='room' /><br /><br />

      <button type='submit'>Send</button>
    </form>
  )
}

export default Home