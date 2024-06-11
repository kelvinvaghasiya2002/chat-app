import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { useUserInfo } from '../../Contexts/user';
import ContactList from '../../Components/ContactList.jsx';
import AddContact from '../../Components/AddContact.jsx';
import { Outlet } from 'react-router-dom';
import RoomProvider from '../../Contexts/room.jsx';
import "./Home.css"
import Header from '../../Components/Header.jsx';

const server = import.meta.env.VITE_SERVER;
var socket;


function Home() {
  const { user } = useUserInfo();
  socket = useMemo(() => io(server), [])
  console.log("Home.jsx");
  const [addContactState, setAddContactState] = useState(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
      socket.emit("send-email", user.email);
    })

    return () => {
      socket.disconnect();
    }
  }, [])


  const changeAddContactState = () => {
    setAddContactState(!addContactState);
  }


  return (
    <RoomProvider>
      <div className='container'>
        <div className='contact-list'>
          <Header changeState={changeAddContactState} />
          <AddContact state={addContactState} />

          <ContactList contacts={user.contacts} userEmail={user.email} username_1= {user.username} />
        </div>

        <div className='chat-window'>
          <Outlet />
        </div>


      </div>

      {/* <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1>
      <h1>Heldscsv</h1> */}

    </RoomProvider>
  )
}

export { socket }
export default Home