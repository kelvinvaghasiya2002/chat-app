import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import axios from 'axios';
import ContactList from '../../Components/ContactList.jsx';
const server = import.meta.env.VITE_SERVER;



function Home() {
  const { user, setUser, isLogged, setLogged } = useUserInfo();
  const [email, setEmail] = useState("");

  const socket = useMemo(() => io(server), [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
      socket.emit("send-email", user.email);
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  socket.on("from-user", (m) => {
    setUser(m)
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${server}/addcontact`, {
      user_1: user.email,
      username_1: user.username,
      user_2: email
    })
    console.log(response);
    setUser(response.data.user);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='enter a email'
          value={email}
          name='email'
          onChange={handleEmailChange}
        />
        <button type='submit'>Add</button>
      </form>
      <br /><br />

      <ContactList contacts={user.contacts} />
    </>
  )
}

export default Home