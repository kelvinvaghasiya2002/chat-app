import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import ContactList from '../../Components/ContactList.jsx';
import AddContact from '../../Components/AddContact.jsx';
import { Outlet } from 'react-router-dom';
import RoomProvider from '../../Contexts/room.jsx';
import "./Home.css"

const server = import.meta.env.VITE_SERVER;
var socket;


function Home() {
  const { user, setUser } = useUserInfo();
  socket = useMemo(() => io(server), [])
  console.log("Home.jsx");

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
    <RoomProvider>
      <div className='container'>
        <div className='contact-list'>
          <AddContact />
          <br /><br />

          <ContactList contacts={user.contacts} />
        </div>

        <div className='chat-window'>
          <Outlet />
        </div>
      </div>
    </RoomProvider>
  )
}

export { socket }
export default Home