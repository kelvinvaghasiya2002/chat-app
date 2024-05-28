import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import axios from 'axios';
import { useSocketInfo } from '../../Contexts/socket.jsx';
const server = import.meta.env.VITE_SERVER;

function Home() {
  const {user} = useUserInfo();
  const { socketContext, setSocketContext } = useSocketInfo();
  const [email, setEmail] = useState("");
  const server = import.meta.env.VITE_SERVER;
  const socket = useMemo(() => io(server), [])
  console.log(socketContext);

  useEffect(() => {
    setSocketContext(socket);
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
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