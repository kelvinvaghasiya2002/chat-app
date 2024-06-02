import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import ContactList from '../../Components/ContactList.jsx';
import AddContact from '../../Components/AddContact.jsx';
const server = import.meta.env.VITE_SERVER;
var socket;


function Home() {
  const { user, setUser } = useUserInfo();
  socket = useMemo(() => io(server), [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
      socket.emit("send-email", user.email);
    })

    return () => {
      socket.disconnect();
    }
  }, [])
  

  return (
    <>
      <AddContact />
      <br /><br />

      <ContactList contacts={user.contacts} />
    </>
  )
}

export {socket}
export default Home