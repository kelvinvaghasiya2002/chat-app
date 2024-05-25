import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import axios from 'axios';
const server = import.meta.env.VITE_SERVER;

function Home() {
  const {user , setUser , isLogged , setLogged} = useUserInfo();
  console.log(user);
  // console.log("Home");
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [email, setEmail] = useState("");

  const server = import.meta.env.VITE_SERVER;
  const socket = useMemo(() => io(server), [])

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
    })

    socket.on("msg", (messege) => {
      setMsgList((prevList) => {
        return ([
          ...prevList,
          messege
        ])
      })
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // socket.emit("message", { msg, room });
    const response = await axios.post(`${server}/addcontact`,{
      user_1 : user.email,
      user_2 : email
    })
    console.log(response);
  }

  const handleEmailChange = (event)=>{
    setEmail(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <p>{socketId}</p>
      <input value={msg} name="msg" onChange={(e) => {
        setMsg(e.target.value);
      }} placeholder='msg' /><br /><br />

      <input value={room} name="room" onChange={(e) => {
        setRoom(e.target.value);
      }} placeholder='room' /><br /><br />

      <button type='submit'>Send</button>

      {
        msgList.map((message, index) => {
          return <p key={index}>{message}</p>
        })
      } */}
      <input
        placeholder='enter a email'
        value={email}
        name='email'
        onChange={handleEmailChange}
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default Home